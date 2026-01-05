import Link from 'next/link';
import { ChevronLeft } from '../shared/svg/svg-icon';

interface AccountHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack: () => void;
}

const AccountHeader = ({ title, showBackButton = true, onBack }: AccountHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-4">
      <div className="flex w-full items-center gap-2">
        {showBackButton && (
          <Link href="#">
            <button className="group flex cursor-pointer items-center gap-1" onClick={onBack} aria-label="Go back">
              <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
              <span className="truncate text-base font-semibold text-gray-700 capitalize transition-colors group-hover:text-gray-900">
                {title}
              </span>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default AccountHeader;
