'use client'; // This is a Next.js directive for client-side components

import { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
  // This 'state' will hold the data from our form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    companyWebsite: '',
    businessNumber: '',
    linkedinProfile: '',
  });

  // These states will hold success or error messages to show the user
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // This function updates the state as the user types in the form
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  // This function runs when the user clicks the "Sign Up" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setMessage('');
    setError('');

    try {
      // We use axios to send a POST request to our back-end API endpoint
      const response = await axios.post('http://localhost:5000/api/users', formData);
      
      setMessage('Registration successful! Please check your database.');
      console.log('User registered:', response.data);
      
      // Clear the form after successful registration
      setFormData({
        fullName: '', email: '', password: '', companyName: '',
        companyWebsite: '', businessNumber: '', linkedinProfile: '',
      });

    } catch (err) {
      // If the server sends back an error, we display it to the user
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  // This is the HTML structure of our form (written in JSX)
  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Sign Up for Reacher</h1>
      <p>Just a click away from hitting your target.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name*</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Business Email*</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password*</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Company Website</label>
          <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Business Number</label>
          <input type="text" name="businessNumber" value={formData.businessNumber} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>LinkedIn Profile</label>
          <input type="text" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Sign Up</button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
}