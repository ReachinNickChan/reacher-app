"use client";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-extrabold text-gray-900">
        Business Intelligence & Contact Management
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
        Discover, connect with, and manage professional contacts seamlessly.
      </p>
      <div className="mt-8">
        <Link href="/search" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700">
          Go to Advanced Search
        </Link>
      </div>
    </div>
  );
}