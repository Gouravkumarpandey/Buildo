'use client';

import React, { ReactNode } from 'react';

interface NeoCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  border?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  bgColor?: 'white' | 'blue' | 'pink' | 'orange' | 'green' | 'gray';
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  border = 'md',
  shadow = 'md',
  bgColor = 'white',
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-5',
  };

  const shadowClasses = {
    sm: 'shadow-neo-sm',
    md: 'shadow-neo',
    lg: 'shadow-neo-lg',
  };

  const bgColorClasses = {
    white: 'bg-white text-black dark:bg-black dark:text-white border-black dark:border-white',
    blue: 'bg-blue-600 text-white border-black dark:border-white',
    pink: 'bg-pink-600 text-white border-black dark:border-white',
    orange: 'bg-orange-600 text-white border-black dark:border-white',
    green: 'bg-green-600 text-white border-black dark:border-white',
    gray: 'bg-gray-200 text-black border-black dark:bg-gray-800 dark:text-white dark:border-white',
  };

  return (
    <div
      className={`
        ${borderClasses[border]} border-solid rounded-neo
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${bgColorClasses[bgColor]}
        ${hover ? 'transition-all duration-200 hover:shadow-neo-xl hover:translate-x-1 hover:translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
