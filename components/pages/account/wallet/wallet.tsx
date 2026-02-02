// src/components/pages/account/wallet/wallet.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, Wallet as WalletIconEmpty } from '@/components/shared/svg/lucide-icon';
import { Input } from '@/components/ui/input';
import { getWallet, reChargeWallet, verifyReChargeWallet, getWalletTransaction } from '@/apis/wallet.api';
import { useWalletStore } from '@/stores/useWallet.store';
import toast from 'react-hot-toast';
// import { env } from '@/config/env';
import { useAuthStore } from '@/stores/useAuth.store';
import { useRouter } from 'nextjs-toploader/app';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ArrowDownRight, ArrowUpRight } from '@/components/shared/svg/svg-icon';
import WalletTncModal from '@/components/modals/wallet-tnc-modal';
import { WalletEmptySkeleton, WalletLoadedSkeleton } from './wallet-skeleton';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Transaction {
  id: string;
  userId: string;
  type: string;
  source: string;
  status: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  orderId: string | null;
  referralId: string | null;
  title: string;
  description: string;
  metadata: any;
  expiresAt: string | null;
  isExpired: boolean;
  failureReason: string | null;
  completedAt: string | null;
  createdAt: string;
}

const Wallet = () => {
  const [amount, setAmount] = useState<number>(0);
  const wallet = useWalletStore();
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const userStore = useAuthStore();
  const router = useRouter();
  const quickAmounts: number[] = [2000, 2500, 3000, 3500, 4000, 4500, 5000];

  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(false);
  const limit = 10;

  const [isTncModalOpen, setIsTncModalOpen] = useState<boolean>(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<boolean>((resolve) => {
        if (typeof window.Razorpay !== 'undefined') {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = process.env.NEXT_RAZORPAY_CHECKOUT_URL || 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };

        script.onerror = () => {
          setRazorpayLoaded(false);
          toast.error('Failed to load payment gateway');
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();

    return () => {
      const script = document.querySelector(
        `script[src="${process.env.NEXT_RAZORPAY_CHECKOUT_URL || 'https://checkout.razorpay.com/v1/checkout.js'}"]`
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleQuickAmount = (quickAmount: number): void => {
    setAmount(quickAmount);
    setSelectedQuickAmount(quickAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const enteredAmount = parseInt(e.target.value) || 0;
    setAmount(enteredAmount);
    if (!quickAmounts.includes(enteredAmount)) {
      setSelectedQuickAmount(null);
    }
  };

  const fetchTransactions = async (page: number) => {
    setTransactionsLoading(true);
    try {
      const response = await getWalletTransaction({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (response.status === 200) {
        setTransactions(response.payload.transactions || []);
        const { totalPages } = response.payload.pagination;
        setTotalPages(totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    const initWallet = async () => {
      const currentUserPhone = userStore.phone;
      const storedUserPhone = wallet.userPhone;

      if (storedUserPhone && storedUserPhone !== currentUserPhone) {
        wallet.resetWallet();
      }

      // Wait for bootstrap
      await new Promise((resolve) => setTimeout(resolve, 300));

      const isChecked = wallet.isWalletChecked;
      const hasWalletFromStore = wallet.hasWallet;

      if (isChecked && hasWalletFromStore) {
        try {
          const response = await getWallet();
          if (response.status === 200 && response.payload?.wallet) {
            wallet.setBalance(response.payload.wallet.balance.toString());
            await fetchTransactions(currentPage);
          }
        } catch (error: any) {
          console.error('Wallet fetch error:', error);
          if (error?.status === 404) {
            // Server says no wallet
            wallet.setHasWallet(false);
            setIsTncModalOpen(true);
          }
        } finally {
          setInitialLoading(false);
        }
      } else if (isChecked && !hasWalletFromStore) {
        // No wallet - show modal
        setInitialLoading(false);
        setIsTncModalOpen(true);
      } else {
        // Not checked yet - wait more
        await new Promise((resolve) => setTimeout(resolve, 500));
        setInitialLoading(false);

        if (!wallet.isWalletChecked || !wallet.hasWallet) {
          setIsTncModalOpen(true);
        }
      }
    };

    initWallet();
  }, []);

  // Fetch transactions when page changes
  useEffect(() => {
    if (wallet.hasWallet && !initialLoading && wallet.isWalletChecked) {
      fetchTransactions(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRecharge = async () => {
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amount > 25000) {
      toast.error('UPI transactions cannot exceed ₹25,000');
      return;
    }

    if (!razorpayLoaded || typeof window.Razorpay === 'undefined') {
      toast.error('Payment gateway not loaded. Please refresh the page.');
      return;
    }

    setLoading(true);

    try {
      const response = await reChargeWallet({ amount });

      if (response.status === 201) {
        const { razorpay } = response.payload;

        const userEmail = userStore.autoMail || '';
        const userName = userStore.userProfile?.name || 'Customer';
        const userContact = userStore.phone || '9999999999';

        const options = {
          key: razorpay.key,
          amount: razorpay.amount,
          currency: razorpay.currency || 'INR',
          name: 'Bhartiyam Wallet',
          description: 'Add money to wallet',
          order_id: razorpay.orderId,
          handler: async function (razorpayResponse: any) {
            try {
              const verifyResponse = await verifyReChargeWallet({
                razorpayOrderId: razorpayResponse.razorpay_order_id,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpaySignature: razorpayResponse.razorpay_signature,
              });

              if (verifyResponse.status === 200) {
                toast.success('Payment successful! Money added to wallet.');
                setAmount(0);
                setSelectedQuickAmount(null);

                const walletResponse = await getWallet();
                if (walletResponse.payload?.wallet) {
                  wallet.setBalance(walletResponse.payload.wallet.balance.toString());
                }

                fetchTransactions(1);
                setCurrentPage(1);
              } else {
                toast.error('Payment verification failed. Please contact support.');
              }
            } catch (error) {
              console.error('Verification error:', error);
              toast.error('Payment verification failed. Please contact support.');
            }

            setLoading(false);
          },
          prefill: {
            name: userName,
            email: userEmail,
            contact: userContact,
          },
          readonly: {
            email: true,
            contact: true,
            name: true,
          },
          theme: {
            color: '#f97316',
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              toast.error('Payment cancelled');
            },
          },
        };

        const razorpayWindow = new window.Razorpay(options);

        razorpayWindow.on('payment.failed', function (response: any) {
          toast.error('Payment failed. Please try again.');
          console.error('Payment failed:', response.error);
          setLoading(false);
        });

        razorpayWindow.open();
      } else {
        toast.error('Failed to create order');
        setLoading(false);
      }
    } catch (error: unknown) {
      const apiError = error as {
        message?: string;
        payload?: { message?: string };
      };

      toast.error(apiError.payload?.message || apiError.message || 'Failed to recharge wallet');
      setLoading(false);
    }
  };

  const handleWalletCreated = async () => {
    setInitialLoading(true);
    setIsTncModalOpen(false);

    try {
      const response = await getWallet();
      if (response.status === 200 || response.status === 201) {
        wallet.setHasWallet(true);
        wallet.setWalletChecked(true);
        wallet.setUserPhone(userStore.phone || '');

        if (response.payload?.wallet?.balance !== undefined) {
          wallet.setBalance(response.payload.wallet.balance.toString());
        }

        await fetchTransactions(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Failed to fetch wallet after creation:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const getTransactionStyle = (type: string) => {
    const lowerType = type.toLowerCase();

    if (lowerType.includes('credit') || lowerType.includes('recharge') || lowerType.includes('refund')) {
      return {
        icon: <ArrowUpRight className="h-5 w-5" />,
        colorClass: 'text-green-600 bg-green-50',
        sign: '+',
      };
    }

    return {
      icon: <ArrowDownRight className="h-5 w-5" />,
      colorClass: 'text-red-600 bg-red-50',
      sign: '-',
    };
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();

    if (lowerStatus === 'success' || lowerStatus === 'completed') {
      return 'bg-green-100 text-green-700';
    }
    if (lowerStatus === 'pending' || lowerStatus === 'processing') {
      return 'bg-yellow-100 text-yellow-700';
    }
    if (lowerStatus === 'failed' || lowerStatus === 'rejected') {
      return 'bg-red-100 text-red-700';
    }

    return 'bg-gray-100 text-gray-700';
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const steps = [
    {
      number: 1,
      title: 'Create Wallet',
      desc: 'Accept terms & conditions',
    },
    {
      number: 2,
      title: 'Add Money',
      desc: 'Via UPI or cards',
    },
    {
      number: 3,
      title: 'Shop & Save',
      desc: 'Fast checkout & rewards',
    },
  ];

  if (initialLoading) {
    // Check if wallet exists in store to decide which skeleton to show
    return wallet.hasWallet ? <WalletLoadedSkeleton /> : <WalletEmptySkeleton />;
  }

  if (!wallet.hasWallet) {
    return (
      <>
        <div className="space-y-6">
          {/* Empty State - No Wallet */}
          <div className="flex min-h-100 flex-col items-center justify-center space-y-4 py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <WalletIconEmpty className="h-10 w-10 text-gray-600" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold text-gray-900">Create Your Wallet</h2>
              <p className="max-w-md text-gray-600">
                Accept terms & conditions to start using your wallet for faster checkout
              </p>
            </div>
            <Button onClick={() => setIsTncModalOpen(true)} className="gap-2">
              <WalletIconEmpty className="h-4 w-4" />
              Create My Wallet
            </Button>
          </div>

          {/* How it Works - Always Visible */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">How Wallet Works</h3>
              <p className="mt-1 text-sm text-gray-600">Simple 3-step process to start using wallet</p>
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

        {/* Wallet T&C Modal */}
        <WalletTncModal isOpen={isTncModalOpen} onClose={() => router.back()} onSuccess={handleWalletCreated} />
      </>
    );
  }

  return (
    <div className="bg-gray-50 sm:bg-white">
      <div className="">
        <div className="space-y-4 border-gray-200 bg-white">
          {/* Balance Section */}
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-xs font-medium text-gray-600 sm:text-sm">Available Balance</h2>
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">₹{wallet.balance}</p>
          </div>

          {/* Add Money Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <div className="focus-within:border-primary flex overflow-hidden rounded border border-gray-300 transition-colors">
                <span className="border-r border-gray-300 bg-gray-50 px-2.5 py-2.5 text-sm font-medium text-gray-700 sm:px-3">
                  ₹
                </span>
                <input
                  inputMode="numeric"
                  value={amount}
                  onChange={handleAmountChange}
                  maxLength={5}
                  className="h-10 w-full flex-1 px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                  placeholder="Enter amount"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickAmounts.map((quickAmount: number) => (
                  <Button
                    key={quickAmount}
                    onClick={() => handleQuickAmount(quickAmount)}
                    disabled={loading}
                    className={`shrink-0 cursor-pointer rounded border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm ${
                      selectedQuickAmount === quickAmount
                        ? 'border-primary hover:bg-primary-light bg-primary-light text-primary-dark hover:text-primary-dark border-2'
                        : 'hover:border-primary bg-white text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    ₹{quickAmount.toLocaleString('en-IN')}
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">Wallet can have maximum of ₹25,000</p>
          </div>

          <Button
            className="text-whiteenabled:cursor-pointer h-10 w-full font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!amount || loading || !razorpayLoaded}
            onClick={handleRecharge}
            isLoading={loading}
            loadingText="Processing..."
          >
            {!razorpayLoaded ? 'Loading payment gateway...' : 'Add amount'}
          </Button>

          <div className="rounded border border-yellow-200 bg-yellow-50 p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600 sm:h-5 sm:w-5" />
              <div className="min-w-0">
                <h4 className="mb-1 text-sm font-semibold text-yellow-800 sm:text-base">Important Note</h4>
                <p className="text-xs text-yellow-700 sm:text-sm">
                  Once money is added to your wallet, withdrawal is not available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">Transaction History</h2>

          {transactionsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <WalletIconEmpty className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 sm:text-base">No transactions yet</p>
              <p className="mt-1 text-xs text-gray-400">Start by adding money to your wallet</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {transactions.map((transaction) => {
                  const style = getTransactionStyle(transaction.type);

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded border border-gray-200 p-3 transition-colors hover:bg-gray-50 sm:p-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`rounded-full p-2 ${style.colorClass}`}>{style.icon}</div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 sm:text-base">
                            {transaction.title || transaction.type || 'Transaction'}
                          </p>
                          <p className="text-xs text-gray-500 sm:text-sm">{formatDate(transaction.createdAt)}</p>
                          {transaction.description && (
                            <p className="mt-1 text-xs text-gray-400">{transaction.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className={`text-sm font-semibold sm:text-base ${style.colorClass.split(' ')[0]}`}>
                          {style.sign}₹{transaction.amount.toLocaleString('en-IN')}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>

                      {generatePageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => handlePageChange(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
