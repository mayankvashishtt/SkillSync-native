import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
    baseURL: 'https://giant-rabbits-accept.loca.lt/api', // Public tunnel URL for reliability
    headers: {
        'Content-Type': 'application/json',
        'bypass-tunnel-reminder': 'true', // Required for localtunnel to bypass warning page
    },
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
