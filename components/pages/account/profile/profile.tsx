'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { ddMMYYYYToDate } from '@/utils/date';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Mail } from '@/components/shared/svg/svg-icon';
import { CalendarIcon, User, CircleCheck } from '@/components/shared/svg/lucide-icon';
import { editProfile, getGender, getProfile, sendEmailVerification, verifyEmailOTP } from '@/apis/profile.api';
import { ErrorResponse } from '@/interfaces/api.interface';
import DeleteAccountModal from '@/components/modals/delete-account-modal';
import ProfileSkeleton from './profile-skeleton';

interface FormData {
  name: string;
  email: string;
  dob: Date | undefined;
  gender: string;
}

const Profile = () => {
  const { handleError } = useErrorHandler();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    dob: undefined,
    gender: '',
  });
  const [originalData, setOriginalData] = useState<FormData>({
    name: '',
    email: '',
    dob: undefined,
    gender: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);

  // Email verification states
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsPageLoading(true);
        const [genderResponse, profileResponse] = await Promise.all([
          getGender().catch(() => ({ status: 200, payload: ['MALE', 'FEMALE', 'OTHER'] })),
          getProfile(),
        ]);

        if (genderResponse.status === 200 && Array.isArray(genderResponse.payload)) {
          setGenderOptions(genderResponse.payload);
        }

        const data = profileResponse.payload;
        const profileData: FormData = {
          name: data?.profile?.name || '',
          email: data?.user?.email || '',
          dob: data?.profile?.dateOfBirth ? ddMMYYYYToDate(data.profile.dateOfBirth) : undefined,
          gender: data?.profile?.gender || '',
        };

        setFormData(profileData);
        setOriginalData(profileData);
        setIsEmailVerified(!!data?.user?.email);
      } catch (error) {
        console.error('Load data error:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsPageLoading(false);
      }
    };
    loadData();
  }, []);

  // Check if email changed
  useEffect(() => {
    if (formData.email !== originalData.email && formData.email) {
      setIsEmailChanged(true);
      setIsEmailVerified(false);
      setShowOtpInput(false);
      setEmailOtp('');
      setResendTimer(0);
    } else {
      setIsEmailChanged(false);
      setIsEmailVerified(!!originalData.email);
    }
  }, [formData.email, originalData.email]);

  // Resend timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    if (isEmailChanged && !isEmailVerified) {
      newErrors.email = 'Please verify your email before saving';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendEmailOtp = async () => {
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await sendEmailVerification({ email: formData.email });
      if (response.error) {
        toast.error(response.message || 'Failed to send verification email');
        return;
      }
      toast.success('Verification code sent to your email');
      setShowOtpInput(true);
      setResendTimer(60);
    } catch (error) {
      handleError(error, {
        component: 'Profile',
        action: 'Send Email Verification',
        showToast: true,
        fallbackMessage: 'Failed to send verification email',
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await verifyEmailOTP({ email: formData.email, otp: emailOtp });
      if (response.error) {
        toast.error(response.message || 'Invalid OTP');
        return;
      }
      toast.success('Email verified successfully!');
      setIsEmailVerified(true);
      setShowOtpInput(false);
      setEmailOtp('');
      setIsEmailChanged(false);
      setResendTimer(0);
    } catch (error) {
      handleError(error, {
        component: 'Profile',
        action: 'Verify Email OTP',
        showToast: true,
        fallbackMessage: 'Failed to verify otp',
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const dateOfBirth = formData.dob ? format(formData.dob, 'dd-MM-yyyy') : '';

      const payload = {
        name: formData.name.trim(),
        dateOfBirth,
        gender: formData.gender,
        email: formData.email.trim(),
      };

      const response = await editProfile(payload);

      if (response.error) {
        toast.error(response.message || 'Failed to update profile');
        return;
      }

      toast.success('Profile updated successfully!');
      setOriginalData(formData);
      setIsEmailChanged(false);
    } catch (error) {
      const ApiError = error as ErrorResponse;
      console.error('Update error:', ApiError);
      toast.error(ApiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) setErrors((prev) => ({ ...prev, [field as string]: '' }));
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  const formatGenderLabel = (gender: string) => {
    if (!gender) return '';
    return gender.charAt(0) + gender.slice(1).toLowerCase();
  };

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;

  if (isPageLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="-mx-2 flex flex-wrap">
          {/* Name */}
          <div className="mb-6 w-full px-2 md:w-1/2">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div
              className={cn(
                'focus-within:border-primary flex overflow-hidden rounded border transition-colors',
                errors.name ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <span className="flex items-center border-r border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm font-medium text-gray-700 sm:px-3">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full flex-1 px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-6 w-full px-2 md:w-1/2">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div
              className={cn(
                'focus-within:border-primary flex overflow-hidden rounded border transition-colors',
                errors.email ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <span className="flex items-center border-r border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm font-medium text-gray-700 sm:px-3">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full flex-1 px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder="Enter your email"
              />
              {isEmailVerified && !isEmailChanged && (
                <span className="flex items-center px-3">
                  <CircleCheck className="h-5 w-5 text-green-600" />
                </span>
              )}
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}

            {isEmailChanged && !isEmailVerified && !showOtpInput && (
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSendEmailOtp}
                  disabled={!formData.email}
                  isLoading={isSendingOtp}
                  loadingText="Sending..."
                >
                  Verify Email
                </Button>
              </div>
            )}

            {showOtpInput && !isEmailVerified && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP sent to your email"
                    maxLength={6}
                    className="focus:border-primary h-10 flex-1 rounded border border-gray-300 px-3 text-sm transition-all outline-none"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={emailOtp.length !== 6}
                    isLoading={isVerifyingOtp}
                    loadingText="Verifying..."
                    className="h-10"
                  >
                    Verify
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSendEmailOtp}
                    disabled={isSendingOtp || resendTimer > 0}
                    className="h-auto p-0 text-sm font-medium text-blue-600 hover:bg-transparent hover:text-blue-700 hover:underline"
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* DOB */}
          <div className="mb-6 w-full px-2 md:w-1/2">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'focus-within:border-primary flex cursor-pointer overflow-hidden rounded border transition-colors',
                    'border-gray-300'
                  )}
                >
                  <span className="flex items-center border-r border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm font-medium text-gray-700 sm:px-3">
                    <CalendarIcon className="h-4 w-4" />
                  </span>
                  <button
                    type="button"
                    className={cn(
                      'w-full flex-1 px-3 py-2.5 text-left text-sm outline-none',
                      !formData.dob && 'text-gray-500'
                    )}
                  >
                    {formData.dob ? format(formData.dob, 'dd-MM-yyyy') : 'Pick a date'}
                  </button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dob}
                  onSelect={(newDate) => {
                    updateField('dob', newDate);
                    setShowDatePicker(false);
                  }}
                  captionLayout="dropdown"
                  startMonth={new Date(startYear, 0)}
                  endMonth={new Date(currentYear, 11)}
                  disabled={(date) => date > new Date() || date < new Date(startYear, 0, 1)}
                  defaultMonth={formData.dob || new Date(currentYear - 25, 0)}
                />
              </PopoverContent>
            </Popover>
            {errors.dob && <p className="mt-1 text-xs text-rose-400">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="mb-6 w-full px-2 md:w-1/2">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <div
              className={cn(
                'focus-within:border-primary flex overflow-hidden rounded border transition-colors',
                errors.gender ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <span className="flex items-center border-r border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm font-medium text-gray-700 sm:px-3">
                <User className="h-4 w-4" />
              </span>
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className="h-auto w-full border-0 px-3 py-2.5 text-sm !shadow-none outline-none focus:ring-0">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="!rounded !shadow-none">
                  {genderOptions.map((gender) => (
                    <SelectItem key={gender} value={gender} className="cursor-pointer rounded">
                      {formatGenderLabel(gender)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.gender && <p className="mt-1 text-xs text-rose-400">{errors.gender}</p>}
          </div>

          {/* Save Changes Button */}
          <div className="mb-8 flex w-full justify-end px-2">
            <Button
              type="submit"
              disabled={!hasChanges || (isEmailChanged && !isEmailVerified)}
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="">
        <div className="border"></div>
        <div className="mt-8 flex flex-col">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsDeleteModalOpen(true)}
            className="h-auto w-fit justify-start p-0 text-lg font-semibold text-rose-400 hover:bg-transparent hover:text-rose-500"
          >
            Delete Account
          </Button>
        </div>
        <p className="text-md left text-gray-500">These actions are irreversible. Please contact support if needed.</p>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </div>
  );
};

export default Profile;
