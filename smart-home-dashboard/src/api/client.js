import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach the JWT token
apiClient.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.token) {
                config.headers['Authorization'] = 'Bearer ' + user.token;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const login = async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
};

export const verifyOTP = async (email, otp) => {
    return apiClient.post('/auth/verify-otp', { email, otp });
};

export const register = async (userData) => {
    return apiClient.post('/auth/register', userData);
};

export const forgotPassword = async (email) => {
    return apiClient.post('/auth/forgot-password', { email });
};

export const resetPassword = async (token, newPassword) => {
    return apiClient.post('/auth/reset-password', { token, newPassword });
};

// User & Settings endpoints
export const getUserProfile = () => apiClient.get('/user/me');
export const updateUserProfile = (userData) => apiClient.put('/user/update', userData);
export const getUserPreferences = () => apiClient.get('/user/preferences');
export const updateUserPreferences = (prefData) => apiClient.put('/user/preferences', prefData);

// Device endpoints
export const getDevices = () => apiClient.get('/devices');
export const addDevice = (deviceData) => apiClient.post('/devices', deviceData);
export const updateDevice = (id, deviceData) => apiClient.put(`/devices/${id}`, deviceData);
export const toggleDevice = (id, status) => apiClient.put(`/devices/${id}/toggle`, { status });
export const deleteDevice = (id) => apiClient.delete(`/devices/${id}`);

// Analytics & Metrics endpoints
export const getDashboardMetrics = () => apiClient.get('/metrics/overview');
export const getEnergyGraphData = () => apiClient.get('/metrics/energy');

// Security endpoints
export const getSecurityLogs = () => apiClient.get('/security/logs');

export default apiClient;
