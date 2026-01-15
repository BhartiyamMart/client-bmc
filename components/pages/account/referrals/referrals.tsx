'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Users, Share2, Gift, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { generateReferral, getReferralCode } from '@/apis/referrals.api';

const ReferralPage = () => {
  const [referralCode, setReferralCode] = useState('');
  const [hasReferralCode, setHasReferralCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [referredCount, setReferredCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch existing referral code on mount
  useEffect(() => {
    fetchReferralCode();
  }, []);

  const fetchReferralCode = async () => {
    setIsFetching(true);
    try {
      const res = await getReferralCode();

      if (res.status === 200) {
        const { hasReferralCode: hasCode, code, totalReferrals } = res.payload;
        setHasReferralCode(hasCode);
        if (hasCode) {
          setReferralCode(code);
        }
        setReferredCount(totalReferrals || 0);
      } else {
        toast.error(res.message || 'Failed to fetch referral code');
      }
    } catch (error) {
      console.error('Fetch referral code error:', error);
      toast.error('Failed to fetch referral code');
    } finally {
      setIsFetching(false);
    }
  };

  const generateReferralCode = async () => {
    setIsLoading(true);
    try {
      const res = await generateReferral();

      if (res.status === 200) {
        setReferralCode(res.payload.referralCode);
        setHasReferralCode(true);
        toast.success('Referral code generated! 🎉');
      } else {
        toast.error(res.message || 'Failed to generate code');
      }
    } catch (error) {
      console.error('Generate referral code error:', error);
      toast.error('Failed to generate code');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!referralCode) return;
    await navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    toast.success('Code copied!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareCode = () => {
    if (!referralCode) return;
    const shareText = `Join me with my referral code: ${referralCode}! 🎁`;
    if (navigator.share) {
      navigator.share({ title: 'My Referral Code', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Share text copied!');
    }
  };

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-linear-to-br px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-text-secondary text-lg">Loading referral information...</p>
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
            <CardContent className="">
              <AnimatePresence mode="wait">
                {!hasReferralCode ? (
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
                      disabled={isLoading}
                      className="group from-primary hover:from-primary-dark border-primary/50 text-primary-foreground relative transform border-2 bg-linear-to-r via-orange-500 to-orange-600 px-6 py-6 text-xl font-bold shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:via-orange-600 hover:to-orange-700 hover:shadow-orange-500/50"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-3 h-6 w-6 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Gift className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 md:h-6 md:w-6" />
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
                      className="from-primary text-primary-foreground inline-flex items-center gap-4 rounded-3xl border-4 border-white/30 bg-linear-to-r to-orange-500 px-10 py-8 font-mono text-3xl font-black tracking-widest shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 md:text-4xl"
                    >
                      {referralCode}
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        onClick={copyToClipboard}
                        size="lg"
                        className={`border-primary/50 transform gap-3 border-2 px-8 py-7 text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-orange-400/50 ${
                          isCopied
                            ? 'border-emerald-400 bg-emerald-500 text-white shadow-emerald-500/25 hover:bg-emerald-600'
                            : 'bg-primary-light hover:bg-primary-accent text-primary border-primary/30'
                        }`}
                      >
                        <Copy className="h-5 w-5" />
                        {isCopied ? 'Copied!' : 'Copy Code'}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={shareCode}
                        className="border-primary/50 hover:bg-primary-light/50 transform gap-3 border-2 px-8 py-7 text-lg font-bold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-orange-400/50"
                      >
                        <Share2 className="h-5 w-5" />
                        Share Now
                      </Button>
                    </div>
                    <div className="text-text-secondary border-primary/20 rounded-2xl border bg-white/80 px-8 py-4 font-mono text-sm font-semibold shadow-md">
                      yourstore.com/?ref=<span className="text-primary font-black">{referralCode}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-default"
          >
            <Card className="from-primary-light to-primary-accent/50 hover:from-primary-accent border-primary/20 group-hover:border-primary/40 h-full border-0 bg-linear-to-br shadow-xl transition-all duration-500 hover:to-orange-200/70 hover:shadow-2xl hover:shadow-orange-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary-dark flex items-center gap-3 text-4xl font-black transition-all duration-300 group-hover:scale-105 md:text-5xl">
                  {referredCount}+
                  <Users className="text-primary h-14 w-14" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-dark mb-1 text-2xl font-bold">Friends Referred</p>
                <p className="text-text-secondary text-lg">Total successful referrals</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="to-primary-light/70 hover:to-primary-accent/80 border-primary/20 group-hover:border-primary/40 h-full border-0 bg-linear-to-br from-orange-50 shadow-xl transition-all duration-500 hover:from-orange-100 hover:shadow-2xl hover:shadow-orange-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="from-primary bg-linear-to-r via-orange-500 to-orange-600 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                  +₹{(referredCount * 50).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-dark mb-1 text-2xl font-bold">Total Earned</p>
                <p className="text-text-secondary text-lg">₹50 per successful referral</p>
              </CardContent>
            </Card>
          </motion.div>
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
