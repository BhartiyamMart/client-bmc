'use client';

import { ChevronRight } from '../shared/svg/svg-icon';
import { Button } from '../ui/button';
import { useRouter } from 'nextjs-toploader/app';
import { useWalletStore } from '@/stores/useWallet.store';
import { Money, Wallet } from '../shared/svg/lucide-icon';

const SidebarWallet = () => {
  // ✅ Destructure the wallet data properly
  const { balance, hasWallet } = useWalletStore();
  const router = useRouter();

  return (
    <div className="mx-2 rounded border bg-white p-4 shadow-xs">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className=" flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Money className='text-white h-4 w-4' />
          </div>
          <div>
            <h3 className="text-primary text-sm leading-tight font-semibold">Bhartiyam Cash</h3>
            <p className="text-xs font-medium text-gray-500">Available Balance</p>
          </div>
        </div>
        <Button className="bg-transparent hover:bg-transparent cursor-pointer" onClick={() => router.push('/account/wallet')}>
          <ChevronRight className="cursor-pointer text-gray-400" />
        </Button>
      </div>

      {/* Balance Display */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">₹</span>
          {/* ✅ Use availableBalance or balance, not wallet.amount */}
          <span className="text-xl font-bold tracking-tight text-gray-900">{balance || '0'}</span>
        </div>

        {/* Add Balance Button */}
        {/* <button className="bg-primary rounded px-4 py-1 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-900 hover:shadow-md active:scale-[0.98]">
          Add
        </button> */}
      </div>
    </div>
  );
};

export default SidebarWallet;
