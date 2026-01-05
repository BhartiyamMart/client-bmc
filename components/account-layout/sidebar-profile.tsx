import Image from 'next/image';
import { CloseIcon } from '../shared/svg/svg-icon';

interface SidebarProfileProps {
  fullName: string;
  phoneNumber: string;
  profileImage: string;
  onClose: () => void;
}

const SidebarProfile = ({ fullName, phoneNumber, profileImage, onClose }: SidebarProfileProps) => {
  return (
    <div className="flex items-center gap-3 border-b bg-white p-4">
      <Image
        className="h-12 w-12 shrink-0 rounded-full bg-gray-400 object-cover"
        alt={fullName || 'User profile'}
        src={profileImage || '/images/avatar.webp'}
        width={48}
        height={48}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium text-gray-800 capitalize">{fullName || 'Guest User'}</p>
        <p className="truncate text-sm text-gray-500">{phoneNumber || 'No phone number'}</p>
      </div>
      <button
        onClick={onClose}
        className="hidden rounded-full p-2 transition-colors hover:bg-gray-100"
        aria-label="Close sidebar"
      >
        <CloseIcon className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default SidebarProfile;
