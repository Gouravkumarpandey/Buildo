'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#eaecf0] hover:border-blue-600 transition-all bg-white shadow-sm font-bold text-[11px] uppercase tracking-wider text-[#101828]"
        >
            {isDark ? (
                <>
                    <Moon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Dark</span>
                </>
            ) : (
                <>
                    <Sun className="w-3.5 h-3.5 text-[#FFC400]" />
                    <span>Light</span>
                </>
            )}
        </button>
    );
}
