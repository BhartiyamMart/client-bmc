'use client';

import React, { useEffect, useState } from 'react';
import { Wallet, Plus, AlertTriangle, Gift } from '@/components/shared/svg/lucide-icon';
import { Input } from '@/components/ui/input';
import { getWallet, reChargeWallet, verifyReChargeWallet, getWalletTransaction } from '@/apis/wallet.api';
import { useWalletStore } from '@/stores/useWallet.store';
import toast from 'react-hot-toast';
import { env } from '@/config/env';
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

// Declare Razorpay on window object
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

const WalletDetails = () => {
  const [amount, setAmount] = useState<number>(0);
  const wallet = useWalletStore();
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userStore = useAuthStore();
  const router = useRouter();
  const quickAmounts: number[] = [2000, 2500, 3000, 3500, 4000, 4500, 5000];

  // Add state to track Razorpay script loading
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  // Transaction states
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(false);
  const limit = 2; // Items per page

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<boolean>((resolve) => {
        // Check if already loaded
        if (typeof window.Razorpay !== 'undefined') {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = env.RAZORPAY_CHECKOUT_URL || 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
          setRazorpayLoaded(true);
          resolve(true);
        };

        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          setRazorpayLoaded(false);
          toast.error('Failed to load payment gateway');
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();

    // Cleanup function
    return () => {
      const script = document.querySelector(`script[src="${env.RAZORPAY_CHECKOUT_URL || 'https://checkout.razorpay.com/v1/checkout.js'}"]`);
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
    setAmount(parseInt(e.target.value));
    const enteredAmount = parseInt(e.target.value);
    if (!quickAmounts.includes(enteredAmount)) {
      setSelectedQuickAmount(null);
    }
  };

  // Fetch wallet transactions
  const fetchTransactions = async (page: number) => {
    setTransactionsLoading(true);
    try {
      const response = await getWalletTransaction({
        page: page.toString(),
        limit: limit.toString(),
      });

      console.log('Transaction response:', response);

      if (response.status === 200) {
        setTransactions(response.payload.transactions);
        
        // Use pagination object from API response
        const { totalPages } = response.payload.pagination;
        setTotalPages(totalPages);
        
        console.log('Current page:', page, 'Total pages:', totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    const handleFetchWallet = async () => {
      await getWallet();
    };

    handleFetchWallet();
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
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

    // Check if Razorpay is loaded
    if (!razorpayLoaded || typeof window.Razorpay === 'undefined') {
      toast.error('Payment gateway not loaded. Please refresh the page.');
      console.error('Razorpay not loaded. razorpayLoaded:', razorpayLoaded, 'window.Razorpay:', typeof window.Razorpay);
      return;
    }

    setLoading(true);

    try {
      const response = await reChargeWallet({ amount });
      console.log('Recharge response:', response);

      if (response.status === 201) {
        const { razorpay } = response.payload;

        const userEmail = userStore.autoMail || '';
        const userName = userStore.userProfile?.name || 'Customer';
        const userContact = userStore.phone || '9999999999';

        const options = {
          key: razorpay.key, // Use key from API response
          amount: razorpay.amount, // Already in paise
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
                fetchTransactions(1);
                setCurrentPage(1);
                router.push('wallet')
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

        console.log('Opening Razorpay with options:', options);
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

  // Helper function to get transaction icon and color
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

  // Helper function to format date
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

  // Helper function to get status badge color
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

  // Generate page numbers for pagination
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
  return (
    <div className="bg-gray-50 sm:bg-white">
      <div className="space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6">
        {/* Main Wallet Container */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:space-y-6 sm:p-6">
          {/* Balance Section */}
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-xs font-medium text-gray-600 sm:text-sm">Available Balance</h2>
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">₹{wallet.balance}</p>
          </div>

          {/* Add Money Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-sm font-medium text-gray-500 sm:text-base">
                  ₹
                </span>
                <Input
                  type="number"
                  value={amount || ''}
                  onChange={handleAmountChange}
                  className="h-10 w-full pl-7 text-base font-medium sm:h-12 sm:pl-8 sm:text-lg"
                  placeholder="Enter amount"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickAmounts.map((quickAmount: number) => (
                  <button
                    key={quickAmount}
                    onClick={() => handleQuickAmount(quickAmount)}
                    disabled={loading}
                    className={`shrink-0 cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm ${
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
            <p className="text-xs text-gray-500">UPI can have maximum of ₹25000</p>
          </div>

          <Button
            className="h-10 w-full enabled:cursor-pointer disabled:cursor-not-allowed bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 sm:h-12 sm:text-base"
            disabled={!amount || loading || !razorpayLoaded}
            onClick={handleRecharge}
          >
            {loading ? 'Processing...' : !razorpayLoaded ? 'Loading payment gateway...' : 'Add amount'}
          </Button>

          {/* Important Note */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 sm:p-4">
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

        {/* Transaction History Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">Transaction History</h2>

          {transactionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Wallet className="h-12 w-12 text-gray-300 sm:h-16 sm:w-16" />
              <p className="mt-4 text-sm text-gray-500 sm:text-base">No transactions yet</p>
            </div>
          ) : (
            <>
              {/* Transactions List */}
              <div className="space-y-3">
                {transactions.map((transaction) => {
                  const style = getTransactionStyle(transaction.type);
                  
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 sm:p-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`rounded-full p-2 ${style.colorClass}`}>
                          {style.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 sm:text-base">
                            {transaction.type || 'Transaction'}
                          </p>
                          <p className="text-xs text-gray-500 sm:text-sm">
                            {formatDate(transaction.createdAt)}
                          </p>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={
                            currentPage === 1
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
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
                          className={
                            currentPage === totalPages
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
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

export default WalletDetails;
