import React, { createContext, useContext, useEffect, useState } from 'react';
import { Members } from '../api/members';

interface AuthContextType {
  isAuthenticated: boolean | null; // null = loading, true = authenticated, false = not authenticated
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const authenticated = await Members();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('인증 확인 실패:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};