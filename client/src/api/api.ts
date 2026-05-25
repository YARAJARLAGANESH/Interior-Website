import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to attach JWT token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      // exp is in seconds
      if (decoded?.exp && Date.now() / 1000 > decoded.exp) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = '/admin';
        // Cancel the request
        return Promise.reject(new axios.Cancel('Token expired'));
      }
    } catch (e) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin';
      return Promise.reject(e);
    }

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export default instance;
