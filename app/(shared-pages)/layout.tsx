import Footer from '@/components/shared/footer/footer';
import HomeNavbar from '@/components/shared/navbar/home-navbar';

interface RoutesLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<RoutesLayoutProps> = ({ children }) => {
  return (
    <main>
      <HomeNavbar />
      <div>{children}</div>
      <Footer />
      {/* <ScrollToTop /> */}
    </main>
  );
};

export default CommonLayout;
