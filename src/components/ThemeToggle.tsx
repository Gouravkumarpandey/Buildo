'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark/light mode"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
                    : 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
                boxShadow: isDark
                    ? 'inset 0 1px 3px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)'
                    : 'inset 0 1px 3px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
            }}
        >
            {/* Stars (dark mode) */}
            {isDark && (
                <>
                    <span className="absolute top-1 left-2 w-0.5 h-0.5 rounded-full bg-white opacity-90" />
                    <span className="absolute top-3 left-3.5 w-0.5 h-0.5 rounded-full bg-white opacity-70" />
                    <span className="absolute top-1.5 left-5 w-1 h-1 rounded-full bg-white opacity-80" />
                </>
            )}

            {/* Sun rays (light mode) */}
            {!isDark && (
                <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{ left: isDark ? '4px' : 'calc(100% - 26px)' }}
                >
                    {/* Sun glow */}
                    <div className="absolute inset-0 rounded-full bg-yellow-200 blur-sm opacity-60 scale-125" />
                </div>
            )}

            {/* Sliding thumb */}
            <div
                className="absolute top-1 bottom-1 aspect-square rounded-full shadow-md transition-all duration-500 flex items-center justify-center"
                style={{
                    left: isDark ? 'calc(100% - 26px)' : '4px',
                    background: isDark
                        ? 'radial-gradient(circle at 38% 38%, #e2e8f0, #cbd5e1)'
                        : 'radial-gradient(circle at 38% 38%, #fef9c3, #fde68a)',
                    boxShadow: isDark
                        ? '2px 2px 4px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(0,0,0,0.2)'
                        : '1px 2px 6px rgba(251,191,36,0.5)',
                }}
            >
                {/* Moon craters (dark) */}
                {isDark && (
                    <>
                        <span
                            className="absolute rounded-full bg-slate-400/40"
                            style={{ width: 5, height: 5, top: 4, left: 7 }}
                        />
                        <span
                            className="absolute rounded-full bg-slate-400/30"
                            style={{ width: 3, height: 3, top: 9, left: 4 }}
                        />
                    </>
                )}
                {/* Sun face (light) */}
                {!isDark && (
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <circle cx="5" cy="5" r="3" fill="#f59e0b" />
                        </svg>
                    </div>
                )}
            </div>
        </button>
    );
}
