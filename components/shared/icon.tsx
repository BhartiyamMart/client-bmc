'use client';

import React, { forwardRef } from 'react';

interface IconProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  badge?: {
    text?: string;
    count?: number;
    color?: string;
    suppressHydrationWarning?: boolean;
  };
  amount?: string | number;
  as?: 'button' | 'div'; // Add this prop
}

const Icon = forwardRef<HTMLButtonElement | HTMLDivElement, IconProps>(
  (
    {
      icon: IconComponent,
      onClick,
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      ariaLabel,
      badge,
      amount,
      as = 'button', // Default to button
    },
    ref
  ) => {
    // Variant styles
    const variants = {
      primary: 'bg-[#7F3200] text-white active:bg-[#5A2300]',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
      outline: 'border-2 border-[#7F3200] text-[#7F3200] hover:bg-[#7F3200] hover:text-white active:bg-[#6B2A00]',
      ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 active:bg-gray-200',
    };

    // Size configurations
    const sizes = {
      sm: {
        container: 'h-8 w-8 min-w-[32px]',
        icon: 'h-4 w-4',
        text: 'text-xs',
        withAmount: 'px-2 gap-1',
      },
      md: {
        container: 'h-10 w-10 min-w-[40px]',
        icon: 'h-5 w-5',
        text: 'text-sm',
        withAmount: 'px-2.5 gap-1.5',
      },
      lg: {
        container: 'h-12 w-12 min-w-[48px]',
        icon: 'h-6 w-6',
        text: 'text-base',
        withAmount: 'px-3 gap-2',
      },
    };

    // Format amount with cap at 25000
    const formatAmount = (amt: string | number): string => {
      const numAmount = typeof amt === 'string' ? parseFloat(amt) : amt;
      if (isNaN(numAmount)) return '0';
      const cappedAmount = Math.min(numAmount, 25000);
      return cappedAmount.toLocaleString('en-IN');
    };

    // Determine if button should expand for amount
    const hasAmount = amount !== undefined && amount !== null;
    const containerSize = hasAmount ? `${sizes[size].withAmount}` : sizes[size].container;

    // Build class names
    const baseClasses = `
      relative rounded-full transition-all duration-200
      flex items-center justify-center
      ${containerSize}
      ${variants[variant]}
      ${className}
    `
      .trim()
      .replace(/\s+/g, ' ');

    const buttonClasses = `
      ${baseClasses}
      cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-[#7F3200] focus:ring-offset-2
    `
      .trim()
      .replace(/\s+/g, ' ');

    const iconClasses = `${sizes[size].icon} flex-shrink-0`;
    const textClasses = `${sizes[size].text} font-medium whitespace-nowrap`;

    // Badge display logic
    const badgeCount = badge?.count ?? 0;
    const badgeText = badge?.text;
    const showBadge = badgeCount > 0 || badgeText;

    const content = (
      <>
        <IconComponent className={iconClasses} aria-hidden="true" />
        {hasAmount && <span className={textClasses}>₹{formatAmount(amount)}</span>}
        {showBadge && (
          <span
            className={`absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-center text-[10px] leading-none font-semibold text-white ${badge?.color || 'bg-[#F0701E]'}`
              .trim()
              .replace(/\s+/g, ' ')}
            suppressHydrationWarning={badge?.suppressHydrationWarning}
          >
            {badgeText || badgeCount}
          </span>
        )}
      </>
    );

    if (as === 'div') {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} className={baseClasses} aria-label={ariaLabel}>
          {content}
        </div>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
