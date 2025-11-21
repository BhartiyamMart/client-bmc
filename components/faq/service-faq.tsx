'use client';
import { useState } from 'react';
import { Minus, Plus } from '../shared/svg/svg-icon';

interface FaqAboutus {
  question: string;
  answer: string;
}

const faqs: FaqAboutus[] = [
  {
    question: 'Q1. What kind of products can I buy at Bhartiyam Mart?',
    answer: 'A1. Groceries, fruits, vegetables, dairy, packaged food, beverages, household items, and more.',
  },
  {
    question: 'Q2. Do you sell fresh fruits and vegetables daily?',
    answer: 'A2. Yes! We stock farm-fresh fruits and vegetables every morning.',
  },
  {
    question: 'Q3. Do you offer organic products?',
    answer: 'A3. Yes, we have a dedicated section for organic and healthy living products.',
  },
  {
    question: 'Q4. Can I order online?',
    answer: 'A4. Yes, you can place your orders via our WhatsApp, website, or app.',
  },
];

const FaqAboutus = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-5 py-0 sm:px-10 lg:px-20">
      <h3 className="mb-8 text-3xl font-bold">FAQ&apos;s</h3>
      <div className="divide-y divide-gray-300">
        {faqs.map((faq, index) => (
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

export default FaqAboutus;
