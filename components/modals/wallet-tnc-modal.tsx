'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { Button } from '@/components/ui/button';
import { useWalletStore } from '@/stores/useWallet.store';
import toast from 'react-hot-toast';
import { getWallet } from '@/apis/wallet.api';
import { CircleCheck, Wallet as WalletIcon } from '@/components/shared/svg/lucide-icon';
import { CloseIcon } from '@/components/shared/svg/svg-icon';

interface WalletTncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const WalletTncModal: React.FC<WalletTncModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const walletTerms = useWalletStore((state) => state.walletTerms);
  const setHasWallet = useWalletStore((state) => state.setHasWallet);
  const setWalletChecked = useWalletStore((state) => state.setWalletChecked);
  const handleAcceptTerms = useCallback(async (): Promise<void> => {
    if (!isAgreed || isLoading) return;

    setIsLoading(true);
    try {
      // Call getWallet API - this creates the wallet
      const response = await getWallet();

      if (response.status === 201 || response.status === 200) {
        setHasWallet(true);
        setWalletChecked(true);
        toast.success('Wallet created successfully!');
        setIsAgreed(false);
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/account/wallet');
        }

        onClose();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong while creating wallet';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isAgreed, isLoading, setHasWallet, setWalletChecked, onSuccess, onClose, router]);

  const handleDialogClose = useCallback((): void => {
    if (!isLoading) {
      setIsAgreed(false);
      onClose();
    }
  }, [isLoading, onClose, router]);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAgreed(e.target.checked);
  }, []);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" onClick={handleDialogClose} />

      <div
        className="relative z-10 flex h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Wallet Terms & Conditions</h2>
              <p className="mt-1.5 text-sm text-gray-600">Please read and accept the terms to create your wallet</p>
            </div>
            <button
              aria-label="Close"
              onClick={handleDialogClose}
              disabled={isLoading}
              className="ml-4 cursor-pointer rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="customScrollbar flex-1 overflow-y-auto bg-gray-50 px-4 py-6 sm:px-6">
          <div className="space-y-4">
            {walletTerms && walletTerms.length > 0 ? (
              walletTerms.map((term, index) => (
                <div key={index} className="rounded bg-white p-4 shadow-sm">
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {index + 1}. {term.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">{term.content}</p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-8">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
              </div>
            )}

            {/* Checkbox Agreement */}
            {walletTerms && walletTerms.length > 0 && (
              <div className="rounded border-2 border-gray-200 bg-white p-4">
                <label htmlFor="terms-agreement" className="flex cursor-pointer items-center gap-2">
                  <div className="relative mt-0.5 flex items-center">
                    <input
                      type="checkbox"
                      id="terms-agreement"
                      checked={isAgreed}
                      onChange={handleCheckboxChange}
                      disabled={isLoading}
                      className="peer sr-only"
                    />
                    <div className="peer-checked:border-primary peer-checked:bg-primary flex h-5 w-5 cursor-pointer items-center justify-center rounded-xs border-2 border-gray-300 bg-white transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                      {isAgreed && <CircleCheck className="h-full w-full text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <span className="mt-0.5 flex-1 text-sm font-medium text-gray-900 select-none">
                    I have read and agree to the terms and conditions
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleDialogClose}
              disabled={isLoading}
              className="h-11 flex-1 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAcceptTerms}
              disabled={!isAgreed || !walletTerms || walletTerms.length === 0}
              isLoading={isLoading}
              loadingText="Creating Wallet..."
              className="h-11 flex-1 gap-2 font-semibold"
            >
              {!isLoading && <WalletIcon className="h-4 w-4" />}
              Accept & Create Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTncModal;
