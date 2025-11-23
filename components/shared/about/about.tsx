import AboutContent from '@/components/shared/about/about-content';
import HomeContact from '@/components/home/home-contact';
import Container from '@/components/shared/ui/container';

const About = () => {
  return (
    <>
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 pt-10 pb-10 sm:px-10 xl:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">About Bhartiyam</h1>
        </Container>
      </section>
      <AboutContent />
      <HomeContact />
    </>
  );
};

export default About;
