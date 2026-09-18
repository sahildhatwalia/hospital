import { create } from 'zustand';
import api from '../lib/api';
import { INITIAL_DEMO_USERS } from '../lib/mockData';

export const useAuthStore = create((set, get) => ({
  user: null,
  role: 'GUEST',
  isAuthenticated: false,
  isAuthLoading: true,
  darkMode: false,

  setAuth: (userObj, token) => {
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({
      user: userObj,
      role: userObj?.role || 'GUEST',
      isAuthenticated: true,
      isAuthLoading: false,
    });
  },

  setAuthUser: (userObj) => {
    set({
      user: userObj,
      role: userObj?.role || 'GUEST',
      isAuthenticated: !!userObj,
    });
  },

  initAuth: async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthLoading: false, isAuthenticated: false, user: null, role: 'GUEST' });
      return;
    }

    try {
      set({ isAuthLoading: true });
      const res = await api.get('/auth/me');
      if (res.data?.success && res.data?.data?.user) {
        const userObj = res.data.data.user;
        set({
          user: userObj,
          role: userObj.role,
          isAuthenticated: true,
          isAuthLoading: false,
        });
      } else {
        localStorage.removeItem('token');
        set({ user: null, role: 'GUEST', isAuthenticated: false, isAuthLoading: false });
      }
    } catch (err) {
      localStorage.removeItem('token');
      set({ user: null, role: 'GUEST', isAuthenticated: false, isAuthLoading: false });
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ user: null, role: 'GUEST', isAuthenticated: false, isAuthLoading: false });
  },

  switchRole: (roleKey) => {
    // Gated behind development mode only
    const isDev = process.env.NODE_ENV === 'development';
    if (!isDev) {
      console.warn('Role switching is disabled in production environments.');
      return;
    }
    const roleKeyLower = roleKey.toLowerCase();
    const userObj = INITIAL_DEMO_USERS[roleKeyLower] || {
      id: 'p0',
      name: 'Guest Patient',
      role: 'PATIENT',
      email: 'patient@nexline.com',
      avatar: 'GP',
      accentColor: '#185FA5',
    };
    set({
      user: userObj,
      role: userObj.role,
      isAuthenticated: true,
    });
  },

  toggleDarkMode: () => {
    set((state) => {
      const nextMode = !state.darkMode;
      if (typeof document !== 'undefined') {
        if (nextMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { darkMode: nextMode };
    });
  },
}));
