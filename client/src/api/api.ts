import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to attach JWT token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
