
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';
import { salonDataService } from '../services/salonData';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate logging in a default user for the client side.
    // In a real app, this would involve checking a token.
    const simulateLogin = async () => {
      const users = await salonDataService.getUsers();
      // Log in as a regular user by default
      const defaultUser = users.find(u => u.uid === 'user-1');
      setCurrentUser(defaultUser || null);
      setLoading(false);
    };

    simulateLogin();
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
