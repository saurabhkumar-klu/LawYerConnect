import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    role: 'client' as 'client' | 'lawyer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { register, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Indian phone number
    if (digits.length <= 10) {
      return digits.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return digits.slice(0, 10).replace(/(\d{5})(\d{5})/, '$1 $2');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    
    if (validationErrors.phone) {
      setValidationErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phone) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    const success = await register({
      ...formData,
      phone: formData.phone ? `+91 ${formData.phone}` : ''
    });
    
    if (!success) {
      setError('Registration failed. Please try again.');
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'text-red-500' };
    if (password.length < 8) return { strength: 2, label: 'Fair', color: 'text-yellow-500' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, label: 'Strong', color: 'text-green-500' };
    }
    return { strength: 2, label: 'Good', color: 'text-blue-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="text-gray-600 mt-2">Join LawyerConnect today</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter your full name"
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {validationErrors.name && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Type *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="client">Client - Looking for legal help</option>
              <option value="lawyer">Lawyer - Providing legal services</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Create a password"
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
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                        passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                        passwordStrength.strength === 3 ? 'bg-green-500 w-full' : 'w-0'
                      }`}
                    />
                  </div>
                  <span className={`text-sm font-medium ${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}
            {validationErrors.password && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Confirm your password"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="flex items-center space-x-1 mt-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600 text-sm">Passwords match</span>
              </div>
            )}
            {validationErrors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-500 text-sm">+91</span>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`w-full pl-20 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors ${
                  validationErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="98765 43210"
                maxLength={11}
              />
            </div>
            {validationErrors.phone && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.phone}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="City, State"
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label className="ml-3 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a>
          </label>
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
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </motion.button>
      </form>

      <div className="text-center">
        <span className="text-gray-600">Already have an account? </span>
        <button
          onClick={onToggleForm}
          className="text-blue-600 hover:text-blue-500 font-semibold"
        >
          Sign in
        </button>
      </div>
    </motion.div>
  );
};

export default RegisterForm;