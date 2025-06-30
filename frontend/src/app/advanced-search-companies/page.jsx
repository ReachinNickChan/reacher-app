'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // <-- Import the useAuth hook

const companyTypeOptions = [
  'Private Independent',
  'Public Company',
  'Subsidiary',
];

export default function AdvancedSearchPage() {
  const [filters, setFilters] = useState({
    companyName: '',
    industry: '',
    companyCountry: '',
    companyType: [],
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { token, user } = useAuth(); // <-- Get the token and user from our context

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newCompanyTypes = checked
      ? [...filters.companyType, value]
      : filters.companyType.filter((type) => type !== value);
    
    setFilters({ ...filters, companyType: newCompanyTypes });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    // If there's no token, we can't make an authenticated request.
    if (!token) {
        setError('You must be logged in to perform a search.');
        setLoading(false);
        return;
    }

    const queryParams = new URLSearchParams();
    if (filters.companyName) queryParams.append('companyName', filters.companyName);
    if (filters.industry) queryParams.append('industry', filters.industry);
    if (filters.companyCountry) queryParams.append('companyCountry', filters.companyCountry);
    filters.companyType.forEach(type => queryParams.append('companyType', type));

    try {
      // --- NEW: Create a config object for the request with the auth header ---
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };

      const response = await axios.get(`http://localhost:5000/api/companies?${queryParams.toString()}`, config);
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch search results.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Advanced Company Search</h1>
      { !user && <p style={{color: 'red'}}>Please log in to use the search functionality.</p>}

      {/* Form and results table remain the same... */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
           <div>
             <label style={{ display: 'block', marginBottom: '5px' }}>Company Name</label>
             <input type="text" name="companyName" value={filters.companyName} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
           </div>
           <div>
             <label style={{ display: 'block', marginBottom: '5px' }}>Industry</label>
             <input type="text" name="industry" value={filters.industry} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
           </div>
           <div>
             <label style={{ display: 'block', marginBottom: '5px' }}>Country</label>
             <input type="text" name="companyCountry" value={filters.companyCountry} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
           </div>
           <div style={{ gridColumn: '1 / -1' }}>
             <label style={{ display: 'block', marginBottom: '5px' }}>Company Type</label>
             <div style={{ display: 'flex', gap: '15px' }}>
               {companyTypeOptions.map((type) => (
                 <label key={type}>
                   <input
                     type="checkbox"
                     value={type}
                     checked={filters.companyType.includes(type)}
                     onChange={handleCheckboxChange}
                   />
                   {type}
                 </label>
               ))}
             </div>
           </div>
         </div>
         <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }} disabled={!user}>Search</button>
       </form>

      <h2>Results</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #000' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Company Name</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Industry</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Country</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Company Type</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((company) => (
                <tr key={company._id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '8px' }}>{company.companyName}</td>
                  <td style={{ padding: '8px' }}>{company.industry}</td>
                  <td style={{ padding: '8px' }}>{company.companyCountry}</td>
                  <td style={{ padding: '8px' }}>{company.companyType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>
                  { !loading && 'No results found. Try adjusting your search.' }
                </td>
              </tr>
            )}
            {loading && <tr><td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>Loading...</td></tr>}
            {error && !loading && <tr><td colSpan="4" style={{ padding: '8px', textAlign: 'center', color: 'red' }}>{error}</td></tr>}
          </tbody>
        </table>
    </div>
  );
}
