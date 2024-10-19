import axios from 'axios';
import { getAuthToken, removeAuthToken } from './auth';
import toast from 'react-hot-toast';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'https://financial-project.onrender.com'
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      removeAuthToken();
      localStorage.removeItem('userData');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;