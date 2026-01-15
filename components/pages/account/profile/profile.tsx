'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { editProfile, getProfile, accountDeleteReason, accountDelete } from '@/apis/auth.api';
import { dateToDDMMYYYY, ddMMYYYYToDate } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { Mail } from '@/components/shared/svg/svg-icon';
import { CalendarIcon, PencilLine, Trash2, User } from '@/components/shared/svg/lucide-icon';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteReasons, setDeleteReasons] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [deleteReasonText, setDeleteReasonText] = useState<string>('');
  const [isLoadingReasons, setIsLoadingReasons] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteErrors, setDeleteErrors] = useState<Record<string, string>>({});

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile();
      const data = response.payload;
      console.log('profileData', data);

      const profileData: FormData = {
        name: data?.profile?.name || '',
        email: data?.user?.email || '',
        dob: data?.profile?.dateOfBirth ? ddMMYYYYToDate(data.profile.dateOfBirth) : undefined,
        gender: data?.profile?.gender || '',
      };

      setFormData(profileData);
      setOriginalData(profileData);
      setDate(profileData.dob);
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

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
    // if (!deleteReasonText.trim()) newErrors.reasonText = 'Please provide additional details';
    setDeleteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const dateOfBirth = formData.dob ? format(formData.dob, 'dd-MM-yyyy') : '';

      const genderMap: Record<string, string> = {
        male: 'MALE',
        female: 'FEMALE',
        other: 'OTHER',
        'prefer-not-to-say': 'PREFER_NOT_TO_SAY',
      };
      const apiGender = genderMap[formData.gender.toLowerCase()] || formData.gender.toUpperCase();

      const payload = {
        name: formData.name.trim(),
        dateOfBirth,
        gender: apiGender,
        email: formData.email.trim(),
      };

      const response = await editProfile(payload);

      if (response.error) {
        toast.error(response.message || 'Failed to update profile');
        return;
      }

      toast.success('Profile updated successfully!');
      setOriginalData(formData);
      setIsEditing(false);
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
      // Fix: Only include deleteReason if it has content, otherwise omit it
      const payload: any = {
        deleteTitle: selectedReason,
      };

      // Only add deleteReason if user provided text
      if (deleteReasonText.trim()) {
        payload.deleteReason = deleteReasonText.trim();
      }
      // Backend will use default "I am using another account" if deleteReason is omitted

      console.log('Delete payload:', payload); // Debug log

      const response = await accountDelete(payload);

      if (response.status === 200) {
        toast.success('Account deleted successfully');

        // Remove auth storage
        localStorage.removeItem('auth-storage');

        // Redirect to home
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

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-12">
          {/* Name */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="h-4 w-4" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              disabled={!isEditing}
              className={`w-full rounded-md border px-4 py-2 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-orange-500/20 ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
              } ${!isEditing ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-orange-50'}`}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Mail className="h-4 w-4" />
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                disabled={!isEditing}
                className={`w-full rounded-md border py-2 pr-4 pl-12 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-orange-500/20 ${
                  errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                } ${!isEditing ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-orange-50'}`}
              />
              <div className="absolute top-1/2 left-4 -translate-y-1/2 text-green-500">✓</div>
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* DOB */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarIcon className="h-4 w-4" />
              Date of Birth *
            </label>
            <div className="space-y-2">
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => setShowDatePicker(!showDatePicker)}
                className={cn(
                  'h-auto w-full justify-start rounded-md border px-4 py-2 text-left text-lg font-normal transition-all duration-200',
                  !date && 'text-gray-500',
                  !isEditing
                    ? 'cursor-not-allowed border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:bg-orange-50 focus:border-orange-500'
                )}
              >
                <CalendarIcon className="mr-2 inline-block h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </button>
              {showDatePicker && isEditing && (
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      updateField('dob', newDate);
                      setShowDatePicker(false);
                    }}
                    disabled={(date) => date > new Date()}
                  />
                </div>
              )}
            </div>
            {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="col-span-12 mb-6 px-2 md:col-span-6">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarIcon className="h-4 w-4" />
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              disabled={!isEditing}
              className={`w-full rounded-md border px-4 py-2.5 text-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-orange-500/20 ${
                errors.gender ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
              } ${!isEditing ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-orange-50'}`}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
          </div>

          {/* Action Buttons */}
          <div className="col-span-12 mb-8 px-2 md:col-span-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="flex cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:shadow-md disabled:opacity-50"
              >
                <PencilLine className="mr-2 w-5" /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(originalData);
                    setDate(originalData.dob);
                    setErrors({});
                    setIsEditing(false);
                  }}
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-gray-100 px-6 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !hasChanges}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-orange-700 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-orange-700 hover:to-orange-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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
              </>
            )}
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

      {/* Delete Account Dialog - Inline */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="shrink-0">{/* <AlertCircle className="h-6 w-6 text-red-600" /> */}</div>
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
                        key={index}
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
                  Please provide additional details *
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
                  className={`w-full resize-none rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all duration-200 focus:ring-4 focus:ring-red-500/20 ${
                    deleteErrors.reasonText
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  rows={4}
                />
                {deleteErrors.reasonText && <p className="text-xs text-red-500">{deleteErrors.reasonText}</p>}
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
