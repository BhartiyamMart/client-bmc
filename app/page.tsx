import ShopPage from '@/components/pages/shop/shop-page';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

const page = () => {
  // if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
  //   redirect('/home');
  // }
  return <ShopPage />;
};

export default page;
