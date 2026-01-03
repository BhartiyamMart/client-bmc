import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isActiveRoute } from '@/utils/route-utils';
import { MenuItem, accountMenuItems } from '@/data/account-menu';

interface SidebarMenuProps {
  pathname: string;
  onItemClick: (item: MenuItem) => void;
}

const SidebarMenu = ({ pathname, onItemClick }: SidebarMenuProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, item: MenuItem) => {
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

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              active ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div
              className={`h-5 w-5 shrink-0 transition-colors ${
                active ? 'text-orange-600' : 'text-gray-600 group-hover:text-gray-900'
              }`}
            >
              {item.icon}
            </div>
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
