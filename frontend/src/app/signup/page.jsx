// File: src/app/signup/page.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/lib/api'; // Import our API function

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerUser({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        company_name: formData.companyName
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600">Registration Successful!</h1>
        <p className="mt-2">You can now log in with your new account.</p>
        <Link href="/login" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input name="fullName" type="text" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
          </div>
           <div>
            <label htmlFor="companyName">Company Name</label>
            <input name="companyName" type="text" onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md"/>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}