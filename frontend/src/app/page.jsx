// File: src/app/page.jsx
"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Business Intelligence &</span>
        <span className="block text-blue-600">Contact Management</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Discover, connect with, and manage professional contacts and company information seamlessly.
      </p>
      <div className="mt-8 max-w-xl mx-auto">
        <div className="sm:flex">
          <input
            type="text"
            className="w-full px-5 py-3 border border-gray-300 shadow-sm rounded-md placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by name, company, or title..."
          />
          <Link href="/login" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}