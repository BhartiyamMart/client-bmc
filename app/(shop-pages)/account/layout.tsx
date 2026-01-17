import ProtectedRoute from '@/components/shared/protected-route';
import AccountLayout from '@/components/account-layout/account-layout';
import AccountBootstrap from '@/components/bootstrap/account.bootstrap';

import { IPageLayoutProps } from '@/interfaces/shared.interface';

export const dynamic = 'force-dynamic';

const PagesLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <main>
        <AccountLayout>
          <AccountBootstrap />
          {children}
        </AccountLayout>
      </main>
    </ProtectedRoute>
  );
};

export default PagesLayout;
