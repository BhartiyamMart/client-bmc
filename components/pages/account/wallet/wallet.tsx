'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import WalletDetails from './wallet-details';
import { useWalletStore } from '@/stores/useWallet.store';
import toast from 'react-hot-toast';
import { getWallet } from '@/apis/wallet.api';

const Wallet: React.FC = () => {
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasWallet = useWalletStore((state) => state.hasWallet);
  const walletTerms = useWalletStore((state) => state.walletTerms);
  const setHasWallet = useWalletStore((state) => state.setHasWallet);

  const handleAcceptTerms = useCallback(async (): Promise<void> => {
    if (!isAgreed || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getWallet();
      if (response.status === 201) {
        setHasWallet(true);
        toast.success('Wallet created successfully!');
        router.push('/account/wallet');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong while creating wallet';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isAgreed, isLoading, setHasWallet, router]);

  const handleDialogClose = useCallback((): void => {
    if (!isLoading) {
      router.back();
    }
  }, [isLoading, router]);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAgreed(e.target.checked);
  }, []);

  if (hasWallet) {
    return <WalletDetails />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Dialog open={true} onOpenChange={handleDialogClose}>
        <DialogContent className="m-0 flex max-h-[80vh] flex-col gap-0 p-0 sm:max-w-xl">
          <DialogHeader className="shrink-0 border-b border-gray-200 bg-white p-4">
            <DialogTitle className="text-lg font-semibold">Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div
            className="customScrollbar flex-1 overflow-y-auto bg-gray-50 p-4"
            style={{ maxHeight: 'calc(80vh - 120px)' }}
          >
            <div className="space-y-4 text-sm text-gray-700">
              {walletTerms.map((term, index) => (
                <div key={index}>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {index + 1}. {term.title}
                  </h3>
                  <p className="leading-relaxed">{term.content}</p>
                </div>
              ))}
              {/* Checkbox Agreement - Custom with White Tick */}
              <div className="border-t border-gray-300 bg-gray-50 pt-4 pb-2">
                <div className="flex items-start gap-3">
                  <label htmlFor="terms-agreement" className="relative flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      id="terms-agreement"
                      checked={isAgreed}
                      onChange={handleCheckboxChange}
                      disabled={isLoading}
                      className="peer sr-only"
                    />
                    <div className="peer peer-checked:border-primary peer-checked:bg-primary h-4.5 w-4.5 cursor-pointer rounded-xs border-2 border-gray-300 bg-white transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                      {isAgreed && (
                        <svg
                          className="h-full w-full text-white"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="terms-agreement"
                    className="flex-1 cursor-pointer text-sm font-medium text-gray-900 select-none"
                  >
                    I have read and agree to the terms and conditions
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex shrink-0 justify-center border-t border-gray-200 bg-white p-4">
            <Button
              onClick={handleAcceptTerms}
              disabled={!isAgreed || isLoading}
              className="w-full cursor-pointer rounded sm:w-[80%]"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded border-2 border-white border-t-transparent" />
                  Creating Wallet...
                </>
              ) : (
                'Accept & Create Wallet'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
