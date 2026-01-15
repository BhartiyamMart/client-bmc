import AccountLayout from '@/components/account-layout/account-layout';
import ProtectedRoute from '@/components/shared/protected-route';

import { IPageLayoutProps } from '@/interfaces/shared.interface';
import AccountDetails from '../../../components/bootstrap/account.bootstrap';

export const dynamic = 'force-dynamic';

const PagesLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <main>
        <AccountLayout>
          <AccountDetails />
          {children}
        </AccountLayout>
      </main>
    </ProtectedRoute>
  );
};

export default PagesLayout;
