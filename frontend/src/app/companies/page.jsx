'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompaniesPage() {
  // State to store the list of companies we fetch from the backend
  const [companies, setCompanies] = useState();
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle any errors
  const [error, setError] = useState('');

  // useEffect is a special React hook that runs code after the component
  // has been rendered to the screen. We use it here to fetch our data.
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Make a GET request to our backend API endpoint for companies
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data); // Store the fetched companies in our state
      } catch (err) {
        setError('Failed to fetch companies. Please make sure the backend server is running.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false); // Set loading to false after we're done
      }
    };

    fetchCompanies();
  },); // The empty array means this effect runs only once when the component mounts

  // Conditional rendering based on the state
  if (loading) {
    return <div style={{ padding: '20px' }}>Loading companies...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Company List</h1>
      {companies.length > 0? (
        <ul>
          {/* Map over the companies array and display each company's name */}
          {companies.map((company) => (
            <li key={company._id} style={{ marginBottom: '10px' }}>
              {company.companyName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}