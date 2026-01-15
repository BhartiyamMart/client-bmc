'use client';

import React, { useState } from 'react';
import { Wallet, Plus, CreditCard, SmartPhone, AlertTriangle, Gift } from '@/components/shared/svg/lucide-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Dialog, DialogTrigger } from '@/components/ui/dialog';
// import TermsContent from '../terms/terms';

const MyWallet = () => {
  const [amount, setAmount] = useState<string>();
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('upi');
  const [acceptTerms] = useState<boolean>(false);

  // Explicitly type the array as number[]
  const quickAmounts: number[] = [500, 1000, 2000, 5000];

  const handleQuickAmount = (quickAmount: number): void => {
    setAmount(quickAmount.toString());
    setSelectedQuickAmount(quickAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
    const enteredAmount = parseInt(e.target.value);
    if (!quickAmounts.includes(enteredAmount)) {
      setSelectedQuickAmount(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 sm:bg-white">
      <div className="space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
          <div className="rounded-lg bg-orange-100 p-1.5 sm:p-2">
            <Wallet className="h-4 w-4 text-orange-600 sm:h-5 sm:w-5" />
          </div>
          <h1 className="text-base font-medium text-gray-900 sm:text-lg md:text-xl">Bhartiyam Wallet & Transactions</h1>
        </div>

        {/* Main Wallet Container */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:space-y-6 sm:p-6">
          {/* Balance Section */}
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-xs font-medium text-gray-600 sm:text-sm">Your Balance</h2>
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">₹25,000</p>
          </div>

          {/* Add Money Section */}
          <div className="space-y-3 border-t border-gray-100 pt-4 sm:space-y-4 sm:pt-6">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base">Add Money</h3>
            </div>

            <div className="text-xs text-gray-500">You can add money instantly</div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm font-medium text-gray-500 sm:text-base">
                  ₹
                </span>
                <Input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="h-10 w-full pl-7 text-base font-medium sm:h-12 sm:pl-8 sm:text-lg"
                  placeholder="Enter amount"
                />
              </div>
              <p className="text-xs text-gray-500">UPI can have maximum of ₹25000</p>
            </div>

            {/* Quick Amounts */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700 sm:text-sm">Quick amounts</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickAmounts.map((quickAmount: number) => (
                  <button
                    key={quickAmount}
                    onClick={() => handleQuickAmount(quickAmount)}
                    className={`flex-shrink-0 cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-orange-100 sm:px-4 sm:py-2 sm:text-sm ${
                      selectedQuickAmount === quickAmount
                        ? 'border-orange-500 bg-orange-50 text-orange-500'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    ₹{quickAmount.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 border-t border-gray-100 pt-4 sm:space-y-4 sm:pt-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 sm:text-base">
              <CreditCard className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
              Payment Method
            </h3>

            {/* Payment Options */}
            <div className="space-y-2 sm:space-y-3">
              {/* UPI Option */}
              <label
                className={`flex cursor-pointer items-start gap-2 rounded-lg border-2 p-3 transition-all sm:gap-3 sm:p-4 ${
                  selectedPayment === 'upi'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="relative top-0.5 sm:top-1">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPayment === 'upi'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedPayment(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 sm:h-4 sm:w-4 ${
                      selectedPayment === 'upi' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {selectedPayment === 'upi' && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2"></div>
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <SmartPhone className="h-3.5 w-3.5 flex-shrink-0 text-gray-600 sm:h-4 sm:w-4" />
                    <span className="text-sm font-medium text-gray-900 sm:text-base">UPI</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm">
                    Supports PhonePe, GPay, Paytm and more
                  </p>
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`flex cursor-pointer items-start gap-2 rounded-lg border-2 p-3 transition-all sm:gap-3 sm:p-4 ${
                  selectedPayment === 'card'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="relative top-0.5 sm:top-1">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedPayment(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 sm:h-4 sm:w-4 ${
                      selectedPayment === 'card' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {selectedPayment === 'card' && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2"></div>
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5 flex-shrink-0 text-gray-600 sm:h-4 sm:w-4" />
                    <span className="text-sm font-medium text-gray-900 sm:text-base">Card</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm">Visa, Mastercard, Rupay</p>
                </div>
              </label>
            </div>
          </div>

          {/* Add Amount Button */}
          <Button
            className="h-10 w-full cursor-pointer bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 sm:h-12 sm:text-base"
            disabled={!amount || !acceptTerms}
          >
            Add amount
          </Button>

          {/* Important Note */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600 sm:h-5 sm:w-5" />
              <div className="min-w-0">
                <h4 className="mb-1 text-sm font-semibold text-yellow-800 sm:text-base">Important Note</h4>
                <p className="text-xs text-yellow-700 sm:text-sm">
                  Once money is added to your wallet, withdrawal is not available
                </p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          {/* <div className="flex items-start gap-2 sm:gap-3">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked: boolean | 'indeterminate') => setAcceptTerms(checked as boolean)}
              className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
            />
            <div className="text-xs sm:text-sm leading-relaxed text-gray-600 min-w-0">
              I agree to the{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    type="button" 
                    className="text-orange-600 cursor-pointer underline hover:text-orange-700 focus:outline-none break-words"
                  >
                    Terms & Conditions
                  </button>
                </DialogTrigger>
                <TermsContent />
              </Dialog>
            </div>
          </div> */}
        </div>

        {/* Cashback Offer */}
        <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 sm:px-4">
          <div className="flex flex-col items-center justify-center gap-2 text-green-700 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-green-100 p-1.5 sm:p-2">
                <Gift className="h-3.5 w-3.5 text-green-600 sm:h-4 sm:w-4" />
              </div>
              <span className="text-sm font-bold sm:text-base">Cashback Offer:</span>
            </div>
            <span className="text-sm font-bold text-green-600 sm:text-base">
              10% cashback
              <span className="ml-1 text-xs text-green-600 sm:text-sm">(Up to ₹5,000)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
