'use client';

import React from 'react';

interface NeoShapeProps {
  className?: string;
  animate?: boolean;
}

// Decorative circle
export const NeoCircle: React.FC<NeoShapeProps> = ({ className = '', animate = false }) => {
  return (
    <div
      className={`
        absolute rounded-full border-4 border-black dark:border-white
        ${animate ? 'animate-bounce-subtle' : ''}
        ${className}
      `}
    />
  );
};

// Decorative square
export const NeoSquare: React.FC<NeoShapeProps> = ({ className = '', animate = false }) => {
  return (
    <div
      className={`
        absolute border-4 border-black dark:border-white
        ${animate ? 'animate-bounce-subtle' : ''}
        ${className}
      `}
    />
  );
};

// Decorative triangle using SVG
export const NeoTriangle: React.FC<NeoShapeProps> = ({ className = '', animate = false }) => {
  return (
    <svg
      className={`absolute w-16 h-16 ${animate ? 'animate-bounce-subtle' : ''} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="50,10 90,80 10,80"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-black dark:text-white"
      />
    </svg>
  );
};

// Decorative wavy line
export const NeoWavyLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`w-full h-auto ${className}`}
      viewBox="0 0 1000 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,50 Q250,0 500,50 T1000,50"
        stroke="currentColor"
        strokeWidth="4"
        className="text-black dark:text-white"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// Geometric pattern background
export const NeoPatternBg: React.FC<{ colors?: string[] }> = ({ colors = ['#0066FF', '#FF1493', '#00D084'] }) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="neo-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="transparent" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="80" y="80" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="1000" height="1000" fill="url(#neo-pattern)" className="text-gray-300 dark:text-gray-700" opacity="0.5" />
    </svg>
  );
};

// Sticker-like badge with rotation
export const NeoSticker: React.FC<{ children: React.ReactNode; rotation?: number; className?: string }> = ({
  children,
  rotation = -5,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-black border-4 border-black dark:border-white rounded-neo
        shadow-neo-lg p-4 inline-block
        transform transition-transform hover:rotate-0 hover:scale-110
        ${className}
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
};
