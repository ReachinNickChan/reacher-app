'use client';

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// Options for the 'seniority' filter, based on your data
const seniorityOptions = [
    'C-Level', 'Owner', 'Partner', 'Head', 'Director',
    'Manager', 'Senior', 'Experienced', 'Entry'
];

export default function AdvancedSearchPeoplePage() {
    const [filters, setFilters] = useState({
        fullName: '',
        title: '',
        companyName: '',
        primaryIndustry: '',
        seniority: [], // Initialize as an empty array for checkboxes
    });

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Get user and token from our AuthContext
    const { token, user } = useAuth();

    // Handler for text input changes
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Handler for checkbox changes
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const newSeniorities = checked
            ? [...filters.seniority, value]
            : filters.seniority.filter((s) => s !== value);
        
        setFilters({ ...filters, seniority: newSeniorities });
    };

    // Handler for the search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResults([]);

        if (!token) {
            setError('You must be logged in to perform a search.');
            setLoading(false);
            return;
        }

        // Dynamically build query parameters from the filters state
        const queryParams = new URLSearchParams();
        if (filters.fullName) queryParams.append('fullName', filters.fullName);
        if (filters.title) queryParams.append('title', filters.title);
        if (filters.companyName) queryParams.append('companyName', filters.companyName);
        if (filters.primaryIndustry) queryParams.append('primaryIndustry', filters.primaryIndustry);
        filters.seniority.forEach(s => queryParams.append('seniority', s));

        try {
            // Set up the Authorization header with the JWT token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Make the authenticated GET request to the people API
            const response = await axios.get(`http://localhost:5000/api/people?${queryParams.toString()}`, config);
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch search results. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Advanced People Search</h1>
            {!user && <p style={{color: 'red'}}>Please log in to use the search functionality.</p>}

            <form onSubmit={handleSearch} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {/* Text Inputs */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                        <input type="text" name="fullName" value={filters.fullName} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
                        <input type="text" name="title" value={filters.title} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Company Name</label>
                        <input type="text" name="companyName" value={filters.companyName} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                     <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Industry</label>
                        <input type="text" name="primaryIndustry" value={filters.primaryIndustry} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>

                    {/* Checkbox Section for Seniority */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Seniority</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                            {seniorityOptions.map((level) => (
                                <label key={level}>
                                    <input
                                        type="checkbox"
                                        value={level}
                                        checked={filters.seniority.includes(level)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {level}
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
                        <th style={{ padding: '8px', textAlign: 'left' }}>Full Name</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Title</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Company</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Seniority</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map((person) => (
                            <tr key={person._id} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '8px' }}>{person.fullName}</td>
                                <td style={{ padding: '8px' }}>{person.title}</td>
                                <td style={{ padding: '8px' }}>{person.companyName}</td>
                                <td style={{ padding: '8px' }}>{person.seniority}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>
                                {!loading && 'No results found. Please use the filters above to search for people.'}
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
