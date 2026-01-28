'use client';

import { useRouter } from 'nextjs-toploader/app';
import { Wallet } from '../shared/svg/lucide-icon';
import { ChevronRight } from '../shared/svg/svg-icon';
import { useWalletStore } from '@/stores/useWallet.store';
import { Button } from '@/components/ui/button';

const SidebarWallet = () => {
  const router = useRouter();
  const { balance, hasWallet } = useWalletStore();

  return (
    <div className="mx-2 rounded border bg-white p-3 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="text-primary h-5 w-5" />
          <div>
            <h3 className="text-lg font-semibold">Bhartiyam Wallet</h3>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="!p-0 hover:bg-transparent"
          onClick={() => router.push('/account/wallet')}
        >
          <ChevronRight className="!h-5 !w-5 text-black" />
        </Button>
      </div>
      <div className="border-primary/50 mt-1 mb-3 border border-dashed"></div>

      {hasWallet ? (
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">₹</span>
            <span className="text-xl font-bold tracking-tight text-gray-900">{balance || '0'}</span>
          </div>
          <Button size="sm" onClick={() => router.push('/account/wallet')}>
            Add Balance
          </Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Button fullWidth size="sm" onClick={() => router.push('/account/wallet')}>
            Create Wallet
          </Button>
        </div>
      )}
    </div>
  );
};

export default SidebarWallet;
