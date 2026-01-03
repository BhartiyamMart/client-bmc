'use client';

import OptimizedImage from '@/components/shared/optimizeImage';
import toast from 'react-hot-toast';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CloseIcon } from '../shared/svg/svg-icon';
import { useAuthStore } from '@/stores/useAuth.store';
import { editProfile, sendOtp, verifyOtp } from '@/apis/auth.api';

// Constants
const OTP_LENGTH = 6;
const PHONE_LENGTH = 10;
const RESEND_TIMER_SECONDS = 60;
const DEVICE_INFO = { deviceType: 'WEBSITE' };

const AuthModal = () => {
  const router = useRouter();

  // Global state (persisted)
  const isAuthModalOpen = useAuthStore((s) => s.isAuthModalOpen);
  const currentStep = useAuthStore((s) => s.currentStep);
  const setAuthModalOpen = useAuthStore((s) => s.setAuthModalOpen);
  const setCurrentStep = useAuthStore((s) => s.setCurrentStep);
  const setToken = useAuthStore((s) => s.setToken);
  const setUserProfile = useAuthStore((s) => s.setUserProfile);
  const resetAuthFlow = useAuthStore((s) => s.resetAuthFlow);

  // Local state (NOT persisted - security & UX)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isVerifyingRef = useRef(false); // ✅ Prevent multiple verifications

  // ✅ Reset to phone step if on OTP/profile step without phone number (on reload)
  useEffect(() => {
    if ((currentStep === 'otp' || currentStep === 'profile') && !phoneNumber) {
      setCurrentStep('phone');
    }
  }, [currentStep, phoneNumber, setCurrentStep]);

  // Start resend timer
  const startResendTimer = useCallback(() => {
    setResendTimer(RESEND_TIMER_SECONDS);

    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Close modal
  const close = useCallback(() => {
    setAuthModalOpen(false);
    resetAuthFlow();
    if (timerRef.current) clearInterval(timerRef.current);

    // Reset all local state
    setPhoneNumber('');
    setOtp('');
    setFirstName('');
    setReferralCode('');
    setResendTimer(0);
    setIsLoading(false);
    isVerifyingRef.current = false;
  }, [setAuthModalOpen, resetAuthFlow]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Auto-focus first OTP input
  useEffect(() => {
    if (currentStep === 'otp' && !isLoading) {
      setTimeout(() => otpInputsRef.current[0]?.focus(), 200);
    }
  }, [currentStep, isLoading]);

  // ✅ Fixed: Auto-submit OTP when 6 digits entered (prevents infinite loop)
  useEffect(() => {
    const handleOtpVerification = async () => {
      // ✅ Prevent duplicate calls
      if (otp.length !== OTP_LENGTH || isLoading || isVerifyingRef.current) return;

      isVerifyingRef.current = true;
      setIsLoading(true);

      try {
        const response = await verifyOtp({
          phoneNumber,
          otp,
          deviceInfo: DEVICE_INFO,
        });

        if (response.error) {
          toast.error(response.message);

          // ✅ Clear OTP on error to allow retry
          setOtp('');
          setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
        } else {
          toast.success(response.message);

          // Save token and profile
          setToken(response.payload.token);
          setUserProfile(response.payload.profile);

          // Check if user needs to complete profile
          if (response.payload.isName === false) {
            // New user - show profile form
            setCurrentStep('profile');
          } else {
            // Existing user - close modal and redirect
            setAuthModalOpen(false);
            resetAuthFlow();

            // Clear sensitive data
            setPhoneNumber('');
            setOtp('');

            router.push('/');
          }
        }
      } catch (error) {
        toast.error('Failed to verify OTP. Please try again.');

        // ✅ Clear OTP on error
        setOtp('');
        setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
      } finally {
        setIsLoading(false);
        isVerifyingRef.current = false;
      }
    };

    if (otp.length === OTP_LENGTH && currentStep === 'otp' && !isVerifyingRef.current) {
      handleOtpVerification();
    }
  }, [
    otp,
    currentStep,
    isLoading,
    phoneNumber,
    setCurrentStep,
    setToken,
    setUserProfile,
    setAuthModalOpen,
    resetAuthFlow,
    router,
  ]);

  // Handle phone submission
  const handlePhoneSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (phoneNumber.length !== PHONE_LENGTH) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }

      setIsLoading(true);

      try {
        const response = await sendOtp({ phoneNumber });
        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success('OTP sent successfully');
          setCurrentStep('otp');
          startResendTimer();
        }
      } catch (error) {
        toast.error('Failed to send OTP. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [phoneNumber, setCurrentStep, startResendTimer]
  );

  // Handle OTP input change
  const handleOtpChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d*$/.test(value)) return;

      const otpArray = otp.split('');
      const previousEmpty = otpArray.slice(0, index).some((digit) => !digit);
      if (previousEmpty) return;

      otpArray[index] = value.slice(-1);
      setOtp(otpArray.join(''));

      // Auto-focus next input
      if (value && index < OTP_LENGTH - 1) {
        setTimeout(() => otpInputsRef.current[index + 1]?.focus(), 50);
      }
    },
    [otp]
  );

  // Handle OTP backspace
  const handleOtpKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key !== 'Backspace') return;

      e.preventDefault();
      const otpArray = otp.split('');

      if (otpArray[index]) {
        otpArray[index] = '';
        setOtp(otpArray.join(''));
      } else if (index > 0) {
        otpArray[index - 1] = '';
        setOtp(otpArray.join(''));
        otpInputsRef.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  // Handle resend OTP
  const handleResendOtp = useCallback(async () => {
    if (resendTimer > 0 || isLoading) return;

    setIsLoading(true);

    try {
      const response = await sendOtp({ phoneNumber });
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success('OTP sent successfully');
        setOtp('');
        setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
        startResendTimer();
      }
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [resendTimer, isLoading, phoneNumber, startResendTimer]);

  // Handle profile submission
  const handleProfileSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!firstName.trim()) {
        toast.error('Please enter your full name');
        return;
      }

      setIsLoading(true);

      try {
        const response = await editProfile({
          firstName: firstName.trim(),
          referralCode: referralCode.trim() || undefined,
        });

        if (response.error) {
          toast.error(response.message);
        } else {
          toast.success(response.message);

          // Update user profile with new data
          setUserProfile({
            phoneNumber,
            firstName: firstName.trim(),
            email: null,
            middleName: null,
            lastName: null,
            dateOfBirth: null,
            profilePicture: null,
            gender: null,
          });

          setAuthModalOpen(false);
          resetAuthFlow();

          // Clear sensitive data
          setPhoneNumber('');
          setOtp('');
          setFirstName('');
          setReferralCode('');

          router.push('/');
        }
      } catch (error) {
        toast.error('Failed to create profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [firstName, referralCode, phoneNumber, setUserProfile, setAuthModalOpen, resetAuthFlow, router]
  );

  // Handle back button
  const handleBack = useCallback(() => {
    setCurrentStep('phone');
    setOtp('');
    if (timerRef.current) clearInterval(timerRef.current);
    setResendTimer(0);
    isVerifyingRef.current = false;
  }, [setCurrentStep]);

  // Format timer
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  const canResend = resendTimer === 0 && !isLoading;

  // Don't render if modal is not open
  if (!isAuthModalOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-112.5 rounded-lg bg-white shadow-xl">
        {/* Close Button - Only visible on phone step */}
        {currentStep === 'phone' && (
          <div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
            <button
              aria-label="Close"
              onClick={close}
              className="cursor-pointer rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Back Button for OTP step */}
        {currentStep === 'otp' && (
          <button
            type="button"
            onClick={handleBack}
            className="absolute top-3 left-3 z-10 cursor-pointer rounded-lg p-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:top-4 sm:left-4"
            disabled={isLoading}
            aria-label="Go back"
          >
            <ArrowLeft />
          </button>
        )}

        <div className="relative px-4 py-6 sm:px-6 sm:py-8">
          {/* Phone Step */}
          {currentStep === 'phone' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Logo */}
              <div className="text-center">
                <div className="mb-3 inline-block rounded-xl bg-orange-100 p-2.5 sm:mb-4 sm:p-3">
                  <OptimizedImage src="/images/favicon.webp" alt="Logo" width={40} height={40} priority />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  India&apos;s healthy and fresh grocery
                </h2>
                <p className="text-sm text-gray-600">Log in or Sign up</p>
              </div>

              {/* Phone Form */}
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="flex overflow-hidden rounded-lg border border-gray-300 transition-colors focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500">
                  <span className="border-r border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm font-medium text-gray-700 sm:px-3">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={PHONE_LENGTH}
                    className="w-full flex-1 px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                    placeholder="Enter mobile number"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={phoneNumber.length !== PHONE_LENGTH || isLoading}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    phoneNumber.length === PHONE_LENGTH && !isLoading
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'cursor-not-allowed bg-gray-200 text-gray-400'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Continue'}
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-gray-700 underline hover:text-gray-900">
                  Terms of Service
                </a>{' '}
                &{' '}
                <a href="/privacy" className="text-gray-700 underline hover:text-gray-900">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}

          {/* OTP Step */}
          {currentStep === 'otp' && (
            <div className="space-y-4 pt-6 sm:space-y-6">
              {/* Title */}
              <div className="text-center">
                <h2 className="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg">OTP Verification</h2>
                <div className="space-y-1 text-xs text-gray-600 sm:text-sm">
                  <p>We have sent a verification code to</p>
                  <p className="font-medium text-gray-900">+91 {phoneNumber}</p>
                </div>
              </div>

              {/* OTP Inputs */}
              <div className="space-y-4 sm:space-y-6">
                <div className="xs:gap-2 flex justify-center gap-1.5 px-2 sm:gap-2.5">
                  {Array.from({ length: OTP_LENGTH }, (_, index) => {
                    const filled = otp.length;
                    const nextAllowed = Math.min(filled, OTP_LENGTH - 1);

                    return (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[index] || ''}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onMouseDown={(e) => {
                          if (index > nextAllowed) {
                            e.preventDefault();
                            otpInputsRef.current[nextAllowed]?.focus();
                          }
                        }}
                        ref={(el) => {
                          otpInputsRef.current[index] = el;
                        }}
                        className={`xs:h-11 xs:w-11 xs:rounded-lg xs:text-lg h-10 w-10 shrink-0 rounded-md border text-center text-base font-semibold transition-all outline-none sm:h-12 sm:w-12 ${
                          otp[index] ? 'border-orange-500 bg-orange-50' : 'border-gray-300 focus:border-orange-500'
                        } ${isLoading || index > nextAllowed ? 'cursor-not-allowed bg-gray-50' : ''}`}
                        disabled={isLoading}
                      />
                    );
                  })}
                </div>

                {/* Loading */}
                {isLoading && (
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-xs text-orange-600 sm:text-sm">
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-orange-600 border-t-transparent sm:h-4 sm:w-4" />
                      <span>Verifying OTP...</span>
                    </div>
                  </div>
                )}

                {/* Resend */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={!canResend}
                    className={`text-xs font-medium sm:text-sm ${
                      canResend
                        ? 'cursor-pointer text-orange-600 hover:text-orange-700'
                        : 'cursor-not-allowed text-gray-400'
                    }`}
                  >
                    {resendTimer > 0 ? `Resend Code in ${formatTime(resendTimer)}` : 'Resend Code'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Step */}
          {currentStep === 'profile' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Title */}
              <div className="text-center">
                <div className="mb-3 inline-block rounded-xl bg-orange-100 p-2.5 sm:mb-4 sm:p-3">
                  <OptimizedImage src="/images/favicon.webp" alt="Logo" width={40} height={40} priority />
                </div>
                <h2 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">Complete Your Profile</h2>
                <p className="text-xs text-gray-600 sm:text-sm">Please complete your profile to continue</p>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100 sm:px-4"
                    disabled={isLoading}
                    required
                    maxLength={50}
                    autoFocus
                  />
                </div>

                {/* Referral Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm transition-colors outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100 sm:px-4"
                    disabled={isLoading}
                    maxLength={20}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!firstName.trim() || isLoading}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    firstName.trim() && !isLoading
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'cursor-not-allowed bg-gray-200 text-gray-400'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Getting Started...</span>
                    </div>
                  ) : (
                    'Get Started'
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-gray-700 underline hover:text-gray-900">
                  Terms of Service
                </a>{' '}
                &{' '}
                <a href="/privacy" className="text-gray-700 underline hover:text-gray-900">
                  Privacy Policy
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
