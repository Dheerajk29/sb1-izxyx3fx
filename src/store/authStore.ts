import create from 'zustand';
import { auth } from '../lib/api';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (email, password) => {
    const { data } = await auth.login({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    set({ user: data.user, isAuthenticated: true });
  },
  
  register: async (userData) => {
    const { data } = await auth.register(userData);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    set({ user: data.user, isAuthenticated: true });
  },
  
  logout: () => {
    auth.logout();
    set({ user: null, isAuthenticated: false });
  }
}));

export default useAuthStore;