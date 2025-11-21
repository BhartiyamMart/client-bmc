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
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await sendTicket(name, mobile, message, email);

      if (response.status === 200) {
        toast.success("Message sent successfully! We'll get back to you within 24 hours.");
        setName('');
        setMobile('');
        setMessage('');
      }
    } catch (error) {
      console.error('Please try again after sometime', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded bg-white p-6 shadow lg:p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Submit Your Enquiry</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="focus:border-primary focus:ring-none w-full rounded border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-2 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Mobile Field */}
        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-gray-700">
            Mobile <span className="text-red-500">*</span>
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
            className="focus:border-primary focus:ring-none w-full rounded border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-2 focus:outline-none"
            placeholder="Enter your mobile number"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={message}
            maxLength={350}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="focus:border-primary focus:ring-none w-full resize-none rounded border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-2 focus:outline-none"
            placeholder="Tell us how we can help you"
          />
          <p className="mt-1.5 text-xs text-gray-500">{message.length}/350 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 focus:ring-none w-full cursor-pointer rounded px-5 py-2 text-base font-medium text-white transition-colors focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>

        <p className="text-xs text-gray-500">We typically respond within 24 hours during business days.</p>
      </form>
    </div>
  );
}
