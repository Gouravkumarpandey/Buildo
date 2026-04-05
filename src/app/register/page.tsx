'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowRight, ArrowLeft, Globe, Shield, Rocket, Check, Mail, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

/* ─── Plan Picker Step ──────────────────────────────────── */
function PlanStep({ onContinue }: { onContinue: (plan: 'pro' | 'hobby') => void }) {
    const [selected, setSelected] = useState<'pro' | 'hobby'>('pro');

    return (
        <div className="w-full max-w-[460px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
                <h1 className="text-4xl font-black text-[#101828] leading-[0.95] mb-4 tracking-tighter uppercase italic">
                    Initialize<br />Engine Phase
                </h1>
                <p className="text-sm font-medium text-[#667085]">Select your compute distribution tier on the global grid.</p>
            </div>

            <div className="bauhaus-card bg-white p-8 space-y-6 shadow-xl shadow-blue-900/5">
                <div className="space-y-3">
                    {/* Pro */}
                    <div
                        onClick={() => setSelected('pro')}
                        className={`p-5 border cursor-pointer transition-all duration-200 relative overflow-hidden ${selected === 'pro'
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                            : 'border-[#eaecf0] bg-white hover:bg-[#f9fafb]'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === 'pro' ? 'border-blue-600 bg-blue-600' : 'border-[#d0d5dd]'}`}>
                                 {selected === 'pro' && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm font-extrabold uppercase tracking-tight">Professional</span>
                           </div>
                           <span className="text-[10px] font-bold text-blue-600 uppercase py-0.5 px-2 bg-blue-100/50">Primary Tier</span>
                        </div>
                        <p className="text-xs text-[#667085] ml-8">Advanced scaling for commercial grid operations.</p>
                    </div>

                    {/* Hobby */}
                    <div
                        onClick={() => setSelected('hobby')}
                        className={`p-5 border cursor-pointer transition-all duration-200 relative overflow-hidden ${selected === 'hobby'
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                            : 'border-[#eaecf0] bg-white hover:bg-[#f9fafb]'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === 'hobby' ? 'border-blue-600 bg-blue-600' : 'border-[#d0d5dd]'}`}>
                                 {selected === 'hobby' && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm font-extrabold uppercase tracking-tight">Personal</span>
                           </div>
                           <span className="text-[10px] font-bold text-[#667085] uppercase py-0.5 px-2 bg-[#f2f4f7]">Hobbyist</span>
                        </div>
                        <p className="text-xs text-[#667085] ml-8">Rapid prototyping for experimental compute.</p>
                    </div>
                </div>

                <button
                    onClick={() => onContinue(selected)}
                    className="w-full bauhaus-button py-4 text-base justify-center mt-4"
                >
                    Continue to Registration <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] leading-relaxed">
                    By initializing, you agree to our <br />
                    <a href="#" className="text-blue-600 hover:underline">Nexus Protocols</a> & <a href="#" className="text-blue-600 hover:underline">Data Policies</a>
                </p>
            </div>
            
            <div className="flex items-center justify-center gap-6 opacity-40 grayscale group">
               <div className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-[10px] font-bold uppercase tracking-widest text-[#101828]">SOC2_AUDITED</span></div>
               <div className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /><span className="text-[10px] font-bold uppercase tracking-widest text-[#101828]">E2E_ENCRYPTED</span></div>
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
        setLoading(true);
        try {
            await register(name, email, password);
            toast.success('Grid Access Granted.');
            router.push('/');
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[420px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-2">
                <button
                    onClick={onBack}
                    className="text-[#667085] hover:text-[#101828] font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to tier
                </button>
                <div className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-widest">
                    Selected: {plan}
                </div>
            </div>

            <div className="bauhaus-card bg-white p-8 shadow-xl shadow-blue-900/5">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black text-[#101828] uppercase italic tracking-tighter">
                      Identify Node
                  </h1>
                  <p className="text-xs font-medium text-[#667085] mt-1">Configure your root developer profile.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            autoFocus
                            className="w-full bauhaus-input pl-10 text-sm font-medium border-[#eaecf0]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest ml-1">Work Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            required
                            className="w-full bauhaus-input pl-10 text-sm font-medium border-[#eaecf0]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest ml-1">Grid Key</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 chars"
                            required
                            minLength={6}
                            className="w-full bauhaus-input pl-10 text-sm font-medium border-[#eaecf0]"
                        />
                      </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bauhaus-button py-4 text-sm justify-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Commit Node Registration'}
                    </button>
                </form>

                <p className="text-center text-[11px] font-bold text-[#98a2b3] uppercase tracking-widest pt-8">
                    Registered?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Access Domain
                    </Link>
                </p>
            </div>
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
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 bauhaus-pattern">
            
            {/* ── Top branding ── */}
            <div className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 md:px-12 bg-white/5 backdrop-blur-none pointer-events-none">
                <Link href="/landing" className="flex items-center gap-2 pointer-events-auto">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-600 shadow-lg shadow-blue-500/10">
                         <Globe className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-extrabold text-xl tracking-tighter text-[#101828]">NEXORA</span>
                </Link>
                <div className="flex items-center gap-6 pointer-events-auto">
                    <ThemeToggle />
                    <Link
                        href="/login"
                        className="font-bold text-xs uppercase text-[#667085] hover:text-[#101828] transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="w-full">
                {step === 'plan' ? (
                    <PlanStep onContinue={handlePlanContinue} />
                ) : (
                    <AccountStep plan={plan} onBack={() => setStep('plan')} />
                )}
            </div>
            
            {/* Bottom help */}
            <div className="fixed bottom-8 flex items-center gap-8 justify-center w-full opacity-30 select-none">
               <Shield className="w-6 h-6" />
               <Globe className="w-6 h-6" />
               <Rocket className="w-6 h-6" />
            </div>
        </main>
    );
}
