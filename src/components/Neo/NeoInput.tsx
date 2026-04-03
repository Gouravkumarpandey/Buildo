'use client';

import React, { InputHTMLAttributes } from 'react';

interface NeoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const NeoInput: React.FC<NeoInputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-display font-800 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 border-4 border-black dark:border-white rounded-neo
            font-semibold text-base bg-white dark:bg-black text-black dark:text-white
            placeholder-gray-400 dark:placeholder-gray-600
            transition-all duration-200 focus:outline-none focus:shadow-neo-lg
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-600 dark:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-600 dark:text-red-500 text-xs font-bold mt-1 uppercase">
          {error}
        </p>
      )}
    </div>
  );
};

export const NeoTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-display font-800 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 border-4 border-black dark:border-white rounded-neo
          font-semibold text-base bg-white dark:bg-black text-black dark:text-white
          placeholder-gray-400 dark:placeholder-gray-600
          transition-all duration-200 focus:outline-none focus:shadow-neo-lg
          resize-none font-mono
          ${error ? 'border-red-600 dark:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-600 dark:text-red-500 text-xs font-bold mt-1 uppercase">
          {error}
        </p>
      )}
    </div>
  );
};
