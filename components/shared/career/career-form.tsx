'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const CareerForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Add your API call here
      // const response = await submitCareerForm(formData);

      toast.success('Application submitted successfully!');
      setFormData({ name: '', email: '', mobile: '', role: '' });
    } catch (error) {
      console.error('Submission failed', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded border bg-white p-6 lg:p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Apply Now</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            className="focus:border-primary focus:ring-primary/20 w-full rounded border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email <span className="text-rose-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="focus:border-primary focus:ring-primary/20 w-full rounded border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Mobile Field */}
        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-gray-700">
            Mobile No. <span className="text-rose-400">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            value={formData.mobile}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]{10}"
            className="focus:border-primary focus:ring-primary/20 w-full rounded border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:outline-none"
            placeholder="Enter 10-digit mobile number"
          />
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-700">
            Position <span className="text-rose-400">*</span>
          </label>
          <select
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="focus:border-primary focus:ring-none w-full rounded border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:outline-none"
          >
            <option value="">Select a position</option>
            <option value="product-designer">Product Designer</option>
            <option value="customer-success">Customer Success Manager</option>
            <option value="delivery-partner">Delivery Partner</option>
            <option value="store-staff">Store Staff</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 focus:ring-none w-full cursor-pointer rounded px-6 py-3 text-base font-semibold text-white transition-colors focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
              Submitting...
            </span>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  );
};

export default CareerForm;
