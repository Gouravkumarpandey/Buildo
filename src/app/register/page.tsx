'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

/* ─── Plan Picker Step ──────────────────────────────────── */
function PlanStep({ onContinue }: { onContinue: (plan: 'pro' | 'hobby') => void }) {
    const [selected, setSelected] = useState<'pro' | 'hobby'>('pro');

    return (
        <div className="w-full max-w-[420px] mx-auto">
            {/* Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="px-8 pt-10 pb-8">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white text-center leading-snug mb-7">
                        Your first deploy<br />
                        is just a sign-up away.
                    </h1>

                    {/* Plan type label */}
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-medium">
                        Plan Type
                    </p>

                    {/* Options */}
                    <div className="space-y-2">
                        {/* Pro */}
                        <label
                            className={`flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${selected === 'pro'
                                ? 'border-zinc-600 bg-zinc-800'
                                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors ${selected === 'pro' ? 'border-white' : 'border-zinc-600'
                                        }`}
                                >
                                    {selected === 'pro' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </div>
                                <span className="text-sm text-zinc-300">I'm working on commercial projects</span>
                            </div>
                            <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                Pro
                            </span>
                            <input
                                type="radio"
                                name="plan"
                                value="pro"
                                checked={selected === 'pro'}
                                onChange={() => setSelected('pro')}
                                className="sr-only"
                            />
                        </label>

                        {/* Hobby */}
                        <label
                            className={`flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer transition-all ${selected === 'hobby'
                                ? 'border-zinc-600 bg-zinc-800'
                                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-colors ${selected === 'hobby' ? 'border-white' : 'border-zinc-600'
                                        }`}
                                >
                                    {selected === 'hobby' && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </div>
                                <span className="text-sm text-zinc-300">I'm working on personal projects</span>
                            </div>
                            <span className="text-xs font-semibold bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full">
                                Hobby
                            </span>
                            <input
                                type="radio"
                                name="plan"
                                value="hobby"
                                checked={selected === 'hobby'}
                                onChange={() => setSelected('hobby')}
                                className="sr-only"
                            />
                        </label>
                    </div>

                    {/* Continue button */}
                    <button
                        onClick={() => onContinue(selected)}
                        className="w-full mt-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-xl border border-zinc-700 transition-all active:scale-[0.99]"
                    >
                        Continue
                    </button>

                    {/* Terms */}
                    <p className="text-center text-xs text-zinc-600 mt-5">
                        By joining, you agree to our{' '}
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
                    </p>
                </div>

                {/* Enterprise banner */}
                <div className="px-8 py-4 bg-gradient-to-r from-purple-900/60 to-violet-900/60 border-t border-purple-800/40">
                    <p className="text-center text-xs text-purple-300">
                        Have a complex company use case? Get{' '}
                        <span className="font-bold text-white">Enterprise grade</span>
                        {' '}assistance{' '}
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-purple-500 text-purple-400 text-[10px] ml-1">
                            →
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ─── Account Details Step ────────────────────────────────── */
function AccountStep({
    plan,
    onBack,
}: {
    plan: 'pro' | 'hobby';
    onBack: () => void;
}) {
    const { register } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success('Account created! Welcome 🎉');
            router.push('/');
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[380px] mx-auto space-y-4">
            {/* Plan badge + back */}
            <div className="flex items-center justify-between mb-2">
                <button
                    onClick={onBack}
                    className="text-zinc-500 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${plan === 'pro'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-700 text-zinc-300'
                        }`}
                >
                    {plan === 'pro' ? 'Pro' : 'Hobby'}
                </span>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-6">
                Create your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    autoFocus
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min 6 characters)"
                    required
                    minLength={6}
                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-1 bg-white hover:bg-zinc-100 text-black font-semibold py-3 rounded-lg text-sm transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-zinc-800" />
                <div className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* Social signup options */}
            <div className="space-y-2">
                {[
                    {
                        label: 'Continue with Google',
                        icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        ),
                    },
                    {
                        label: 'Continue with GitHub',
                        icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        ),
                    },
                ].map(({ label, icon }) => (
                    <button
                        key={label}
                        type="button"
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-white text-sm font-medium transition-all hover:border-zinc-700 active:scale-[0.99]"
                    >
                        {icon}
                        {label}
                    </button>
                ))}
            </div>

            <p className="text-center text-xs text-zinc-600 pt-1">
                Already have an account?{' '}
                <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    );
}

/* ─── Root Page ─────────────────────────────────────────── */
export default function RegisterPage() {
    const [step, setStep] = useState<'plan' | 'account'>('plan');
    const [plan, setPlan] = useState<'pro' | 'hobby'>('pro');

    const handlePlanContinue = (chosen: 'pro' | 'hobby') => {
        setPlan(chosen);
        setStep('account');
    };

    return (
        <main className="min-h-screen bg-black flex flex-col">
            {/* ── Top bar ── */}
            <div className="flex items-center justify-between px-6 py-5">
                <Link href="/landing">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 20h20L12 2z" />
                    </svg>
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/login"
                        className="text-sm text-white border border-zinc-700 hover:border-zinc-500 px-4 py-1.5 rounded-md transition-colors"
                    >
                        Log In
                    </Link>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                {step === 'plan' ? (
                    <PlanStep onContinue={handlePlanContinue} />
                ) : (
                    <AccountStep plan={plan} onBack={() => setStep('plan')} />
                )}
            </div>
        </main>
    );
}
