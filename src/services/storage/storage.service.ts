import { STORAGE_KEYS } from "@/constants/storage";
import type { User } from "@/types/auth.types";

class StorageService {
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  getUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as User;
    } catch {
      this.removeUser();
      return null;
    }
  }

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }
}

export const storageService = new StorageService();