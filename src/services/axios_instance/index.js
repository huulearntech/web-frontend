import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hotel-booking-v1-0.onrender.com', // Replace with your API URL
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - Please log in again');
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;