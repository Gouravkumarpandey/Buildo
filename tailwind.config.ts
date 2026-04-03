import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neobrutalist Primary Colors
        'neo-blue': '#0066FF',
        'neo-blue-light': '#0F7FFF',
        'neo-blue-dark': '#0052CC',
        'neo-pink': '#FF1493',
        'neo-orange': '#FF6B35',
        'neo-green': '#00D084',
        'neo-yellow': '#FFD700',
        'neo-purple': '#A020F0',
        'neo-red': '#FF0000',
        'neo-black': '#000000',
        'neo-white': '#FFFFFF',
        'neo-gray': '#F5F5F5',
        'neo-dark-gray': '#1A1A1A',
      },
      fontSize: {
        'neo-xs': ['12px', { lineHeight: '16px', fontWeight: '600' }],
        'neo-sm': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'neo-base': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'neo-lg': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'neo-xl': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'neo-2xl': ['32px', { lineHeight: '40px', fontWeight: '800' }],
        'neo-3xl': ['40px', { lineHeight: '48px', fontWeight: '800' }],
        'neo-4xl': ['48px', { lineHeight: '56px', fontWeight: '900' }],
      },
      fontWeight: {
        'neo-bold': '800',
        'neo-semibold': '700',
        'neo-medium': '600',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      borderRadius: {
        'neo': '12px',
        'neo-lg': '16px',
        'neo-xl': '24px',
      },
      boxShadow: {
        'neo-sm': '3px 3px 0px rgba(0, 0, 0, 0.25)',
        'neo': '4px 4px 0px rgba(0, 0, 0, 0.25)',
        'neo-lg': '6px 6px 0px rgba(0, 0, 0, 0.25)',
        'neo-xl': '8px 8px 0px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'bounce-neo': 'bounceNeo 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-neo': 'pulseNeo 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        bounceNeo: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseNeo: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
