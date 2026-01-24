'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { generateReferral, getReferralCode } from '@/apis/referrals.api';
import { Copy, Gift, RefreshCw, Share2, Users } from '@/components/shared/svg/lucide-icon';
import { useRouter } from 'next/navigation';
import { ReferralData } from '@/interfaces/referral.interface';

// ✅ UI state (separate from data)
interface UIState {
  isLoading: boolean;
  isFetching: boolean;
  isCopied: boolean;
  fetchError: boolean;
}

const ReferralPage = () => {
  // ✅ Single source of truth for all referral data
  const [referralData, setReferralData] = useState<ReferralData>({
    hasReferralCode: false,
    code: '',
    totalReferrals: 0,
    recentReferrals: [],
  });

  // ✅ UI state separate from data
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

  // ✅ FIXED: Removed duplication by not spreading ...stats
  const fetchReferralCode = async () => {
    setUIState((prev) => ({ ...prev, isFetching: true, fetchError: false }));

    try {
      const res = await getReferralCode();
      console.log('getReferralCode response:', res);

      if (res.status === 200) {
        const { hasReferralCode, code, totalReferrals, recentReferrals } = res.payload;

        // ✅ Update all data in one place - NO SPREADING to avoid duplication
        setReferralData({
          hasReferralCode: hasReferralCode || false,
          code: code || '',
          totalReferrals: totalReferrals || 0,
          recentReferrals: recentReferrals || [],
        });
        console.log('referrals :', referralData);
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
        // ✅ Update referralData with new code
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

  const shareCode = () => {
    if (!referralData.code) return;

    const shareText = `Join me with my referral code: ${referralData.code}! 🎁`;

    if (navigator.share) {
      navigator
        .share({
          title: 'My Referral Code',
          text: shareText,
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.error('Share error:', err);
          }
        });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Share text copied!');
    }
  };

  // Loading state
  if (uiState.isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-12">
        <div className="text-center">
          <RefreshCw className="text-primary mx-auto mb-4 h-12 w-12 animate-spin" />
          <p className="text-text-secondary text-lg">Loading referral information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (uiState.fetchError && !referralData.hasReferralCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-12">
        <div className="text-center">
          <p className="text-text-secondary mb-4 text-lg">Unable to load referral data</p>
          <Button onClick={fetchReferralCode} className="bg-primary">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br px-4 py-12">
      <div className="mx-auto w-full space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 text-center">
          <h1 className="bg-primary bg-clip-text text-2xl font-black text-transparent drop-shadow-lg md:text-4xl">
            Invite Friends, Earn Rewards
          </h1>
          <p className="text-text-secondary mx-auto max-w-md text-xl leading-relaxed">
            Generate your unique referral code and earn ₹50 for every friend who joins!
          </p>
        </motion.div>

        {/* Generate Code Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <Card className="border-none shadow-none">
            <CardContent>
              <AnimatePresence mode="wait">
                {!referralData.hasReferralCode ? (
                  <motion.div
                    key="generate"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-center"
                  >
                    <Button
                      size="lg"
                      onClick={generateReferralCode}
                      disabled={uiState.isLoading}
                      className="group from-primary hover:from-primary-dark border-primary/50 text-primary-foreground via-primary hover:shadow-primary/50 relative transform border-2 bg-linear-to-r to-orange-600 px-6 py-6 text-xl font-bold shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:via-orange-600 hover:to-orange-700"
                    >
                      {uiState.isLoading ? (
                        <>
                          <RefreshCw className="mr-3 h-6 w-6 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Gift className="mr-2 h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
                          <span className="text-xs sm:text-lg md:text-xl">Generate My Code</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 1.05, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    className="space-y-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotateY: -180 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="from-primary text-primary-foreground to-primary hover:shadow-primary/50 inline-flex items-center gap-4 rounded-3xl border-4 border-white/30 bg-linear-to-r px-10 py-8 font-mono text-3xl font-black tracking-widest shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 md:text-4xl"
                    >
                      {referralData.code}
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        onClick={copyToClipboard}
                        size="lg"
                        className={`border-primary/50 transform gap-3 border-2 px-8 py-7 text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-orange-400/50 ${
                          uiState.isCopied
                            ? 'border-emerald-400 bg-emerald-500 text-white shadow-emerald-500/25 hover:bg-emerald-600'
                            : 'bg-primary-light hover:bg-primary-accent text-primary border-primary/30'
                        }`}
                      >
                        <Copy className="h-5 w-5" />
                        {uiState.isCopied ? 'Copied!' : 'Copy Code'}
                      </Button>
                      {/* <Button
                        variant="outline"
                        size="lg"
                        onClick={shareCode}
                        className="border-primary/50 hover:bg-primary-light/50 transform gap-3 border-2 px-8 py-7 text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-orange-400/50"
                      >
                        <Share2 className="h-5 w-5" />
                        Share Now
                      </Button> */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats - Now using referralData.stats */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-default"
          >
            <Card className="from-primary-light to-primary-accent/50 hover:from-primary-accent border-primary/20 group-hover:border-primary/40 hover:shadow-primary/20 h-full border-0 bg-linear-to-br shadow-xl transition-all duration-500 hover:to-orange-200/70 hover:shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary-dark flex items-center gap-3 text-4xl font-black transition-all duration-300 group-hover:scale-105 md:text-5xl">
                  {referralData.totalReferrals}
                  <Users className="text-primary h-14 w-14" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-dark mb-1 text-2xl font-bold">Friends Referred</p>
                <p className="text-text-secondary text-lg">Total successful referrals</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="to-primary-light/70 hover:to-primary-accent/80 border-primary/20 group-hover:border-primary/40 h-full border-0 bg-linear-to-br from-orange-50 shadow-xl transition-all duration-500 hover:from-orange-100 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="from-primary bg-linear-to-r via-primary to-orange-600 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                  +₹{referralData.stats.totalEarnings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-dark mb-1 text-2xl font-bold">Total Earned</p>
                <p className="text-text-secondary text-lg">₹50 per successful referral</p>
              </CardContent>
            </Card>
          </motion.div> */}
        </div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="to-primary-light/50 border-primary/20 border-0 bg-linear-to-br from-orange-50/80 shadow-2xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="from-primary-dark to-primary bg-linear-to-r via-orange-600 bg-clip-text text-3xl font-black text-transparent">
                How Referrals Work
              </CardTitle>
              <CardDescription className="text-text-secondary">Simple 3-step process to earn rewards</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 pt-4 md:grid-cols-3">
              {[
                {
                  icon: '🎁',
                  title: 'Generate Code',
                  desc: 'Click button to get your unique referral code instantly',
                  bg: 'from-primary-light to-orange-100',
                },
                {
                  icon: '📱',
                  title: 'Share Easily',
                  desc: 'Copy link or share via WhatsApp, SMS, social media',
                  bg: 'from-primary-accent to-orange-200',
                },
                {
                  icon: '💰',
                  title: 'Earn Rewards',
                  desc: 'Get ₹50 credited when friends complete signup',
                  bg: 'from-orange-100 to-primary-accent',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group border-primary/10 hover:border-primary/30 rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/60 hover:shadow-xl"
                >
                  <div
                    className={`mx-auto mb-6 h-20 w-20 bg-linear-to-br ${step.bg} flex items-center justify-center rounded-2xl border-4 border-white/50 shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <h3 className="text-primary-dark group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralPage;
