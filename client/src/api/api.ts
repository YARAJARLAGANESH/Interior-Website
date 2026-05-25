import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

interface DecodedToken {
  exp?: number;
  id?: string;
  iat?: number;
}

/**
 * Check if token is expired
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return false;
    return Date.now() / 1000 > decoded.exp;
  } catch {
    return true;
  }
};

/**
 * Clear auth data and redirect to login
 */
const clearAuthAndRedirect = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
  window.location.href = '/admin';
};

// Request interceptor to attach JWT token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  
  if (token) {
    // Check if token is expired before sending request
    if (isTokenExpired(token)) {
      clearAuthAndRedirect();
      // Return rejected promise to prevent request
      return Promise.reject(new Error('Token expired'));
    }
    
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }
    
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: error.message || 'Network error',
      });
    }
    
    return Promise.reject(error);
  }
);

export default instance;
