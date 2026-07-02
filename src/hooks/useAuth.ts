import { useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials } from '@/types/auth.types';
import { authService } from '@/services/auth.service';
import toast from 'react-hot-toast';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing session on mount only
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        // Invalid JSON, clear storage
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('auth_token', response.token || '');
        localStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);
        toast.success('Welcome back!');
      } else {
        toast.error(response.error || 'Login failed');
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  }, []);

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };
};