import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { isActiveRoute } from '@/utils/route-utils';
import { IMenuItem } from '@/interfaces/shared.interface';
import { accountMenuItems } from '@/data/account-menu';

interface SidebarMenuProps {
  pathname: string;
  onItemClick: (item: IMenuItem) => void;
}

const SidebarMenu = ({ pathname, onItemClick }: SidebarMenuProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, item: IMenuItem) => {
    e.preventDefault();
    onItemClick(item);

    if (item.name !== 'Logout') {
      router.push(item.href);
    }
  };

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-4">
      {accountMenuItems.map((item) => {
        const active = isActiveRoute(pathname, item);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            className={`group relative flex items-center gap-3 rounded px-4 py-3 font-medium transition-all duration-200 ${
              active ? 'text-primary bg-primary-light' : 'hover:bg-primary-light hover:text-primary text-gray-700'
            }`}
          >
            <div
              className={`shrink-0 transition-colors ${
                active ? 'text-primary' : 'group-hover:text-primary text-gray-600'
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
