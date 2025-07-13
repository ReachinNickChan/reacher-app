// File: src/app/search/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { searchPersons, searchCompanies } from '@/lib/api';

export default function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('persons');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check for login status on page load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      window.location.href = '/login'; // Redirect if not logged in
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setResults([]);
    try {
      let response;
      if (searchType === 'persons') {
        response = await searchPersons({ name: searchTerm });
      } else {
        response = await searchCompanies({ name: searchTerm });
      }
      setResults(response.data.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search the Database</h1>
      
      {/* Search Type Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setSearchType('persons')}
          className={`py-2 px-4 text-sm font-medium ${searchType === 'persons' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Search Persons
        </button>
        <button
          onClick={() => setSearchType('companies')}
          className={`py-2 px-4 text-sm font-medium ${searchType === 'companies' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Search Companies
        </button>
      </div>

      {/* Search Input and Button */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder={`Search for ${searchType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSearch} disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {/* Results */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        {loading ? <p>Loading...</p> : (
          <ul className="space-y-3">
            {results.length > 0 ? (
              results.map((item) => (
                <li key={item._id} className="p-2 border-b">
                  {searchType === 'persons' 
                    ? `${item.first_name} ${item.last_name} | ${item.company_name}` 
                    : `${item.company_name} | ${item.industry}`}
                </li>
              ))
            ) : <p>No results found.</p>}
          </ul>
        )}
      </div>
    </div>
  );
}