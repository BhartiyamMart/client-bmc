'use client'
import React from 'react';
import { ChevronRight } from '../shared/svg/svg-icon';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


interface SidebarWalletProps {
  amount: number;
}

const SidebarWallet: React.FC<SidebarWalletProps> = ({ amount }) => {
    const router = useRouter()
  return (
    <div className="mx-4 rounded border border-gray-100 bg-white p-4 shadow">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="from-primary to-primary/50 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-primary text-sm leading-tight font-semibold">Bhartiyam Cash</h3>
            <p className="text-xs font-medium text-gray-500">Available Balance</p>
          </div>
        </div>
        <Button className=' bg-transparent hover:bg-transparent' onClick={()=> router.push('wallet')}>
          <ChevronRight className="cursor-pointer text-gray-400" />
        </Button>
      </div>

      {/* Balance Display */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">₹</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">{amount || '0'}</span>
        </div>

        {/* Add Balance Button */}
        <button className="bg-primary rounded px-4 py-1 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-900 hover:shadow-md active:scale-[0.98]">
          Add
        </button>
      </div>
    </div>
  );
};

export default SidebarWallet;
