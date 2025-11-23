'use client';
import { useState } from 'react';
import { Minus, Plus } from '../shared/svg/svg-icon';
import { serviceFaqs } from '@/data/shared/landing-store';

const ServiceFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="">
      <h3 className="mb-8 text-3xl font-bold">FAQ&apos;s</h3>
      <div className="divide-y divide-gray-300">
        {serviceFaqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button className="flex w-full items-center justify-between text-left" onClick={() => toggleFAQ(index)}>
              <span className="text-lg font-medium text-black">{faq.question}</span>
              {openIndex === index ? <Minus className="h-5 w-5 text-black" /> : <Plus className="h-5 w-5 text-black" />}
            </button>
            {openIndex === index && <p className="mt-3 text-base leading-relaxed text-gray-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFaq;
