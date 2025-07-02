import React from 'react';
import { AuthContext, useAuthState } from '../../hooks/useAuth';
import { User as AppUser } from '../../types'; // Use your app's User type, not Supabase's

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Use the same RegisterUser type as in useAuth.ts
export type RegisterUser = Partial<AppUser> & { password: string };

export interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterUser) => Promise<boolean>;
  isLoading: boolean;
}