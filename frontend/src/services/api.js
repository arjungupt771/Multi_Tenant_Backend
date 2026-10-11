
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/+$/, '')}/api`,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';

    const isAuthRequest =
      /\/auth\/(login|signup)\/?$/.test(requestUrl);

    if (status === 401 && !isAuthRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('organization');

      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/signup'
      ) {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
