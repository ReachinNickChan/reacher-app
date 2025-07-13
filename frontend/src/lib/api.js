// File: src/lib/api.js
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = (credentials) => api.post('/api/auth/login', credentials);
export const registerUser = (userData) => api.post('/api/auth/register', userData); // <-- THIS LINE WAS MISSING
export const getProfile = () => api.get('/api/auth/profile');
export const searchPersons = (filters) => api.post('/api/persons/search', filters);
export const searchCompanies = (filters) => api.post('/api/companies/search', filters);

export default api;