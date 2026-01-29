'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from '@/components/shared/svg/lucide-icon';
import { CloseIcon } from '@/components/shared/svg/svg-icon';

interface DeleteAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  addressName?: string;
}

const DeleteAddressModal = ({ isOpen, onClose, onConfirm, isDeleting, addressName }: DeleteAddressModalProps) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (isDeleting) return;
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" onClick={handleClose} />

      <div
        className="relative z-10 w-full max-w-md overflow-hidden rounded bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Delete Address?</h2>
              <p className="mt-1.5 text-sm text-gray-600">This action cannot be undone.</p>
            </div>
            <button
              aria-label="Close"
              onClick={handleClose}
              disabled={isDeleting}
              className="ml-4 cursor-pointer rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{' '}
            {addressName ? (
              <>
                the address for <span className="font-semibold capitalize">{addressName}</span>
              </>
            ) : (
              'this address'
            )}
            ?
          </p>
          <p className="mt-2 text-sm text-gray-600">You can always add it back later if needed.</p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isDeleting}
              className="h-11 flex-1 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onConfirm}
              disabled={isDeleting}
              isLoading={isDeleting}
              loadingText="Deleting..."
              className="h-11 flex-1 gap-2 font-semibold"
            >
              {!isDeleting && <Trash2 className="h-4 w-4" />}
              Delete Address
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressModal;
