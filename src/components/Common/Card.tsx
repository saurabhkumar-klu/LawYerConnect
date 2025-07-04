import React from 'react';
import clsx from 'clsx';

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      'bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card; 