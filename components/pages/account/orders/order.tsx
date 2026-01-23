'use client';

import React, { useState } from 'react';
import { ChevronRight, Download, X } from '@/components/shared/svg/lucide-icon';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from '@/components/shared/svg/svg-icon';

interface OrderItem {
  id: string;
  productName: string;
  quantity: string;
  unit: string;
  image: string;
  price: number;
  originalPrice?: number;
  productId: string;
  isSelected?: boolean;
}

interface Order {
  id: string;
  status: 'delivered' | 'cancelled' | 'pending' | 'processing';
  amount: number;
  date: string;
  items: OrderItem[];
  itemCount: number;
}

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Sample data - replace with your API call
  const [orders] = useState<Order[]>([
    {
      id: '410',
      status: 'delivered',
      amount: 410,
      date: '14th May 2025, 08:17 am',
      itemCount: 18,
      items: [
        {
          id: '1',
          productName: 'Amul Fresh Malai Paneer',
          quantity: '1 pack (200 g)',
          unit: '1 unit',
          image: '/temp/product/fortune_sooji.png',
          price: 91,
          originalPrice: 125,
          productId: '65872',
        },
        {
          id: '2',
          productName: 'Amul Fresh Malai Paneer',
          quantity: '1 pack (200 g)',
          unit: '1 unit',
          image: '/temp/product/fortune_sooji.png',
          price: 91,
          originalPrice: 125,
          productId: '65872',
        },
        {
          id: '3',
          productName: 'Amul Fresh Malai Paneer',
          quantity: '1 pack (200 g)',
          unit: '1 unit',
          image: '/temp/product/fortune_sooji.png',
          price: 91,
          originalPrice: 125,
          productId: '65872',
        },
        {
          id: '4',
          productName: 'Amul Fresh Malai Paneer',
          quantity: '1 pack (200 g)',
          unit: '1 unit',
          image: '/temp/product/fortune_sooji.png',
          price: 91,
          originalPrice: 125,
          productId: '65872',
        },
        {
          id: '5',
          productName: 'Amul Fresh Malai Paneer',
          quantity: '1 pack (200 g)',
          unit: '1 unit',
          image: '/temp/product/fortune_sooji.png',
          price: 91,
          originalPrice: 125,
          productId: '65872',
        },
      ],
    },
    {
      id: '411',
      status: 'cancelled',
      amount: 410,
      date: '14th May 2025, 08:17 am',
      itemCount: 5,
      items: [
        {
          id: '1',
          productName: 'Amul Fresh Milk',
          quantity: '1 pack (500 ml)',
          unit: '1 unit',
          image: '/temp/product/magik_cook_sooji.webp',
          price: 91,
          originalPrice: 125,
          productId: '65872',
        },
      ],
    },
    {
      id: '412',
      status: 'delivered',
      amount: 410,
      date: '14th May 2025, 08:17 am',
      itemCount: 5,
      items: [],
    },
  ]);

  const getStatusStyles = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          iconBg: 'bg-green-500',
          label: 'Order delivered',
        };
      case 'cancelled':
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          iconBg: 'bg-rose-400',
          label: 'Order cancelled',
        };
      case 'pending':
        return {
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          iconBg: 'bg-yellow-500',
          label: 'Order pending',
        };
      case 'processing':
        return {
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          iconBg: 'bg-blue-500',
          label: 'Order processing',
        };
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setOrderItems(order.items.map((item) => ({ ...item, isSelected: false })));
    setSelectAll(false);
    setShowDetails(true);
  };

  const handleBackToOrders = () => {
    setShowDetails(false);
    setSelectedOrder(null);
    setOrderItems([]);
    setSelectAll(false);
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setOrderItems(orderItems.map((item) => ({ ...item, isSelected: newSelectAll })));
  };

  const toggleItemSelection = (itemId: string) => {
    setOrderItems(orderItems.map((item) => (item.id === itemId ? { ...item, isSelected: !item.isSelected } : item)));
  };

  const selectedItems = orderItems.filter((item) => item.isSelected);
  const hasSelectedItems = selectedItems.length > 0;

  // Show order details view
  if (showDetails && selectedOrder) {
    const statusStyles = getStatusStyles(selectedOrder.status);

    return (
      <div className="bg-gray-50 pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={handleBackToOrders} className="rounded-lg p-1 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Order Details</h1>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`px-4 py-3 ${statusStyles.bgColor}`}>
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full ${statusStyles.iconBg}`}>
              {selectedOrder.status === 'delivered' ? (
                <Check className="h-4 w-4 text-white" />
              ) : selectedOrder.status === 'cancelled' ? (
                <X className="h-4 w-4 text-white" />
              ) : null}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${statusStyles.textColor}`}>{statusStyles.label}</p>
            </div>
            {selectedOrder.status === 'delivered' && (
              <p className={`text-xs ${statusStyles.textColor}`}>Arrived in 15 minutes</p>
            )}
          </div>
        </div>

        {/* Download Invoice */}
        <div className="px-4 py-3">
          <button className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700">
            <Download className="h-4 w-4" />
            Download Invoice
          </button>
        </div>

        {/* Products Section */}
        <div className="mx-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* Select All Header */}
          <div className="borde flex items-center justify-between border-gray-200 bg-orange-50 px-4 py-3">
            <button onClick={toggleSelectAll} className="flex items-center gap-2">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                  selectAll ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                }`}
              >
                {selectAll && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm font-medium text-gray-900">Select product(s) you want to return:</span>
            </button>
            <span className="text-sm font-medium text-gray-600">Product Id</span>
          </div>

          {/* Product Items */}
          <div className="divide-y divide-gray-200">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50">
                {/* Checkbox */}
                <button onClick={() => toggleItemSelection(item.id)} className="flex-shrink-0">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                      item.isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {item.isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                </button>

                {/* Product Image */}
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                  <img src={item.image} alt={item.productName} className="h-full w-full object-contain p-1" />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.productName}</h3>
                  <p className="text-xs text-gray-500">
                    {item.quantity} · {item.unit}
                  </p>
                </div>

                {/* Product ID */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm text-gray-600">#{item.productId}</p>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900">₹{item.price}</p>
                  {item.originalPrice && <p className="text-xs text-gray-400 line-through">₹{item.originalPrice}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="right-0 bottom-0 left-0 border-gray-200 px-4 py-4">
          <div className="flex gap-3">
            <button
              className={`border-primary text-primary flex-1 rounded-lg border-2 bg-white py-3 text-sm font-semibold transition-colors hover:bg-orange-50 ${
                !hasSelectedItems ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={!hasSelectedItems}
            >
              Replace
            </button>
            <button
              className={`bg-primary flex-1 rounded-lg py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 ${
                !hasSelectedItems ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={!hasSelectedItems}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show orders list view (default)
  return (
    <div className="">
      {/* Orders List */}
      <div className="space-y-4 p-4">
        {orders.map((order, index) => {
          const statusStyles = getStatusStyles(order.status);

          return (
            <div
              key={`${order.id}-${index}`}
              className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  <div className={`rounded-full p-1.5 ${statusStyles.bgColor}`}>
                    <div className={`h-5 w-5 rounded-full ${statusStyles.iconBg} flex items-center justify-center`}>
                      {order.status === 'delivered' ? (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : order.status === 'cancelled' ? (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : null}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div>
                    <h3 className={`text-sm font-semibold ${statusStyles.textColor}`}>{statusStyles.label}</h3>
                    <p className="text-xs text-gray-500">
                      ₹{order.amount} Placed at {order.date}
                    </p>
                  </div>
                </div>

                {/* Arrow Icon */}

                <div onClick={() => handleOrderClick(order)}>
                  <ChevronRight className="h-5 w-5 cursor-pointer text-gray-400" />
                </div>
              </div>

              {/* Product Images */}
              <div className="flex items-center gap-2 overflow-x-auto border-t border-gray-100 px-4 py-3">
                {order.items.slice(0, 10).map((item, itemIndex) => (
                  <div
                    key={`${item.id}-${itemIndex}`}
                    className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <img src={item.image} alt={item.productName} className="h-full w-full object-contain p-1" />
                  </div>
                ))}

                {order.itemCount > 10 && (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
                    <span className="text-sm font-medium text-gray-600">+{order.itemCount - 10}</span>
                  </div>
                )}
              </div>

              {/* Re-order Button */}
              <div className="absolute right-0 bottom-0 w-[10%] border-t border-gray-100">
                <button className="w-full rounded-l-none rounded-tl-lg bg-green-600 py-2.5 text-sm font-semibold text-clip text-white transition-colors hover:bg-green-700">
                  Re-order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
