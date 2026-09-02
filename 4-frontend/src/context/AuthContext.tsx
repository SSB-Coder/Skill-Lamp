import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, UserRole } from '../api/types';
import { login as apiLogin } from '../api/client';
import { MOCK_STUDENT_PRIYA } from '../api/mockData';

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

  const switchPersona = (targetRole?: UserRole) => {
    setIsSwitching(true);
    setTimeout(() => {
      const nextRole: UserRole = targetRole || (user?.role === 'TPO' ? 'STUDENT' : 'TPO');
      let nextSession: UserSession;

      if (nextRole === 'TPO') {
        nextSession = {
          role: 'TPO',
          name: 'TPO Placement Office',
          email: 'tpo@rvce.edu.in',
          token: 'demo-token-tpo-98421'
        };
      } else {
        nextSession = {
          role: 'STUDENT',
          name: MOCK_STUDENT_PRIYA.name,
          email: MOCK_STUDENT_PRIYA.email,
          token: 'demo-token-student-042',
          student_id: MOCK_STUDENT_PRIYA.usn,
          usn: MOCK_STUDENT_PRIYA.usn,
          branch: MOCK_STUDENT_PRIYA.branch,
          cgpa: MOCK_STUDENT_PRIYA.cgpa,
          active_backlogs: MOCK_STUDENT_PRIYA.active_backlogs,
          readiness_score: MOCK_STUDENT_PRIYA.readiness_score
        };
      }

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setUser(nextSession);
      setIsSwitching(false);
    }, 450); // ~0.5s smooth transition
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
