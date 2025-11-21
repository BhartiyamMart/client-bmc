import { ContactForm } from '@/components/shared/contact/contact-form';
import { Mail, Phone } from '@/components/shared/svg/svg-icon';

const HomeContact = () => {
  return (
    <section className="w-full bg-[url('/images/contactus/contact_bg.webp')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="m-auto max-w-[1539px] p-2 py-12 sm:px-10 md:px-10 md:py-16 lg:px-20">
        <header className="mb-8 text-center">
          {/* <p className="text-lg text-black">
            Partner with Kamna Techno (P) Ltd. and take your business to the next level — digitally and beyond.
          </p> */}
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-1 lg:p-6">
            <p className="rounded-md bg-white p-2 text-base text-black md:text-lg">
              <span className="text-2xl font-bold">Address</span>
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
          <ContactForm email={process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? ''} />
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
