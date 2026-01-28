'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import toast from 'react-hot-toast';
import { accountDeleteReason, accountDelete } from '@/apis/auth.api';
import { Trash2 } from '@/components/shared/svg/lucide-icon';
import { CloseIcon } from '@/components/shared/svg/svg-icon';
import { Button } from '@/components/ui/button';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const router = useRouter();
  const [deleteReasons, setDeleteReasons] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [deleteReasonText, setDeleteReasonText] = useState<string>('');
  const [isLoadingReasons, setIsLoadingReasons] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteErrors, setDeleteErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      fetchDeleteReasons();
    }
  }, [isOpen]);

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

  const validateDeleteForm = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedReason) newErrors.reason = 'Please select a reason';
    setDeleteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleClose = () => {
    if (isDeletingAccount) return;
    setSelectedReason('');
    setDeleteReasonText('');
    setDeleteErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" onClick={handleClose} />

      <div
        className="relative z-10 flex h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Delete Your Account?</h2>
              <p className="mt-1.5 text-sm text-gray-600">
                This action cannot be undone. Your account and all data will be permanently deleted.
              </p>
            </div>
            <button
              aria-label="Close"
              onClick={handleClose}
              disabled={isDeletingAccount}
              className="ml-4 cursor-pointer rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="customScrollbar flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="space-y-6">
            {/* Select Reason */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Why are you deleting your account? <span className="text-red-500">*</span>
              </label>
              {isLoadingReasons ? (
                <div className="flex items-center justify-center py-8">
                  <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
                </div>
              ) : deleteReasons.length > 0 ? (
                <div className="customScrollbar max-h-60 space-y-2 overflow-y-auto rounded border border-gray-200 p-2">
                  {deleteReasons.map((reason, index) => (
                    <label
                      key={`reason-${index}`}
                      className="flex cursor-pointer items-start gap-3 rounded border-2 p-3 transition-all duration-200 hover:bg-red-50"
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
                        className="mt-0.5 h-4 w-4 cursor-pointer accent-red-500"
                      />
                      <span className="flex-1 text-sm font-medium text-gray-900">{reason}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-gray-500">No reasons available</p>
              )}
              {deleteErrors.reason && <p className="text-xs text-rose-500">{deleteErrors.reason}</p>}
            </div>

            {/* Additional Details */}
            <div className="space-y-2">
              <label htmlFor="reason-text" className="block text-sm font-semibold text-gray-700">
                Additional details (Optional)
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
                className="customScrollbar w-full resize-none rounded border border-gray-300 px-4 py-3 text-sm transition-all duration-200 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                rows={4}
                maxLength={500}
              />
              <p className="text-right text-xs text-gray-500">{deleteReasonText.length}/500</p>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isDeletingAccount}
              className="h-11 flex-1 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeletingAccount}
              isLoading={isDeletingAccount}
              loadingText="Deleting..."
              className="h-11 flex-1 gap-2 font-semibold"
            >
              {!isDeletingAccount && <Trash2 className="h-4 w-4" />}
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
