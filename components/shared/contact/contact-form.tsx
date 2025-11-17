'use client';

import { sendTicket } from '@/apis/email.api';
import type React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ContactFormProps {
  email: string;
}

export function ContactForm({ email }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('email: ', email);
      const response = await sendTicket(name, mobile, message, email);

      if (response.status === 200) {
        toast.success('Message Sent Successfully');
        // setSubmitted(true);

        // ✅ Clear input fields
        setName('');
        setMobile('');
        setMessage('');
      }
    } catch (error) {
      console.error('Please try again after sometime', error);
      // setSubmitted(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="rounded-lg border border-gray-200 bg-white p-8">
        <p className="text-2xl font-semibold text-gray-900">Submit Your Enquiry</p>

        <div className="mt-4 grid gap-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="Enter Name"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="mb-1 block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              required
              value={mobile}
              inputMode="numeric"
              maxLength={10}
              onChange={(e) => setMobile(e.target.value)}
              pattern="[0-9]*"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="Enter Mobile"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={message}
              maxLength={350}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="Message"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
