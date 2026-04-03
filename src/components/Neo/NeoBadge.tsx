'use client';

import React from 'react';

interface NeoBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'pink' | 'green' | 'orange' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
}

export const NeoBadge: React.FC<NeoBadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white border-black dark:border-white',
    secondary: 'bg-gray-200 text-black border-black dark:bg-gray-800 dark:text-white dark:border-white',
    pink: 'bg-pink-600 text-white border-black dark:border-white',
    green: 'bg-green-600 text-white border-black dark:border-white',
    orange: 'bg-orange-600 text-white border-black dark:border-white',
    yellow: 'bg-yellow-400 text-black border-black dark:border-white',
  };

  return (
    <span
      className={`
        inline-block border-3 border-solid rounded-neo
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-display font-800 uppercase tracking-wide
      `}
    >
      {children}
    </span>
  );
};

interface NeoTagProps {
  children: React.ReactNode;
  color?: string;
  onClose?: () => void;
}

export const NeoTag: React.FC<NeoTagProps> = ({ children, color = 'blue', onClose }) => {
  const colorClasses = {
    blue: 'bg-blue-600 text-white',
    pink: 'bg-pink-600 text-white',
    green: 'bg-green-600 text-white',
    orange: 'bg-orange-600 text-white',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1 border-2 border-current rounded-neo
        font-semibold text-xs uppercase tracking-widest
        ${colorClasses[color] || colorClasses.blue}
      `}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-1 font-bold hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </span>
  );
};
