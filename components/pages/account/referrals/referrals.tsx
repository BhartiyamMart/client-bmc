'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { generateReferral, getReferralCode } from '@/apis/referrals.api';
import { Copy, Gift, RefreshCw, Users } from '@/components/shared/svg/lucide-icon';
import { useRouter } from 'next/navigation';
import { ReferralData } from '@/interfaces/referral.interface';
import ReferralSkeleton from './referral-skeleton';

interface UIState {
  isLoading: boolean;
  isFetching: boolean;
  isCopied: boolean;
  fetchError: boolean;
}

const ReferralPage = () => {
  const [referralData, setReferralData] = useState<ReferralData>({
    hasReferralCode: false,
    code: '',
    totalReferrals: 0,
    recentReferrals: [],
  });

  const [uiState, setUIState] = useState<UIState>({
    isLoading: false,
    isFetching: true,
    isCopied: false,
    fetchError: false,
  });

  const router = useRouter();

  useEffect(() => {
    fetchReferralCode();
  }, []);

  const fetchReferralCode = async () => {
    setUIState((prev) => ({ ...prev, isFetching: true, fetchError: false }));

    try {
      const res = await getReferralCode();
      console.log('getReferralCode response:', res);

      if (res.status === 200) {
        const { hasReferralCode, code, totalReferrals, recentReferrals } = res.payload;

        setReferralData({
          hasReferralCode: hasReferralCode || false,
          code: code || '',
          totalReferrals: totalReferrals || 0,
          recentReferrals: recentReferrals || [],
        });
        console.log('referrals:', referralData);
      } else {
        console.warn('Non-200 response:', res);
        setUIState((prev) => ({ ...prev, fetchError: true }));

        if (res.status !== 404) {
          toast.error(res.message || 'Failed to fetch referral code');
        }
      }
    } catch (error) {
      console.error('Fetch referral code exception:', error);
      setUIState((prev) => ({ ...prev, fetchError: true }));
      toast.error('Network error. Please check your connection.');
    } finally {
      setUIState((prev) => ({ ...prev, isFetching: false }));
    }
  };

  const generateReferralCode = async () => {
    setUIState((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await generateReferral();
      console.log('generateReferral response:', res);

      if (res.status === 201 && res.payload?.referralCode) {
        setReferralData((prev) => ({
          ...prev,
          hasReferralCode: true,
          code: res.payload.referralCode,
        }));

        toast.success('Referral code generated! 🎉');
        router.refresh();
      } else {
        toast.error(res.message || 'Failed to generate code');
      }
    } catch (error) {
      console.error('Generate referral code error:', error);
      toast.error('Failed to generate code');
    } finally {
      setUIState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const copyToClipboard = async () => {
    if (!referralData.code) return;

    try {
      await navigator.clipboard.writeText(referralData.code);
      setUIState((prev) => ({ ...prev, isCopied: true }));
      toast.success('Code copied!');
      setTimeout(() => setUIState((prev) => ({ ...prev, isCopied: false })), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy');
    }
  };

  // Loading state
  if (uiState.isFetching) {
    return <ReferralSkeleton />;
  }

  // Error state
  if (uiState.fetchError && !referralData.hasReferralCode) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-gray-600">Unable to load referral data</p>
          <Button onClick={fetchReferralCode} className="">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: 'Generate Code',
      desc: 'Get your unique code',
    },
    {
      number: 2,
      title: 'Share with Friends',
      desc: 'Via WhatsApp or SMS',
    },
    {
      number: 3,
      title: 'Earn Rewards',
      desc: 'Get ₹50 per signup',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Empty State - No Code Generated */}
      {!referralData.hasReferralCode ? (
        <div className="flex min-h-100 flex-col items-center justify-center space-y-4 py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Gift className="h-10 w-10 text-gray-600" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Start Earning Rewards</h2>
            <p className="max-w-md text-gray-600">Generate your unique referral code and earn ₹50 for every friend</p>
          </div>
          <Button
            onClick={generateReferralCode}
            disabled={uiState.isLoading}
            isLoading={uiState.isLoading}
            loadingText="Generating..."
            className="gap-2"
          >
            <Gift className="h-4 w-4" />
            Generate My Code
          </Button>
        </div>
      ) : (
        /* Referral Code + Stats - No Card */
        <div className="space-y-6">
          {/* Referral Code Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Referral Code</label>
            <div className="flex items-center justify-between rounded border border-gray-300 bg-gray-50 p-4">
              <code className="text-2xl font-bold tracking-wider text-gray-900 md:text-3xl">{referralData.code}</code>
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant={uiState.isCopied ? 'default' : 'outline'}
                className={`gap-2 ${
                  uiState.isCopied ? 'bg-green-600 text-white hover:bg-green-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Copy className="h-4 w-4" />
                {uiState.isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Performance</label>
            <div className="flex items-center gap-4 rounded border border-gray-200 bg-gray-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{referralData.totalReferrals}</p>
                <p className="text-sm text-gray-600">Friends Referred</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How it Works - Always Visible */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">How Referrals Work</h3>
          <p className="mt-1 text-sm text-gray-600">Simple 3-step process to earn rewards</p>
        </div>

        {/* Horizontal Stepper */}
        <div className="relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-5 right-5 left-5 hidden h-0.5 bg-gray-200 md:block"></div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-start gap-3 md:items-center">
                {/* Circle with number */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1 text-left md:text-center">
                  <h4 className="mb-1 font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>

                {/* Mobile vertical line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-5 h-full w-0.5 bg-gray-200 md:hidden"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
