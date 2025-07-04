import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => (
  <button
    className={clsx(
      'px-5 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400',
      {
        'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md': variant === 'primary',
        'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'secondary',
        'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
      },
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button; 