'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore, useCartTotal, useCartItemCount } from '@/stores/useCart.store';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { BankNote, CreditCard, Gift, Home, Pencil, SmartPhone, Wallet, X } from '@/components/shared/svg/lucide-icon';
import { Check } from '@/components/shared/svg/svg-icon';
import Section from '@/components/shared/ui/section';
import Container from '@/components/shared/ui/container';
import { useAddressStore } from '@/stores/useAddress.store';

interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore();
  const total = useCartTotal();
  const itemCount = useCartItemCount();

  const [selectedPayment, setSelectedPayment] = useState<string>('bhartiyam-balance');
  const [walletAmount, setWalletAmount] = useState<number>(500);
  const [couponCode, setCouponCode] = useState<string>('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isEditingWallet, setIsEditingWallet] = useState(false);

  // Mock data - replace with your actual data

  const deliveryAddress = useAddressStore((state) => state.defaultAddress);

  const bhartiyamBalance = 2500.0;
  const orderTotal = total + 30; // Including charges

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bhartiyam-balance',
      title: `Bhartiyam Balance ₹${bhartiyamBalance.toFixed(2)}`,
      description: bhartiyamBalance < orderTotal ? 'Insufficient balance. Add Money' : '',
      icon: <Wallet className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'upi',
      title: 'UPI',
      description: 'Supports PhonePe, GPay, Paytm and more',
      icon: <SmartPhone className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'card',
      title: 'Card',
      description: 'Visa, Mastercard, Rupay',
      icon: <CreditCard className="h-5 w-5" />,
      enabled: true,
    },
    {
      id: 'cod',
      title: 'Cash on delivery',
      description: 'COD IS AVAILABLE',
      icon: <BankNote className="h-5 w-5" />,
      enabled: true,
    },
  ];

  const handlePayNow = async () => {
    // Implement payment logic here
    console.log('Processing payment with:', selectedPayment);
    // Navigate to order confirmation or payment gateway
  };

  const applyCoupon = () => {
    // Implement coupon application logic
    console.log('Applying coupon:', couponCode);
    setShowCouponInput(false);
  };

  const handleWalletAmountChange = (value: string) => {
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      setWalletAmount(amount);
    }
  };

  return (
    <Section>
      <Container className="w-full max-w-6xl!">
        <div className="grid grid-cols-2 gap-4">
          {/* Payment Section */}
          <div className="mb-20 rounded-lg bg-white shadow-sm">
            <div className="border-b p-4">
              <h2 className="text-xl font-bold">Select Payment method</h2>
            </div>

            <div className="p-4">
              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`rounded-lg border-2 transition-all ${
                      selectedPayment === method.id
                        ? 'border-primary bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Label htmlFor={method.id} className="flex cursor-pointer items-start justify-between p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{method.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{method.title}</p>
                            {method.id === 'bhartiyam-balance' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsEditingWallet(true);
                                }}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          {method.description && (
                            <p
                              className={`mt-1 text-sm ${
                                method.id === 'bhartiyam-balance' && bhartiyamBalance < orderTotal
                                  ? 'text-blue-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              {method.id === 'bhartiyam-balance' && bhartiyamBalance < orderTotal && (
                                <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                                  ℹ
                                </span>
                              )}
                              {method.description}
                              {method.id === 'bhartiyam-balance' && bhartiyamBalance < orderTotal && (
                                <span className="ml-1 font-semibold text-orange-600 underline">Add Money</span>
                              )}
                            </p>
                          )}

                          {/* Wallet Amount Input */}
                          {method.id === 'bhartiyam-balance' &&
                            selectedPayment === 'bhartiyam-balance' &&
                            isEditingWallet && (
                              <div className="mt-3 flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={walletAmount}
                                  onChange={(e) => handleWalletAmountChange(e.target.value)}
                                  className="h-9 max-w-[200px]"
                                  placeholder="₹ 500"
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-9 w-9 p-0 text-green-600 hover:bg-green-50"
                                  onClick={() => setIsEditingWallet(false)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-9 w-9 p-0 text-gray-600 hover:bg-gray-100"
                                  onClick={() => {
                                    setIsEditingWallet(false);
                                    setWalletAmount(500);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                        </div>
                      </div>
                      <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                    </Label>
                  </div>
                ))}

                {/* Apply Coupon */}
                <div className="rounded-lg border-2 border-gray-200 bg-white">
                  <div
                    className="flex cursor-pointer items-center justify-between p-4"
                    onClick={() => setShowCouponInput(!showCouponInput)}
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5" />
                      <span className="font-semibold">Apply coupon</span>
                    </div>
                    <svg
                      className={`h-5 w-5 transition-transform ${showCouponInput ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {showCouponInput && (
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="pr-8"
                          />
                          {couponCode && (
                            <button
                              onClick={() => setCouponCode('')}
                              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <Button
                          onClick={applyCoupon}
                          className="bg-primary hover:bg-primary/90 px-6"
                          disabled={!couponCode}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            {/* Delivery Address Section */}
            <div className="mb-4 rounded-lg bg-white p-4 opacity-80 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Delivery Address</h2>
                {/* <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  <Pencil className="h-4 w-4" />
                </Button> */}
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Home className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {deliveryAddress?.label}:{' '}
                    <span className="mt-1 line-clamp-2">
                      {deliveryAddress?.addressLineOne}
                      {''}
                      {deliveryAddress?.addressLineTwo}
                      {''}
                      {deliveryAddress?.mapAddress}
                      {''}
                    </span>
                    {deliveryAddress?.addressName}
                  </span>
                </div>
              </div>
            </div>

            {/* My Cart Section */}
            <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Cart</h2>
                <span className="text-sm text-gray-600">{itemCount} items</span>
              </div>

              <div className="space-y-3">
                {cart.items.slice(0, 2).map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.weight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {cart.items.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80 mt-3 w-full"
                  onClick={() => router.back()}
                >
                  View all items
                </Button>
              )}
            </div>
            {/* Fixed Bottom Payment Button */}
            <div className="border-t bg-white p-4 shadow-lg">
              <div className="mx-auto max-w-2xl">
                <Button
                  onClick={handlePayNow}
                  className="bg-primary hover:bg-primary/90 h-12 w-full text-base font-semibold"
                  disabled={selectedPayment === 'bhartiyam-balance' && bhartiyamBalance < orderTotal}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
