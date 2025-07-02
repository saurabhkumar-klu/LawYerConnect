import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { supabase } from '../supabaseClient';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          role: session.user.user_metadata?.role || 'client',
          avatar: session.user.user_metadata?.avatar_url || '',
          phone: session.user.user_metadata?.phone || '',
          location: session.user.user_metadata?.location || '',
          isOnline: true,
          createdAt: session.user.created_at,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Initial check
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: data.session.user.user_metadata?.name || '',
          role: data.session.user.user_metadata?.role || 'client',
          avatar: data.session.user.user_metadata?.avatar_url || '',
          phone: data.session.user.user_metadata?.phone || '',
          location: data.session.user.user_metadata?.location || '',
          isOnline: true,
          createdAt: data.session.user.created_at,
        });
      }
      setIsLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    return !error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  type NewType = {
    password: string;
  };

  type RegisterUser = Partial<User> & NewType;
  
  const register = async (userData: RegisterUser): Promise<boolean> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: userData.email!,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          phone: userData.phone,
          location: userData.location,
          role: userData.role,
        }
      }
    });
    setIsLoading(false);
    return !error;
  };

  return {
    user,
    login,
    logout,
    register,
    isLoading
  };
};

export { AuthContext };