import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (!validateForm()) {
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const demoAccounts = [
    { type: 'Client', email: 'client@demo.com', description: 'Access client dashboard and book consultations' },
    { type: 'Lawyer', email: 'lawyer@demo.com', description: 'Access lawyer profile and manage consultations' },
    { type: 'Admin', email: 'admin@demo.com', description: 'Access admin panel and platform management' }
  ];

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
    setValidationErrors({});
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-2">Sign in to your LawyerConnect account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center space-x-2"
          >
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validationErrors.email) {
                    setValidationErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {validationErrors.email && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationErrors.password) {
                    setValidationErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
            Forgot password?
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </motion.button>
      </form>

      {/* Demo Accounts */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">Try Demo Accounts</h3>
        <div className="space-y-3">
          {demoAccounts.map((account) => (
            <motion.button
              key={account.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDemoLogin(account.email)}
              className="w-full p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{account.type} Demo</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </div>
                <div className="text-blue-600 text-sm font-medium">Try Now</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          onClick={onToggleForm}
          className="text-blue-600 hover:text-blue-500 font-semibold"
        >
          Sign up
        </button>
      </div>
    </motion.div>
  );
};

export default LoginForm;