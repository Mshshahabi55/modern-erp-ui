import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext";
import { authService } from "@/services/auth.service";
import type { LoginCredentials, User } from "@/types/auth.types";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;

        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
      }
    }

    setIsInitialized(true);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      const response = await authService.login(credentials);

      if (!response.success || !response.user) {
        throw new Error(response.error ?? "Login failed");
      }

      setUser(response.user);
      setIsAuthenticated(true);

      localStorage.setItem("auth_token", response.token ?? "");
      localStorage.setItem("user", JSON.stringify(response.user));

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
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}