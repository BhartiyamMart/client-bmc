import Container from '@/components/shared/ui/container';

import { Mail, Phone } from '@/components/shared/svg/svg-icon';
import { ContactForm } from '@/components/shared/contact/contact-form';

const HomeContact = () => {
  return (
    <section className="w-full bg-[url('/images/contactus/contact_bg.webp')] bg-cover bg-fixed bg-center bg-no-repeat">
      <Container className="m-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <div className="rounded bg-white p-6">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Address</h2>
              <p className="text-base text-gray-700">New Delhi, India</p>
            </div>

            <div className="space-y-3 rounded bg-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Get In Touch</h3>

              <div className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Mobile</p>
                  <a href="tel:+918800033044" className="hover:text-primary/90 text-base text-gray-900">
                    +91 8800033044
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-primary mt-0.5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Email</p>
                  <div className="space-y-1">
                    <a href="mailto:info@bhartiyam.in" className="hover:text-primary/90 block text-base text-gray-900">
                      info@bhartiyam.in
                    </a>
                    <a href="mailto:care@bhartiyam.in" className="hover:text-primary/90 block text-base text-gray-900">
                      care@bhartiyam.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <ContactForm email={process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? ''} />
        </div>
      </Container>
    </section>
  );
};

export default HomeContact;
