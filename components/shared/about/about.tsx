import { Mail, Phone } from '@/components/shared/svg/svg-icon';
import { ContactForm } from '@/components/shared/contact/contact-form';

import AboutContent from '@/components/shared/about/about-content';
import HomeContact from '@/components/home/home-contact';

const About = () => {
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-5 pt-10 pb-10 sm:px-10 xl:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">About Bhartiyam</h1>
        </div>
      </section>
      <AboutContent />
      <HomeContact />
    </>
  );
};

export default About;
