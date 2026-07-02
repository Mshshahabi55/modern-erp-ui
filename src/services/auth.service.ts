import type { LoginCredentials, AuthResponse, User } from '@/types/auth.types';

// Mock user data
const MOCK_USER: User = {
  id: 1,
  username: 'admin',
  email: 'admin@erp.com',
  fullName: 'Admin User',
  role: 'admin',
  avatar: undefined,
  lastLogin: new Date().toISOString(),
};

const MOCK_TOKEN = 'mock-jwt-token-xyz123';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API call with proper delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      return {
        success: true,
        user: MOCK_USER,
        token: MOCK_TOKEN,
      };
    }

    // Failed attempts tracking (simulated)
    return {
      success: false,
      error: 'Invalid username or password',
      failedAttempts: 1,
      maxAttempts: 3,
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        return JSON.parse(stored) as User;
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token') && !!localStorage.getItem('user');
  },
};