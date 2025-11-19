import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors for request and response
api.interceptors.request.use(
    (config) => {
        // Add any custom headers or authentication tokens here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response; // Return full response, let services extract data
    },
    (error) => {
        // Handle errors globally
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;