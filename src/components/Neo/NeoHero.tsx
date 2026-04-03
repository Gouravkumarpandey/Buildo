'use client';

import React from 'react';
import Link from 'next/link';
import { NeoButton } from './NeoButton';
import { NeoCircle, NeoSquare, NeoTriangle } from './NeoShapes';

interface NeoHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  cta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  bgColor?: 'blue' | 'white' | 'black' | 'gray';
  showDecorations?: boolean;
  children?: React.ReactNode;
}

export const NeoHero: React.FC<NeoHeroProps> = ({
  title,
  subtitle,
  description,
  cta,
  secondaryCta,
  bgColor = 'white',
  showDecorations = true,
  children,
}) => {
  const bgClasses = {
    blue: 'bg-blue-600 text-white',
    white: 'bg-white text-black dark:bg-black dark:text-white',
    black: 'bg-black text-white',
    gray: 'bg-gray-100 text-black dark:bg-gray-900 dark:text-white',
  };

  return (
    <section className={`relative py-20 md:py-32 px-4 md:px-8 overflow-hidden ${bgClasses[bgColor]} border-b-4 border-black dark:border-white mt-16`}>
      {/* Decorative elements */}
      {showDecorations && (
        <>
          <NeoCircle className="top-10 right-10 w-32 h-32 opacity-20" />
          <NeoSquare className="bottom-20 left-5 w-24 h-24 opacity-20" />
          <NeoTriangle className="top-1/3 left-1/4 opacity-30" />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Subtitle/badge */}
        {subtitle && (
          <div className="mb-4">
            <span className="inline-block px-4 py-2 border-3 border-current rounded-neo font-display font-800 uppercase text-xs tracking-widest">
              {subtitle}
            </span>
          </div>
        )}

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-900 leading-tight tracking-tighter mb-6 text-neo-heading">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-lg md:text-xl max-w-2xl mb-8 font-medium leading-relaxed opacity-90">
            {description}
          </p>
        )}

        {/* Custom children */}
        {children}

        {/* CTAs */}
        {(cta || secondaryCta) && (
          <div className="flex flex-wrap gap-4 mt-8">
            {cta && (
              <NeoButton
                variant="primary"
                size="lg"
                onClick={cta.onClick}
                href={cta.href}
              >
                {cta.text}
              </NeoButton>
            )}
            {secondaryCta && (
              <NeoButton
                variant="secondary"
                size="lg"
                onClick={secondaryCta.onClick}
                href={secondaryCta.href}
              >
                {secondaryCta.text}
              </NeoButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

interface NeoSectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  centerText?: boolean;
  maxWidth?: string;
}

export const NeoSectionHeader: React.FC<NeoSectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centerText = true,
  maxWidth = 'max-w-2xl',
}) => {
  return (
    <div className={`${centerText ? 'text-center mx-auto' : ''} ${maxWidth}`}>
      {subtitle && (
        <div className="mb-4">
          <span className="inline-block px-4 py-2 border-3 border-black dark:border-white rounded-neo font-display font-800 uppercase text-xs tracking-widest">
            {subtitle}
          </span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-display font-900 leading-tight tracking-tighter mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
