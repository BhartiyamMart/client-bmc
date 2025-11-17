import { ContactForm } from './contact-form';
import { Mail, Phone, Clock } from '@/components/shared/svg-icon';
const Contact = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto mt-20 max-w-7xl px-5 pt-10 pb-10 sm:mt-25 sm:px-0 md:mt-25 lg:mt-25">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-xl md:text-2xl">Contact Us</h1>
        </div>
      </section>
      <section className="relative overflow-hidden py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-0">
          <div className="grid items-start gap-12 lg:grid-cols-7">
            {/* Contact Information */}
            <div className="space-y-8 lg:col-span-4">
              <div>
                <p className="mb-0 text-2xl font-semibold text-gray-900">Office:</p>
                <p className="leading-relaxed text-gray-600">New Delhi, India</p>
              </div>

              <div>
                <p className="mb-2 text-xl font-semibold text-gray-900">Talk to Us Directly</p>
                <p className="mb-2 flex text-gray-900">
                  <strong className="flex">
                    <Phone className="mr-1.5 w-4" /> Phone: &nbsp;
                  </strong>{' '}
                  +91 8800033044
                </p>
                <span className="flex text-gray-600">
                  {' '}
                  <Clock className="mr-1.5 w-4" /> (Available: Mon–Sat | 06:30 AM –10:00 PM)
                </span>
              </div>

              <div>
                <p className="mb-2 text-xl font-semibold text-gray-900">Drop Us an Email</p>
                <div className="space-y-2">
                  <p className="flex text-black">
                    <strong className="flex">
                      {' '}
                      <Mail className="mr-1.5 w-4" /> For Support:
                    </strong>{' '}
                    &nbsp; care@bhartiyam.in
                  </p>
                  <p className="flex text-black">
                    <strong className="flex">
                      {' '}
                      <Mail className="mr-1.5 w-4" /> General Enquiry:
                    </strong>
                    &nbsp; info@bhartiyam.in
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm email={process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? ''} />
            </div>
          </div>
        </div>
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
        />
      </section>
    </>
  );
};

export default Contact;
