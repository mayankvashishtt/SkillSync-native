import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
    baseURL: 'https://strident-runic-ireland.ngrok-free.dev/api', // Stable Ngrok URL
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Skip ngrok landing page
    },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
});

api.interceptors.response.use(
    (response) => {
        console.log('API Response Success:', response.status, response.data);
        return response;
    },
    (error) => {
        console.log('API Response Error:', error.response?.status, error.message, error.response?.data);
        return Promise.reject(error);
    }
);

export default api;
