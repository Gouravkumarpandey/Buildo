'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, GitHub, ArrowRight } from 'lucide-react';
import { NeoButton } from '@/components/Neo/NeoButton';
import { NeoCard } from '@/components/Neo/NeoCard';
import { NeoInput } from '@/components/Neo/NeoInput';
import { NeoBadge } from '@/components/Neo/NeoBadge';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    if (!email) setErrors((prev) => ({ ...prev, email: 'Email is required' }));
    if (!password) setErrors((prev) => ({ ...prev, password: 'Password is required' }));

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-4 border-black dark:border-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-900 text-2xl flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-neo border-2 border-black dark:border-white flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Buildo
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm font-medium">
              Don't have an account?{' '}
              <Link href="/register" className="font-display font-800 text-blue-600 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-4 md:px-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 border-4 border-black dark:border-white rounded-neo flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-display font-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Sign in to your Buildo account</p>
          </div>

          {/* Login Form */}
          <NeoCard padding="lg" shadow="lg" bgColor="white">
            <form onSubmit={handleLogin} className="space-y-6">
              <NeoInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <NeoInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-2 border-black dark:border-white rounded cursor-pointer"
                  />
                  <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-sm font-display font-800 text-blue-600 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <NeoButton
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </NeoButton>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-1 border-t-2 border-black dark:border-white" />
              <span className="font-display font-800 uppercase text-xs tracking-widest text-gray-600 dark:text-gray-400">
                Or continue with
              </span>
              <div className="flex-1 h-1 border-t-2 border-black dark:border-white" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full py-3 border-4 border-black dark:border-white rounded-neo font-display font-800 uppercase text-sm tracking-widest hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 shadow-neo">
                <GitHub className="w-5 h-5" />
                GitHub
              </button>
              <button className="w-full py-3  border-4 border-black dark:border-white rounded-neo font-display font-800 uppercase text-sm tracking-widest hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 shadow-neo">
                <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-black text-blue-600">G</span>
                </div>
                Google
              </button>
            </div>
          </NeoCard>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              By signing in, you agree to our{' '}
              <Link href="#" className="font-display font-800 text-blue-600 hover:underline">
                Terms
              </Link>
              {' '}and{' '}
              <Link href="#" className="font-display font-800 text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
