'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft, Github, Globe, Shield, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

/* ── SVG Icons ─────────────────────────────────────────── */
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

/* ── Main Page ──────────────────────────────────────────── */
export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState<'email' | 'password'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinueWithEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStep('password');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome to the Grid.');
            router.push('/');
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white bauhaus-pattern">

            <div className="w-full max-w-[400px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                <div className="text-center space-y-4">
                    <Link href="/landing" className="inline-flex items-center gap-2 mb-2 group">
                        <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/10 group-hover:scale-105 transition-transform">
                          <Globe className="w-5 h-5" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-[#101828]">NEXORA</span>
                    </Link>
                    <h1 className="text-3xl font-black text-[#101828] tracking-tighter uppercase italic">
                        Access Domain
                    </h1>
                    <p className="text-sm font-medium text-[#667085] max-w-xs mx-auto">
                        Authenticate with your engineer credentials to access the global compute grid.
                    </p>
                </div>

                <div className="bauhaus-card p-8 bg-white shadow-xl shadow-blue-900/5">
                    {step === 'email' ? (
                        <form onSubmit={handleContinueWithEmail} className="space-y-5">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] ml-1">Email Address</label>
                              <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
                                  <input
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="developer@nexora.app"
                                      required
                                      autoFocus
                                      className="bauhaus-input w-full pl-10 text-sm font-medium border-[#eaecf0]"
                                  />
                              </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bauhaus-button py-3 justify-center text-sm"
                            >
                                Continue with Email <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </form>
                    ) : (
                        /* Password step */
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <button
                                type="button"
                                className="flex items-center gap-2 text-[#667085] hover:text-[#101828] font-bold text-[10px] uppercase tracking-widest mb-4 transition-colors p-1"
                                onClick={() => setStep('email')}
                            >
                                <ArrowLeft className="w-3 h-3" /> {email}
                            </button>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] ml-1">Password</label>
                              <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
                                  <input
                                      type="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      placeholder="••••••••"
                                      required
                                      autoFocus
                                      minLength={6}
                                      className="bauhaus-input w-full pl-10 text-sm font-medium border-[#eaecf0]"
                                  />
                              </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bauhaus-button py-3 justify-center text-sm"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authenticate Domain Access'}
                            </button>
                        </form>
                    )}

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#eaecf0]"></div></div>
                        <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest"><span className="px-3 bg-white text-[#98a2b3]">or connect grid</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-2.5 border border-[#eaecf0] hover:bg-[#f9fafb] hover:border-blue-600 transition-all font-bold text-[11px] uppercase tracking-wider text-[#101828]">
                          <GoogleIcon /> Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-2.5 border border-[#eaecf0] hover:bg-[#f9fafb] hover:border-blue-600 transition-all font-bold text-[11px] uppercase tracking-wider text-[#101828]">
                          <Github className="w-4 h-4" /> GitHub
                        </button>
                    </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs font-medium text-[#667085]">
                      New Grid Recruit?{' '}
                      <Link href="/register" className="text-blue-600 font-bold hover:underline">
                          Create Account
                      </Link>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-10 pt-8 opacity-20">
                    <Shield className="w-6 h-6" />
                    <Globe className="w-6 h-6" />
                    <Lock className="w-6 h-6" />
                </div>
            </div>
            
            <div className="fixed bottom-6 right-6">
                <ThemeToggle />
            </div>
        </main>
    );
}
