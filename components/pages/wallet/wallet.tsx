'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MyWallet from './wallet-details';

const Wallet = () => {
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const router = useRouter();

  // Check if terms have been acknowledged on component mount
  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('wallet-terms-acknowledged');
    if (hasAcknowledged === 'true') {
      setShowWallet(true);
      setShowTerms(false);
    }
    setIsLoading(false);
  }, []);

  const handleAcceptTerms = (): void => {
    // Save acknowledgment to localStorage
    localStorage.setItem('wallet-terms-acknowledged', 'true');
    setShowWallet(true);
    setShowTerms(false);
  };

  const handleDialogClose = (): void => {
    router.back(); // Navigate back to previous page without acknowledging
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAgreed(e.target.checked);
  };

  // Show loading state while checking localStorage
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show terms dialog if not acknowledged
  if (showTerms && !showWallet) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/30">
        <Dialog open={true} onOpenChange={handleDialogClose}>
          <DialogContent className="m-0 flex max-h-[80vh] flex-col gap-0 p-0 sm:max-w-xl">
            {/* Fixed Header */}
            <DialogHeader className="flex-shrink-0 border-b border-gray-200 bg-white p-4">
              <DialogTitle>Terms and Conditions</DialogTitle>
            </DialogHeader>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto bg-[#E8E8E8] p-4" style={{ maxHeight: 'calc(80vh - 120px)' }}>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">1. Wallet Usage</h3>
                  <p>
                    The Bhartiyam Wallet allows you to store money for purchases within the Bhartiyam Mart platform.
                    Once money is added to your wallet, it cannot be withdrawn or refunded.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">2. Adding Money</h3>
                  <p>
                    You can add money to your wallet using UPI or card payments. The maximum limit for UPI transactions
                    is ₹25,000 per transaction. All payments are processed securely through authorized payment gateways.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">3. Transaction Limits</h3>
                  <p>
                    Daily transaction limits may apply based on your payment method and verification status. We reserve
                    the right to modify these limits for security purposes.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">4. Cashback and Offers</h3>
                  <p>
                    Cashback offers are subject to terms and conditions. Cashback amounts will be credited to your
                    wallet within 24-48 hours of successful transaction completion.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">5. Security</h3>
                  <p>
                    You are responsible for maintaining the confidentiality of your account credentials. Report any
                    unauthorized transactions immediately to our customer support.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">6. Modification of Terms</h3>
                  <p>
                    We reserve the right to modify these terms and conditions at any time. Continued use of the wallet
                    service constitutes acceptance of modified terms.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">7. Privacy Policy</h3>
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                    the wallet service, to understand our practices regarding the collection, use, and disclosure of
                    your personal information.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">8. Liability Limitations</h3>
                  <p>
                    Bhartiyam Mart shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages arising out of your use of the wallet service, including but not limited to loss of profits,
                    data, or other intangible losses.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">9. Dispute Resolution</h3>
                  <p>
                    Any disputes arising from these terms will be resolved through binding arbitration in accordance
                    with the rules of the applicable arbitration association.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">10. Contact Information</h3>
                  <p>
                    For any questions regarding these terms and conditions, please contact our customer support team at
                    [support@bhartiyammart.com](mailto:support@bhartiyammart.com), call 1-800-BHARTIYAM, or write to us
                    at Bhartiyam Mart Customer Service, 123 Commerce Street, Business District, India 110001.
                  </p>
                </div>

                {/* Checkbox Agreement Section */}
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms-agreement"
                      checked={isAgreed}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 bg-gray-100 text-[#F0701E] focus:ring-2 focus:ring-[#F0701E]"
                    />
                    <label
                      htmlFor="terms-agreement"
                      className="cursor-pointer text-sm font-medium text-gray-900 select-none"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Footer with Button */}
            <div className="flex flex-shrink-0 justify-center border-t border-gray-200 bg-white py-4">
              <Button
                onClick={handleAcceptTerms}
                disabled={!isAgreed}
                className={`w-[80%] rounded-[8px] px-4 py-2 ${
                  isAgreed
                    ? 'cursor-pointer bg-[#F0701E] text-white hover:bg-[#e0601a]'
                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
              >
                Acknowledgement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Show wallet after terms are accepted or if already acknowledged
  return <MyWallet />;
};

export default Wallet;
