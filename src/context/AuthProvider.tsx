import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext";
import { authService } from "@/services/auth.service";
import { storageService } from "@/services/storage/storage.service";

import type { LoginCredentials, User } from "@/types/auth.types";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const token = storageService.getToken();
      const storedUser = storageService.getUser();

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }

      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      const response = await authService.login(credentials);

      if (!response.success || !response.user) {
        throw new Error(response.error ?? "Login failed");
      }

      storageService.setToken(response.token ?? "");
      storageService.setUser(response.user);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success("Welcome back!");
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
    storageService.clear();

    setUser(null);
    setIsAuthenticated(false);

    toast.success("Logged out successfully");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;