import React from 'react';

const CareerForm = () => {
  return (
    <>
      <div className="w-full border p-5">
        <h1>Career</h1>
      </div>

      <div className="w-full border p-5">
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={30}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Email Id
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={30}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Mobile No.
            </label>
            <input
              id="name"
              name="name"
              required
              maxLength={30}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-600 focus:outline-none"
              placeholder="Enter Mobile"
            />
          </div>
        </div>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Choose a role
            </label>
            <select
              id="role"
              name="role"
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Choose a role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <button className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none disabled:opacity-60">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CareerForm;
