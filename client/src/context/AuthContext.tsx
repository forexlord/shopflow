import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { loginRequest } from "../api/auth.api";
import type { AuthSession, User } from "../types/auth.types";

const STORAGE_KEY = "shopflow_auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function persistSession(session: AuthSession | null): void {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

interface AuthState {
  user: User | null;
  token: string | null;
}

function getInitialAuthState(): AuthState {
  const session = readStoredSession();
  return {
    user: session?.user ?? null,
    token: session?.token ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(getInitialAuthState);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginRequest({ email, password });
    const session: AuthSession = {
      token: response.token,
      user: response.user,
    };

    setAuthState({ user: session.user, token: session.token });
    persistSession(session);
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, token: null });
    persistSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: authState.user,
      token: authState.token,
      isAuthenticated: Boolean(authState.token),
      login,
      logout,
    }),
    [authState, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
