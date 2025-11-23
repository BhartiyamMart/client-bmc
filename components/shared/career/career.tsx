import { Clock, MapPin } from '../svg/svg-icon';

import CareerForm from './career-form';
import Container from '@/components/shared/ui/container';

const CareerPage = () => {
  const jobListings = [
    {
      id: 1,
      title: 'Product Designer',
      description: "We're looking for a mid-level product designer to join our team",
      type: 'Full Time',
      location: 'Remote / New Delhi',
    },
    {
      id: 2,
      title: 'Customer Success Manager',
      description: "We're looking for a mid-level Customer Success Manager to join our team",
      type: 'Full Time',
      location: 'New Delhi',
    },
  ];

  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Careers</h1>
        </Container>
      </section>

      {/* Content Section */}
      <section className="bg-white py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Job Listings */}
            <div className="lg:col-span-8">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">We're Hiring!</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-700">
                We're looking for passionate people to join us on our mission. We value flat hierarchies, clear
                communication, and full ownership and responsibility.
              </p>

              <div className="space-y-4">
                {jobListings.map((job) => (
                  <div key={job.id} className="rounded border bg-white p-6 transition-shadow hover:shadow">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="mb-4 text-base leading-relaxed text-gray-700">{job.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-700">
                        <Clock className="w-4" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-700">
                        <MapPin className="w-4" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-primary/10 mt-8 rounded p-6">
                <h4 className="mb-2 text-lg font-semibold text-gray-900">Why Join Bhartiyam?</h4>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Competitive salary and benefits</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Work-life balance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Growth opportunities</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Dynamic team culture</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <CareerForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CareerPage;
