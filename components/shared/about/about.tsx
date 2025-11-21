import AboutContent from './about-content';
import { ContactForm } from '../contact/contact-form';
import { Mail, Phone } from '@/components/shared/svg/svg-icon';
const About = () => {
  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto mt-20 max-w-7xl px-5 pt-10 pb-10 sm:mt-25 sm:px-10 md:mt-25 lg:mt-25 xl:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">About Bhartiyam</h1>
        </div>
      </section>
      <AboutContent />

      <section
        id="contact"
        className="w-full bg-[url('/images/contactus/contact_bg.webp')] bg-cover bg-fixed bg-center px-5 sm:px-10"
      >
        <div className="mx-auto mt-10 max-w-7xl pt-10 pb-20">
          <header className="mb-8 text-center"></header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Contact Info */}

            <div className="rounded-lg border border-gray-200 bg-white p-1 lg:p-6">
              <p className="rounded-md bg-white p-2 text-base text-black md:text-lg">
                <span className="text-2xl font-semibold">Address</span>
                <br />
                New Delhi, India
              </p>
              <div className="mt-4 space-y-2 rounded-md bg-white p-2 text-black md:mt-6 md:text-lg">
                <p className="flex">
                  <b className="flex font-semibold">
                    {' '}
                    <Phone className="mr-1.5 w-5" /> Mobile : &nbsp;
                  </b>{' '}
                  +91 8800033044
                </p>
                <p className="flex">
                  <b className="flex font-semibold">
                    <Mail className="mr-1.5 w-5" /> Email : &nbsp;
                  </b>{' '}
                  info@bhartiyam.in{' '}
                </p>
                <p className="pl-24">care@bhartiyam.in</p>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm email={process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? ''} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
