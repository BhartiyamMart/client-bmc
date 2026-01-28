import Link from 'next/link';
import { ChevronLeft } from '../shared/svg/svg-icon';

interface AccountHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack: () => void;
}

const AccountHeader = ({ title, showBackButton = true, onBack }: AccountHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
      <div className="flex w-full items-center gap-2">
        {showBackButton && (
          <button className="group flex cursor-pointer items-center gap-1" onClick={onBack} aria-label="Go back">
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
            <span className="truncate text-xl font-semibold capitalize">{title}</span>
          </button>
        )}
        {!showBackButton && <span className="truncate text-xl font-semibold capitalize">{title}</span>}
      </div>
    </header>
  );
};

export default AccountHeader;
