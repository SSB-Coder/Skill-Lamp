import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, UserRole } from '../api/types';
import { login as apiLogin } from '../api/client';

interface AuthContextType {
  user: UserSession | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  switchPersona: (targetRole?: UserRole) => void;
  isSwitching: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'skill_lamp_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password = 'password') => {
    setIsLoading(true);
    try {
      const session = await apiLogin(email, password);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const switchPersona = async (targetRole?: UserRole) => {
    setIsSwitching(true);
    try {
      const nextRole: UserRole = targetRole || (user?.role === 'TPO' ? 'STUDENT' : 'TPO');
      const email = nextRole === 'TPO' ? 'tpo@rvce.edu.in' : 'priya.ise21@rvce.edu.in';
      const session = await apiLogin(email, 'password123');
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
    } catch {
      logout();
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        login,
        logout,
        switchPersona,
        isSwitching
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
