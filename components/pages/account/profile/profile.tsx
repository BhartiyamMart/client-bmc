'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { accountDeleteReason, accountDelete } from '@/apis/auth.api';
import { dateToDDMMYYYY, ddMMYYYYToDate } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { Mail } from '@/components/shared/svg/svg-icon';
import { CalendarIcon, Trash2, User } from '@/components/shared/svg/lucide-icon';
import { editProfile, getGender, getProfile } from '@/apis/profile.api';

interface FormData {
  name: string;
  email: string;
  dob: Date | undefined;
  gender: string;
}

const Profile = () => {
  const router = useRouter();
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteReasons, setDeleteReasons] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [deleteReasonText, setDeleteReasonText] = useState<string>('');
  const [isLoadingReasons, setIsLoadingReasons] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteErrors, setDeleteErrors] = useState<Record<string, string>>({});

  // Fetch profile data and gender options on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsPageLoading(true);
        // Load both in parallel for faster loading
        const [genderResponse, profileResponse] = await Promise.all([
          getGender().catch(() => ({ status: 200, payload: ['MALE', 'FEMALE', 'OTHER'] })),
          getProfile(),
        ]);

        // Set gender options
        if (genderResponse.status === 200 && Array.isArray(genderResponse.payload)) {
          setGenderOptions(genderResponse.payload);
        }

        // Set profile data
        const data = profileResponse.payload;
        const profileData: FormData = {
          name: data?.profile?.name || '',
          email: data?.user?.email || '',
          dob: data?.profile?.dateOfBirth ? ddMMYYYYToDate(data.profile.dateOfBirth) : undefined,
          gender: data?.profile?.gender || '',
        };

        setFormData(profileData);
        setOriginalData(profileData);
      } catch (error) {
        console.error('Load data error:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsPageLoading(false);
      }
    };
    loadData();
  }, []);

  const fetchDeleteReasons = async () => {
    setIsLoadingReasons(true);
    try {
      const response = await accountDeleteReason();

      if (response.status === 200) {
        setDeleteReasons(Array.isArray(response.payload) ? response.payload : []);
      } else {
        toast.error(response.message || 'Failed to fetch delete reasons');
      }
    } catch (error) {
      console.error('Fetch delete reasons error:', error);
      toast.error('Failed to fetch delete reasons');
    } finally {
      setIsLoadingReasons(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDeleteForm = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedReason) newErrors.reason = 'Please select a reason';
    setDeleteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsDeleteDialogOpen(true);
    await fetchDeleteReasons();
  };

  const handleConfirmDelete = async () => {
    if (!validateDeleteForm()) return;

    setIsDeletingAccount(true);
    try {
      const payload: any = {
        deleteTitle: selectedReason,
      };

      if (deleteReasonText.trim()) {
        payload.deleteReason = deleteReasonText.trim();
      }

      const response = await accountDelete(payload);

      if (response.status === 200) {
        toast.success('Account deleted successfully');
        localStorage.removeItem('auth-storage');
        setTimeout(() => {
          router.replace('/');
        }, 1000);
      } else {
        toast.error(response.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('Failed to delete account');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) setErrors((prev) => ({ ...prev, [field as string]: '' }));
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  // Helper function to format gender label
  const formatGenderLabel = (gender: string) => {
    if (!gender) return '';
    return gender.charAt(0) + gender.slice(1).toLowerCase();
  };

  // Year range for calendar
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;

  // Show loading state
  if (isPageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-12">
          {/* Name */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">Full Name *</label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={`w-full rounded-md border px-4 py-2 pl-10 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-orange-500/20 ${
                  errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                } hover:bg-orange-50`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">Email *</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={`w-full rounded-md border py-2 pr-4 pl-10 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-orange-500/20 ${
                  errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                } hover:bg-orange-50`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* DOB */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">Date of Birth *</label>
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <CalendarIcon className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    className={cn(
                      'h-auto w-full justify-start rounded-md border px-4 py-2 pl-10 text-left text-lg font-normal transition-all duration-200 hover:bg-orange-50 focus:border-orange-500',
                      !formData.dob && 'text-gray-500',
                      'border-gray-200'
                    )}
                  >
                    {formData.dob ? format(formData.dob, 'PPP') : 'Pick a date'}
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
            {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">Gender *</label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger
                  className={`w-full rounded-md border px-4 py-2.5 pl-10 text-lg font-medium transition-all duration-200 hover:bg-orange-50 focus:ring-4 focus:ring-orange-500/20 ${
                    errors.gender ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                  }`}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {formatGenderLabel(gender)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
          </div>

          {/* Save Changes Button */}
          <div className="col-span-12 mb-8 px-2">
            <button
              type="submit"
              disabled={isLoading || !hasChanges}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-orange-700 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-orange-700 hover:to-orange-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="mt-12 rounded-xl border border-gray-200 p-6 pt-10">
        <div className="grid grid-cols-1">
          <button
            type="button"
            onClick={handleDeleteClick}
            className="flex w-full cursor-pointer text-lg font-semibold text-red-500"
          >
            <Trash2 className="mr-1 h-5 w-5" />
            Delete Account
          </button>
        </div>
        <p className="text-md left mt-2 text-gray-500">
          These actions are irreversible. Please contact support if needed.
        </p>
      </div>

      {/* Delete Account Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="shrink-0"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Delete Your Account?</h2>
                <p className="mt-1 text-sm text-gray-600">
                  This action cannot be undone. Your account and all associated data will be permanently deleted.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="my-8 space-y-6 border-t border-b border-gray-200 py-6">
              {/* Select Reason */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Why are you deleting your account? *
                </label>
                {isLoadingReasons ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                  </div>
                ) : deleteReasons.length > 0 ? (
                  <div className="max-h-40 space-y-2 overflow-y-auto">
                    {deleteReasons.map((reason, index) => (
                      <label
                        key={`reason-${index}`}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-all duration-200 hover:bg-red-50"
                        style={{
                          borderColor: selectedReason === reason ? '#ef4444' : '#e5e7eb',
                          backgroundColor: selectedReason === reason ? '#fef2f2' : 'transparent',
                        }}
                      >
                        <input
                          type="radio"
                          name="delete-reason"
                          value={reason}
                          checked={selectedReason === reason}
                          onChange={(e) => {
                            setSelectedReason(e.target.value);
                            if (deleteErrors.reason) {
                              setDeleteErrors((prev) => ({ ...prev, reason: '' }));
                            }
                          }}
                          className="mt-1 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-900">{reason}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No reasons available</p>
                )}
                {deleteErrors.reason && <p className="text-xs text-red-500">{deleteErrors.reason}</p>}
              </div>

              {/* Additional Details */}
              <div className="space-y-2">
                <label htmlFor="reason-text" className="block text-sm font-semibold text-gray-700">
                  Please provide additional details (Optional)
                </label>
                <textarea
                  id="reason-text"
                  value={deleteReasonText}
                  onChange={(e) => {
                    setDeleteReasonText(e.target.value);
                    if (deleteErrors.reasonText) {
                      setDeleteErrors((prev) => ({ ...prev, reasonText: '' }));
                    }
                  }}
                  placeholder="Tell us more about your reason for leaving..."
                  className="w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 text-sm font-medium transition-all duration-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                  rows={4}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setSelectedReason('');
                  setDeleteReasonText('');
                  setDeleteErrors({});
                }}
                disabled={isDeletingAccount}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeletingAccount}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeletingAccount ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
