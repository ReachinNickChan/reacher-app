// File: src/app/advanced-search-companies/page.jsx
"use client"; // This is critical - it makes the page a Client Component

import { useState, useEffect } from 'react';
import { searchCompanies } from '@/lib/api'; // Use our new, centralized API client

export default function AdvancedSearchCompaniesPage() {
  const [filters, setFilters] = useState({ companyName: '', industry: '', companyCountry: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ADAPTED: Check for login status on page load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
        // If not logged in, redirect to login page
        window.location.href = '/login';
    }
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
        // ADAPTED: Use our pre-configured searchCompanies function
        const response = await searchCompanies({
            name: filters.companyName,
            industry: filters.industry,
            location: filters.companyCountry
        });
        setResults(response.data.data);
    } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search error:', err);
    } finally {
        setLoading(false);
    }
  };

  // Don't render the page until we've confirmed the user is logged in
  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Advanced Company Search</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" name="companyName" id="companyName" value={filters.companyName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
              <input type="text" name="industry" id="industry" value={filters.industry} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="companyCountry" className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" name="companyCountry" id="companyCountry" value={filters.companyCountry} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {error && <p className="text-red-500">{error}</p>}
          <ul>
            {results.length > 0 ? (
              results.map((company) => (
                <li key={company._id} className="py-2 border-b">
                  <p className="font-semibold">{company.company_name}</p>
                  <p className="text-sm text-gray-600">{company.industry} - {company.city}, {company.country}</p>
                </li>
              ))
            ) : <p className="text-gray-500">No results found. Please enter search criteria and click Search.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}