'use client';

import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pink' | 'green' | 'orange' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  as: Component = 'button',
  href,
  ...props
}) => {
  const baseClasses = 'font-display font-800 uppercase tracking-widest border-4 transition-all duration-200 active:translate-x-1 active:translate-y-1 hover:shadow-neo-lg cursor-pointer inline-block';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white border-black shadow-neo-lg hover:bg-blue-700 dark:border-white',
    secondary: 'bg-white text-black border-black shadow-neo-lg hover:bg-gray-100 dark:bg-black dark:text-white dark:border-white',
    pink: 'bg-pink-600 text-white border-black shadow-neo-lg hover:bg-pink-700 dark:border-white',
    green: 'bg-green-600 text-white border-black shadow-neo-lg hover:bg-green-700 dark:border-white',
    orange: 'bg-orange-600 text-white border-black shadow-neo-lg hover:bg-orange-700 dark:border-white',
    outline: 'bg-transparent text-black border-black shadow-neo dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900',
  };

  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={allClasses}
      {...props}
    >
      {children}
    </button>
  );
};
