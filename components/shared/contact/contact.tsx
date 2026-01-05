import Container from '@/components/shared/ui/container';

import { ContactForm } from './contact-form';
import { Mail, Phone, Clock } from '@/components/shared/svg/svg-icon';

const Contact = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Contact Us</h1>
        </Container>
      </section>

      {/* Contact Content Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-7 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-8 lg:col-span-4">
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-gray-900">Office:</h2>
                <p className="text-base leading-relaxed text-gray-600">New Delhi, India</p>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Talk to Us Directly</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="text-primary w-4 shrink-0" />
                    <div>
                      <span className="text-base font-semibold text-gray-900">Phone:</span>{' '}
                      <a href="tel:+918800033044" className="hover:text-primary text-base text-gray-900">
                        +91 8800033044
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-primary w-4 shrink-0" />
                    <span className="text-base text-gray-600">(Available: Mon–Sat | 06:30 AM – 10:00 PM)</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">Drop Us an Email</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="text-primary w-4 shrink-0" />
                    <div className="">
                      <span className="text-base font-semibold text-gray-900">For Support:</span>{' '}
                      <a href="mailto:care@bhartiyam.in" className="hover:text-primary text-base text-gray-900">
                        care@bhartiyam.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm email={process.env.NEXT_PUBLIC_CARE_EMAIL ?? 'care@bhartiyam.in'} />
            </div>
          </div>
        </Container>
      </section>

      {/* Google Maps */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1751.7766185628323!2d77.3129415801046!3d28.583175466104805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sKamna%20Techno%20Pvt.%20Ltd.%201nd%20Floor%2C%20B%20121%20Block-B%20Sector%202%2C%20Noida%20Uttar%20Pradesh%20%E2%80%93%20201301%2C%20India!5e0!3m2!1sen!2sin!4v1753679592081!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title="Bhartiyam Office Location"
        />
      </section>
    </>
  );
};

export default Contact;
