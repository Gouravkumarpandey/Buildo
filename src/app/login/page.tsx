'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
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

const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const AppleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

const SamlIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
);

const PasskeyIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4" />
        <path d="M16 18l2 2 4-4" />
    </svg>
);

const GitLabIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#E24329" d="M12 21.638l-3.27-10.06H15.27L12 21.638z" />
        <path fill="#FC6D26" d="M12 21.638l-6.764-10.06H8.73L12 21.638z" />
        <path fill="#FCA326" d="M5.236 11.578L4.07 7.754a.457.457 0 00-.866 0L2 11.578l3.236 9.927V11.578z" />
        <path fill="#FC6D26" d="M12 21.638l6.764-10.06H15.27L12 21.638z" />
        <path fill="#FCA326" d="M18.764 11.578l1.166-3.824a.457.457 0 01.866 0L22 11.578l-3.236 9.927V11.578z" />
        <path fill="#E24329" d="M18.764 11.578H15.27L18.764 21.505l3.236-9.927H18.764z" />
        <path fill="#E24329" d="M5.236 11.578H8.73L5.236 21.505 2 11.578H5.236z" />
        <path fill="#FC6D26" d="M8.73 11.578H15.27L12 21.638 8.73 11.578z" />
    </svg>
);

const BitbucketIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#2684FF" d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.768.768 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891L.778 1.213zM14.52 15.53H9.522L8.17 8.471h7.561l-1.211 7.06z" />
    </svg>
);

/* ── Social Button ──────────────────────────────────────── */
function SocialButton({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-white text-sm font-medium transition-all duration-150 hover:border-zinc-700 active:scale-[0.99]"
        >
            {icon}
            {label}
        </button>
    );
}

/* ── Icon-only button (for Gitlab / Bitbucket row) ─────── */
function IconButton({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex-1 flex items-center justify-center py-3 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-all duration-150 hover:border-zinc-700 active:scale-[0.99]"
        >
            {icon}
        </button>
    );
}

/* ── Main Page ──────────────────────────────────────────── */
export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState<'email' | 'password'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOther, setShowOther] = useState(false);

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
            toast.success('Welcome back! 🚀');
            router.push('/');
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
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
                        href="/register"
                        className="text-sm text-white border border-zinc-700 hover:border-zinc-500 px-4 py-1.5 rounded-md transition-colors"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* ── Form area ── */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-[380px] space-y-4">
                    <h1 className="text-2xl font-bold text-white text-center mb-6">
                        Log in to Buildo
                    </h1>

                    {/* Email step */}
                    {step === 'email' ? (
                        <form onSubmit={handleContinueWithEmail} className="space-y-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                                autoFocus
                                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-full bg-white hover:bg-zinc-100 text-black font-semibold py-3 rounded-lg text-sm transition-all active:scale-[0.99]"
                            >
                                Continue with Email
                            </button>
                        </form>
                    ) : (
                        /* Password step */
                        <form onSubmit={handleSubmit} className="space-y-2">
                            <div
                                className="flex items-center gap-2 text-zinc-400 text-sm cursor-pointer hover:text-white transition-colors mb-1"
                                onClick={() => setStep('email')}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                {email}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                autoFocus
                                minLength={6}
                                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white hover:bg-zinc-100 text-black font-semibold py-3 rounded-lg text-sm transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? 'Signing in...' : 'Continue'}
                            </button>
                        </form>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-zinc-800" />
                        <div className="flex-1 h-px bg-zinc-800" />
                    </div>

                    {/* Social buttons */}
                    <div className="space-y-2">
                        <SocialButton icon={<GoogleIcon />} label="Continue with Google" />
                        <SocialButton icon={<GithubIcon />} label="Continue with GitHub" />
                        <SocialButton icon={<AppleIcon />} label="Continue with Apple" />
                        <SocialButton icon={<SamlIcon />} label="Continue with SAML SSO" />
                        <SocialButton icon={<PasskeyIcon />} label="Continue with Passkey" />
                    </div>

                    {/* Show other options */}
                    <button
                        type="button"
                        onClick={() => setShowOther((v) => !v)}
                        className="w-full text-sm text-zinc-500 hover:text-white transition-colors text-center py-1"
                    >
                        {showOther ? 'Hide other options' : 'Show other options'}
                    </button>

                    {/* Expanded: GitLab + Bitbucket */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ${showOther ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="flex gap-2 pt-1">
                            <IconButton icon={<GitLabIcon />} />
                            <IconButton icon={<BitbucketIcon />} />
                        </div>
                    </div>

                    {/* Sign-up link */}
                    <p className="text-center text-xs text-zinc-600 pt-2">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-zinc-400 hover:text-white transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
