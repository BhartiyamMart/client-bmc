import Link from 'next/link';
import { LogoIcon } from '@/components/shared/svg/logoIcon';
import { ILogoProps } from '@/interfaces/shared.interface';

const Logo: React.FC<ILogoProps> = ({ className, ...props }) => {
  return (
    <Link className={className} {...props}>
      <LogoIcon />
    </Link>
  );
};

export default Logo;
