import React, { useState } from 'react';
import { X, Scale } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>

          {mode === 'login' ? (
            <LoginForm onToggleForm={() => setMode('register')} />
          ) : (
            <RegisterForm onToggleForm={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;