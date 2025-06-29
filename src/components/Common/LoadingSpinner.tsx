import React from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} text-blue-600`}
        >
          <Scale className="w-full h-full" />
        </motion.div>
        
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-sm font-medium"
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;