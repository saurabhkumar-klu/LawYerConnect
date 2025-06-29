import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import toast from 'react-hot-toast';

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
    // Simulate loading user from localStorage
    const savedUser = localStorage.getItem('lawyerConnect_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        toast.success(`Welcome back, ${parsedUser.name}!`, {
          icon: '👋',
          duration: 3000,
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('lawyerConnect_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enhanced mock login logic with better validation
      if (!email || !password) {
        toast.error('Please enter both email and password');
        setIsLoading(false);
        return false;
      }

      if (!email.includes('@')) {
        toast.error('Please enter a valid email address');
        setIsLoading(false);
        return false;
      }

      // Determine user role based on email
      let userRole: 'client' | 'lawyer' | 'admin' = 'client';
      if (email.includes('lawyer')) {
        userRole = 'lawyer';
      } else if (email.includes('admin')) {
        userRole = 'admin';
      }

      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: userRole,
        avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
        phone: '+91 98765 43210',
        location: 'Patna, Bihar',
        isOnline: true,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('lawyerConnect_user', JSON.stringify(mockUser));
      
      toast.success(`Welcome ${mockUser.name}!`, {
        icon: userRole === 'lawyer' ? '⚖️' : userRole === 'admin' ? '👨‍💼' : '👤',
        duration: 4000,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    const userName = user?.name || 'User';
    setUser(null);
    localStorage.removeItem('lawyerConnect_user');
    toast.success(`Goodbye ${userName}! See you soon.`, {
      icon: '👋',
      duration: 3000,
    });
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enhanced validation
      if (!userData.email || !userData.name) {
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return false;
      }

      if (!userData.email.includes('@')) {
        toast.error('Please enter a valid email address');
        setIsLoading(false);
        return false;
      }

      if (userData.name.length < 2) {
        toast.error('Name must be at least 2 characters long');
        setIsLoading(false);
        return false;
      }

      // Check if phone number is valid (if provided)
      if (userData.phone) {
        const phoneDigits = userData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          toast.error('Please enter a valid phone number');
          setIsLoading(false);
          return false;
        }
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role || 'client',
        avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
        phone: userData.phone || '',
        location: userData.location || 'Patna, Bihar',
        isOnline: true,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('lawyerConnect_user', JSON.stringify(newUser));
      
      toast.success(`Account created successfully! Welcome to LawyerConnect, ${newUser.name}!`, {
        icon: '🎉',
        duration: 5000,
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      setIsLoading(false);
      return false;
    }
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