"use client";
import { useState, useEffect } from 'react';
import { searchPersons } from '@/lib/api';

export default function SearchPage() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const performSearch = async () => {
    if (!searchTerm) {
      setPersons([]);
      return;
    }
    setLoading(true);
    try {
      const response = await searchPersons({ name: searchTerm });
      setPersons(response.data.data);
    } catch (error) {
      console.error("Search failed:", error);
      // In a real app, you would show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Advanced Person Search</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={performSearch} disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        {loading ? <p>Loading...</p> : (
          <ul>
            {persons.length > 0 ? (
              persons.map(person => (
                <li key={person._id} className="py-2 border-b">
                  {person.first_name} {person.last_name} - {person.title} at {person.company_name}
                </li>
              ))
            ) : <p>No results found.</p>}
          </ul>
        )}
      </div>
    </div>
  );
}