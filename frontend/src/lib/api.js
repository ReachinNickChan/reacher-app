// File: src/lib/api.js
import axios from 'axios';

// Get the base URL from the environment variable we set in Vercel
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    // Check if localStorage is available (it only is in the browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Authentication API ---
export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const registerUser = (userData) => api.post('/api/auth/register', userData);
export const getProfile = () => api.get('/api/auth/profile');

// --- Search API ---
export const searchPersons = (filters) => api.post('/api/persons/search', filters);
export const searchCompanies = (filters) => api.post('/api/companies/search', filters);

export default api;