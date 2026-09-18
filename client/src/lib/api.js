import axios from 'axios';

/**
 * SECURITY ARCHITECTURE NOTE:
 * Storing JWT tokens in localStorage is vulnerable to Cross-Site Scripting (XSS) token theft
 * if malicious third-party scripts execute in the browser context.
 * 
 * Production Hardening Recommendation:
 * For high-security hospital/medical deployments, transition to server-issued HttpOnly, 
 * Secure, SameSite=Strict cookies for token persistence, combined with CSRF protection headers.
 * 
 * Current implementation uses localStorage for API authorization headers as an acceptable trade-off
 * for rapid Next.js client-side SPA state synchronization.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (
          !window.location.pathname.startsWith('/login') &&
          !window.location.pathname.startsWith('/register')
        ) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
