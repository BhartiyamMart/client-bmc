'use client';

import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useCartItemCount, useCartStore, useCartTotal } from '@/stores/useCart.store';
import { CalendarIcon, Package, ShieldCheck, Trash2, Bell, UserX, AnimalPaw, LocateFixed } from '../svg/lucide-icon';
import { Button } from '@/components/ui/button';
import { Clock } from '../svg/svg-icon';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { Router } from 'next/router';
import { useAddressStore } from '@/stores/useAddress.store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddressList from '@/components/pages/account/address/address-list';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DateSlot {
  date: string;
  day: string;
  month: string;
  dayName: string;
}

interface CartProps {
  onClose?: () => void;
}

interface DeliveryInstruction {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const Cart = ({ onClose }: CartProps) => {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartTotal();
  const itemCount = useCartItemCount();
  const defaultAddress = useAddressStore((state) => state.defaultAddress);

  const [deliveryType, setDeliveryType] = useState<'express' | 'schedule'>('express');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Group items by availability
  const unavailableItems = items.filter((item) => item.stock === 0);
  const availableItems = items.filter((item) => item.stock > 0);
  const totalSavings = 120;
  const router = useRouter();

  // Generate next 7 days
  const generateDateSlots = (): DateSlot[] => {
    const slots: DateSlot[] = [];
    const today = new Date();

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      slots.push({
        date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
        day: date.getDate().toString(),
        month: date.toLocaleString('en-US', { month: 'short' }),
        dayName: date.toLocaleString('en-US', { weekday: 'short' }),
      });
    }

    return slots;
  };

  const handleCheckout = async () => {
    onClose?.();
    router.push('/checkout');
  };

  const dateSlots = generateDateSlots();

  const timeSlots: TimeSlot[] = [
    { time: '9 AM - 12 PM', available: true },
    { time: '9 AM - 12 PM', available: true },
    { time: '9 AM - 12 PM', available: false },
    { time: '12 PM - 3 PM', available: false },
    { time: '3 PM - 6 PM', available: false },
    { time: '6 PM - 9 PM', available: true },
  ];

  const [selectedInstructions, setSelectedInstructions] = useState<string[]>([]);

  const instructions: DeliveryInstruction[] = [
    {
      id: 'animals',
      icon: <AnimalPaw className="h-5 w-5" />,
      title: 'Animals',
      description: 'Delivery partner will be informed about the presence of pets',
      bgColor: 'bg-muted',
      iconColor: 'text-orange-600',
    },
    {
      id: 'do-not-ring',
      icon: <Bell className="h-5 w-5" />,
      title: 'Do Not Ring',
      description: 'Delivery partner will not ring the doorbell or call',
      bgColor: 'bg-muted',
      iconColor: 'text-orange-600',
    },
    {
      id: 'no-contact',
      icon: <UserX className="h-5 w-5" />,
      title: 'No Contact',
      description: 'Delivery partner will not attempt a face-to-face handoff of order',
      bgColor: 'bg-muted',
      iconColor: 'text-gray-600',
    },
  ];

  const toggleInstruction = (id: string) => {
    setSelectedInstructions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <>
      <SheetHeader className="mx-0 px-0">
        <SheetTitle className="ml-1 text-2xl font-bold">My Cart</SheetTitle>
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2">
          <LocateFixed className="h-10 w-10" />
          <div>
            <p className="line-clamp-1">
              {defaultAddress?.addressLineOne} {defaultAddress?.addressLineTwo} {defaultAddress?.mapAddress}
            </p>
          </div>
          <Button className="bg-white text-blue-500 hover:cursor-pointer hover:bg-white">
            <Dialog>
              <DialogTrigger className="cursor-pointer">Change</DialogTrigger>
              <DialogContent>
                <DialogHeader>Choose your address</DialogHeader>
                <DialogDescription>
                  <AddressList />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </Button>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" className="w-full" defaultValue={['available-items', 'delivery-schedule']}>
          {/* Unavailable Items Accordion */}
          {unavailableItems.length > 0 && (
            <AccordionItem value="unavailable-items" className="rounded-lg border-b-0 bg-red-50">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-900">Current unavailable</span>
                  <span className="ml-2 rounded-full bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-800">
                    {unavailableItems.length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 px-2 pt-2">
                {unavailableItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex items-center gap-3 rounded-lg p-3 opacity-70"
                  >
                    <div className="relative h-16 w-16 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="rounded-lg object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.weight}</p>
                    </div>
                    <Button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer text-rose-400 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Available Items Accordion */}
          <AccordionItem
            value="available-items"
            className={`${unavailableItems.length > 0 ? 'mt-5' : 'mt-0'} rounded-lg border-b-0 bg-white`}
          >
            <AccordionTrigger className="rounded-none px-4 py-3 hover:no-underline">
              <div className="flex w-full items-center justify-between pr-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-900">Available Items</span>
                  <span className="ml-2 rounded-full bg-green-200 px-2 py-0.5 text-xs font-semibold text-green-800">
                    {availableItems.length}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-700">Total Saving ₹{totalSavings}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 border-t">
              {availableItems.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <p className="text-sm">Add items to get started</p>
                </div>
              ) : (
                availableItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex items-center gap-3 rounded-lg bg-white p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.weight}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">₹{item.price}</span>
                      </div>
                    </div>

                    <div className="bg-primary flex items-center gap-2 rounded-lg px-1">
                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="px-3 py-1.5 text-xl font-bold text-white hover:bg-orange-600"
                      >
                        −
                      </button>
                      <span className="min-w-[20px] text-center font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() =>
                          addToCart(item.productId, item.variantId, {
                            price: item.price,
                            name: item.name,
                            weight: item.weight,
                            image: item.image,
                            stock: item.stock,
                          })
                        }
                        className="px-3 py-1.5 text-xl font-bold text-white hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Delivery Select */}
          <div className="mt-5 rounded-lg border-b-0 bg-white">
            <div className="rounded-none px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="font-semibold">Delivery Schedule</span>
              </div>
            </div>
            <div className="space-y-4 border-t px-4 py-4">
              <RadioGroup
                value={deliveryType}
                onValueChange={(value: any) => setDeliveryType(value as 'express' | 'schedule')}
              >
                {/* Express Pickup Option */}
                <div
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all',
                    deliveryType === 'express' ? 'border-primary bg-orange-50' : 'border-gray-200 bg-white'
                  )}
                  onClick={() => setDeliveryType('express')}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div>
                      <Label htmlFor="express" className="cursor-pointer text-base font-semibold">
                        Express pickup
                      </Label>
                      <p className="text-sm text-gray-600">in 15-20 minutes</p>
                    </div>
                  </div>
                  <RadioGroupItem value="express" id="express" className="h-5 w-5" />
                </div>

                {/* Schedule Later Option */}
                <div
                  className={cn(
                    'cursor-pointer rounded-lg border-2 transition-all',
                    deliveryType === 'schedule' ? 'border-primary bg-orange-50' : 'border-gray-200 bg-white'
                  )}
                >
                  <div className="flex items-center justify-between p-4" onClick={() => setDeliveryType('schedule')}>
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-gray-600" />
                      <div>
                        <Label htmlFor="schedule" className="cursor-pointer text-base font-semibold">
                          Schedule later
                        </Label>
                        <p className="text-sm text-gray-600">Select the earliest available time slot</p>
                      </div>
                    </div>
                    <RadioGroupItem value="schedule" id="schedule" className="h-5 w-5" />
                  </div>

                  {/* Date and Time Slot Selection */}
                  {deliveryType === 'schedule' && (
                    <div className="space-y-4 border-t p-4">
                      {/* Date Selection */}
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {dateSlots.map((slot) => (
                          <button
                            key={slot.date}
                            onClick={() => setSelectedDate(slot.date)}
                            className={cn(
                              'flex min-w-[60px] flex-col items-center rounded-lg border-2 p-2 transition-all',
                              selectedDate === slot.date
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-200 bg-white hover:border-orange-300'
                            )}
                          >
                            <span className="text-xs">{slot.dayName}</span>
                            <span className="text-lg font-bold">{slot.day}</span>
                            <span className="text-xs">{slot.month}</span>
                          </button>
                        ))}
                      </div>

                      {/* Time Slots */}
                      {selectedDate && (
                        <div>
                          <h4 className="mb-3 font-semibold">Available time slots</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot, index) => (
                              <button
                                key={index}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                disabled={!slot.available}
                                className={cn(
                                  'rounded-lg border-2 p-3 text-sm font-semibold transition-all',
                                  slot.available
                                    ? selectedTime === slot.time
                                      ? 'border-primary bg-primary text-white'
                                      : 'border-gray-200 bg-white hover:border-orange-300'
                                    : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                                )}
                              >
                                <div>{slot.time}</div>
                                {!slot.available && <div className="mt-1 text-xs">Not available</div>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Membership */}
          <div className="relative mt-5 overflow-hidden rounded-lg border bg-white p-4 shadow-sm">
            {/* Ribbon */}
            <div className="absolute top-0 right-0">
              <div className="relative">
                <svg width="167" height="25" viewBox="0 0 167 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0H166.735V25H0L8.38919 12.5L0 0Z" fill="url(#paint0_linear_2994_7864)" />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2994_7864"
                      x1="0"
                      y1="12.5"
                      x2="166.735"
                      y2="12.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#B96108" />
                      <stop offset="0.461538" stopColor="#024959" />
                      <stop offset="1" stopColor="#7C066C" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Text overlay */}
                <div className="absolute inset-0 flex items-center justify-center pr-2">
                  <span className="text-sm font-semibold text-white">New Memberships</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 pt-4">
              {/* Join Badge */}
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">Join</span>
                <span className="rounded bg-orange-600 px-2 py-0.5 text-xs font-bold text-white">💎</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700">
                Enjoy unlimited FREE delivery on Grocery, Bhartiyam & much more benefits.
              </p>

              {/* Pricing and CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">Join 3 Months</span>
                    <span className="text-2xl font-bold text-orange-600">₹89</span>
                  </div>
                  <button className="mt-1 text-xs text-gray-600 hover:text-orange-600 hover:underline">
                    View all benefits →
                  </button>
                </div>

                <Button className="bg-primary h-10 px-6 font-semibold hover:bg-orange-600">ADD MEMBERSHIP</Button>
              </div>
            </div>
          </div>

          {/* Bill details */}
          <div className="mt-5 rounded-lg bg-white px-4 py-4 text-sm text-gray-700">
            {/* Title */}
            <div className="mb-3 font-semibold text-gray-900">Bill details</div>

            {/* Item total */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span>Item Total</span>
                <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                  Saved ₹320
                </span>
              </div>
              <span className="font-medium">₹{total}</span>
            </div>

            {/* Delivery charge */}
            <div className="flex items-center justify-between py-1">
              <span>Delivery charge</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">₹25</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>

            {/* Handling charge */}
            <div className="flex items-center justify-between py-1">
              <span className="underline decoration-dotted underline-offset-2">Handling charge</span>
              <span>₹5</span>
            </div>

            {/* Delivery Partner Fee */}
            <div className="flex items-center justify-between py-1">
              <span>Delivery Partner Fee</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">₹25</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>

            {/* GST */}
            <div className="flex items-center justify-between py-1">
              <span>GST & Charges</span>
              <span>₹25</span>
            </div>

            {/* Divider */}
            <div className="my-3 border-t border-dashed"></div>

            {/* To Pay */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">To Pay</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">₹{total}</span>
                <span className="text-base font-bold text-gray-900">₹{total + 25 + 5}</span>
              </div>
            </div>
          </div>

          {/* GSTIN Accordion */}
          <AccordionItem value="gst" className="mt-10 rounded-lg bg-white px-4">
            <AccordionTrigger>
              <div className="w-full">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  <span className="font-semibold">Add GSTIN</span>
                </div>
                <p className="text-sm text-gray-600">Claim GST credit of 5% on this products</p>
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>

          {/* Delivery instructions */}
          <AccordionItem value="delivery-instructions" className="mt-5 rounded-lg border-b-0 bg-white">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <h3 className="font-semibold">Delivery Instructions</h3>
                  <p className="text-xs text-gray-600">Delivery Partner Notified</p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {instructions.map((instruction) => {
                  const isSelected = selectedInstructions.includes(instruction.id);

                  return (
                    <button
                      key={instruction.id}
                      onClick={() => toggleInstruction(instruction.id)}
                      className={cn(
                        'flex flex-col items-center gap-3 rounded-lg border-2 p-3 text-left transition-all hover:cursor-pointer',
                        isSelected ? 'bg-primary text-white shadow-sm' : ''
                        // instruction.bgColor
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                          isSelected ? 'bg-primary text-white' : `${instruction.bgColor} ${instruction.iconColor}`
                        )}
                      >
                        {instruction.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{instruction.title}</h4>
                        <p className="mt-1 text-xs">{instruction.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Cancellation policy note */}
          <div className="mt-5 space-y-2 rounded-lg bg-white px-4 py-2">
            <div className="text-[14px]">
              <h1 className="">
                {' '}
                <span className="text-[16px] text-red-500">Note :</span> Once an order is placed, any cancellation may
                result in a fee. In case of high delays, an order may be cancelled with a complete refund.{' '}
              </h1>
            </div>
            <div>
              <Link href={''} className="text-[14px] text-blue-500">
                Read cancellation policy
              </Link>
            </div>
          </div>
        </Accordion>
      </div>
      {/* Checkout Section - Fixed at Bottom */}
      {availableItems.length > 0 && (
        <div className="space-y-3 rounded-lg border-t bg-white px-4 py-4">
          <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
            <div className="flex items-center gap-2 text-green-600">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold">
                {deliveryType === 'express' ? 'Free delivery in 15 minutes' : `Scheduled: ${selectedDate}`}
              </span>
            </div>
            <span className="text-xs text-gray-600">Shipment of {itemCount} items</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="text-xl font-bold">₹{total + 25 + 5}</span>
          </div>

          <Button
            onClick={handleCheckout}
            className="bg-primary hover:bg-primary/90 h-12 w-full text-base font-semibold hover:cursor-pointer"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </>
  );
};

export default Cart;
