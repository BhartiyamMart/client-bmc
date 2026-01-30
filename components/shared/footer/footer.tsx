import Link from 'next/link';
import Logo from '@/components/shared/ui/logo';
import Container from '@/components/shared/ui/container';

import { PhonePay } from '../svg/phonepay';
import { MasterCard } from '../svg/masterCard';
import { Visa } from '../svg/visa';
import { BhimPay } from '../svg/bhimpay';
import { companyLinks, legalLinks, socialLinks } from '@/data/shared/footer';

const Footer = () => {
  return (
    <footer className="relative mb-14 border-t border-gray-200 bg-white px-4 py-6 sm:px-6 md:px-8 lg:mb-0">
      <Container className="mx-auto">
        <div className="flex flex-col gap-8 text-sm text-gray-700 md:gap-12 lg:flex-row lg:justify-between">
          {/* Logo + Social Section */}
          <div className="flex flex-col items-start space-y-4 lg:flex-1">
            <div className="shrink-0">
              <Logo href={'/'} />
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 text-gray-500">
              {socialLinks.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                  aria-label={label}
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 lg:flex-1 lg:justify-center">
            {/* Company Links */}
            <div className="flex-1">
              <p className="mb-3 text-sm font-semibold text-gray-800 sm:text-base">Company</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {companyLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-primary transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="flex-1">
              <p className="mb-3 text-sm font-semibold text-gray-800 sm:text-base">Legal & Partners</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {legalLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-primary transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="">
            <p className="mb-3 text-sm font-semibold text-gray-800 sm:text-base">We accept payment</p>
            <div className="flex flex-wrap items-center gap-3">
              <BhimPay />
              <PhonePay />
              <Visa />
              <MasterCard />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
