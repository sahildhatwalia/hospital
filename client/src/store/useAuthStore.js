import { create } from 'zustand';
import { INITIAL_DEMO_USERS } from '../lib/mockData';

export const useAuthStore = create((set) => ({
  user: INITIAL_DEMO_USERS.doctor,
  role: 'DOCTOR',
  isAuthenticated: true,
  darkMode: false,

  switchRole: (roleKey) => {
    const roleKeyLower = roleKey.toLowerCase();
    const userObj = INITIAL_DEMO_USERS[roleKeyLower] || {
      id: 'p0',
      name: 'Guest Patient',
      role: 'PATIENT',
      email: 'patient@easpataal.com',
      avatar: 'GP',
      accentColor: '#2563EB',
    };
    set({
      user: userObj,
      role: userObj.role,
      isAuthenticated: true,
    });
  },

  setAuthUser: (userObj) => set({ user: userObj, role: userObj.role, isAuthenticated: true }),

  logout: () => set({ user: null, role: 'GUEST', isAuthenticated: false }),

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
