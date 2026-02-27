'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
    ArrowRight, Github, Zap, Globe, Shield, BarChart2,
    Terminal, GitBranch, CheckCircle2, ChevronRight, Star,
    Server, Database, Layers, RefreshCw, Lock, Cpu,
} from 'lucide-react';

/* ─── Marquee companies ── */
const COMPANIES = ['Stripe', 'GitHub', 'Shopify', 'Linear', 'Figma', 'Notion', 'Vercel', 'Supabase', 'Planetscale', 'Tailscale'];

/* ─── Terminal animation lines ── */
const TERMINAL_LINES = [
    { text: '$ railway login', delay: 0, color: 'text-zinc-100' },
    { text: '🎉  Logged in as gourav@autodeploy.app', delay: 600, color: 'text-emerald-400' },
    { text: '$ railway up', delay: 1200, color: 'text-zinc-100' },
    { text: '⬢  Detecting framework...', delay: 1800, color: 'text-violet-400' },
    { text: '✓  Next.js detected', delay: 2400, color: 'text-emerald-400' },
    { text: '⬢  Building...', delay: 3000, color: 'text-violet-400' },
    { text: '✓  Build complete in 18s', delay: 3600, color: 'text-emerald-400' },
    { text: '⬢  Deploying to production...', delay: 4200, color: 'text-violet-400' },
    { text: '✓  Live → https://my-app.up.railway.app', delay: 4800, color: 'text-emerald-400' },
];

/* ─── Feature cards ── */
const FEATURES = [
    { icon: <Zap className="w-5 h-5" />, title: 'Instant Deploys', body: 'Push to GitHub and your app is live in seconds. Zero config, zero friction.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Global Network', body: 'Traffic routed to the edge. Your app is fast everywhere, always.' },
    { icon: <Database className="w-5 h-5" />, title: 'Managed Databases', body: 'Postgres, Redis, MySQL — provisioned in one click. Backups included.' },
    { icon: <GitBranch className="w-5 h-5" />, title: 'Preview Environments', body: 'Every pull request gets its own live URL automatically.' },
    { icon: <RefreshCw className="w-5 h-5" />, title: 'Instant Rollbacks', body: 'Something went wrong? Roll back to any deployment in one click.' },
    { icon: <Lock className="w-5 h-5" />, title: 'Private Networking', body: 'Services communicate securely over a private network with zero config.' },
    { icon: <BarChart2 className="w-5 h-5" />, title: 'Built-in Metrics', body: 'CPU, memory, and request metrics out of the box. No Datadog needed.' },
    { icon: <Cpu className="w-5 h-5" />, title: 'Autoscaling', body: 'Scale to zero when idle, burst to handle any traffic spike automatically.' },
];

function TerminalDemo() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (visibleLines >= TERMINAL_LINES.length) return;
        const t = setTimeout(() => setVisibleLines(v => v + 1), TERMINAL_LINES[visibleLines]?.delay || 600);
        return () => clearTimeout(t);
    }, [visibleLines]);

    // Restart animation
    useEffect(() => {
        const t = setTimeout(() => setVisibleLines(0), 7000);
        return () => clearTimeout(t);
    }, [visibleLines]);

    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 font-mono text-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-zinc-600">Terminal</span>
            </div>
            <div className="p-5 min-h-[240px] space-y-1">
                {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className={`${line.color} leading-6`}>{line.text}</div>
                ))}
                <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse align-middle" />
            </div>
        </div>
    );
}

export default function LandingPage() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* ─── NAV ─── */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-16 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-700 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-white text-lg tracking-tight">AutoDeploy</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-1">
                        {['Product', 'Pricing', 'Docs', 'Blog', 'Changelog'].map(l => (
                            <button key={l} className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">{l}</button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">Log in</Link>
                    <Link href="/register" className="text-sm bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-zinc-100 transition-all">
                        Deploy now
                    </Link>
                </div>
            </nav>

            {/* ─── HERO ─── */}
            <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-20"
                        style={{ background: 'radial-gradient(circle, #7c3aed 0%, #4c1d95 40%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 border border-zinc-700/60 bg-zinc-900/60 backdrop-blur px-4 py-1.5 rounded-full text-xs text-zinc-400 mb-8">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        Trusted by 50,000+ developers worldwide
                        <ChevronRight className="w-3 h-3" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] mb-6">
                        <span className="text-white">Infrastructure,</span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Simplified.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        AutoDeploy is the fastest way to go from code to production.
                        Connect your repo and ship — we handle the rest.
                    </p>

                    <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
                        <Link href="/register"
                            className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-3.5 rounded-xl hover:bg-zinc-100 transition-all shadow-lg shadow-white/10 text-sm">
                            Start Deploying <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/login"
                            className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-semibold px-7 py-3.5 rounded-xl transition-all text-sm">
                            <Github className="w-4 h-4" /> Login with GitHub
                        </Link>
                    </div>
                    <p className="text-xs text-zinc-600">Free to start • No credit card required</p>
                </div>
            </section>

            {/* ─── TERMINAL + SERVICE GRAPH ─── */}
            <section className="px-6 md:px-16 pb-24 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {/* Terminal */}
                    <TerminalDemo />

                    {/* Service canvas */}
                    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            <span className="ml-3 text-xs text-zinc-600">my-app / production</span>
                        </div>
                        <div className="p-5 grid grid-cols-2 gap-3">
                            {[
                                { name: 'backend', type: 'Node.js', status: 'Running', dot: 'bg-emerald-500' },
                                { name: 'frontend', type: 'Next.js', status: 'Deployed', dot: 'bg-violet-500' },
                                { name: 'postgres', type: 'PostgreSQL', status: 'Running', dot: 'bg-emerald-500' },
                                { name: 'redis', type: 'Redis', status: 'Running', dot: 'bg-emerald-500' },
                            ].map(s => (
                                <div key={s.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white">{s.name}</span>
                                        <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
                                    </div>
                                    <p className="text-[11px] text-zinc-500 mb-1">{s.type}</p>
                                    <p className="text-[11px] text-emerald-500 font-medium">{s.status}</p>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 pb-5">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-zinc-500 mb-0.5">Live URL</p>
                                    <p className="text-sm text-violet-400 font-mono">my-app.up.autodeploy.app</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Live
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── LOGOS ─── */}
            <section className="py-16 border-y border-white/[0.04] bg-[#070707]">
                <p className="text-center text-xs text-zinc-600 uppercase tracking-[0.2em] mb-10">Trusted by teams at</p>
                <div className="overflow-hidden">
                    <div className="flex gap-16 whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
                        {[...COMPANIES, ...COMPANIES].map((c, i) => (
                            <span key={i} className="text-zinc-700 font-semibold text-base hover:text-zinc-500 transition-colors cursor-default shrink-0">{c}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── DEPLOY IN 3 STEPS ─── */}
            <section className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs text-violet-500 font-bold uppercase tracking-widest mb-3">Simple by design</p>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Deploy in 3 clicks</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4 relative">
                    {/* Connector lines */}
                    <div className="hidden md:block absolute top-10 left-[calc(33%-24px)] right-[calc(33%-24px)] h-px bg-gradient-to-r from-zinc-800 via-violet-500/40 to-zinc-800" />
                    {[
                        { n: '1', icon: <Github className="w-6 h-6" />, title: 'Connect GitHub', body: 'Link your repository in one click. We support GitHub, GitLab, and Bitbucket.' },
                        { n: '2', icon: <Zap className="w-6 h-6" />, title: 'Auto-configure', body: 'We detect your stack, set env vars, and wire everything up automatically.' },
                        { n: '3', icon: <Globe className="w-6 h-6" />, title: 'Go live', body: 'Your app is live on a global edge network with a TLS-secured URL.' },
                    ].map(step => (
                        <div key={step.n} className="relative bg-[#0e0e0e] border border-zinc-800/80 rounded-2xl p-8 hover:border-violet-500/30 transition-all group">
                            <div className="absolute -top-3 left-6 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center text-xs font-black text-white">{step.n}</div>
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center text-zinc-400 mb-5 group-hover:border-violet-500/40 group-hover:text-violet-400 transition-all">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURE GRID ─── */}
            <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/[0.04]">
                <div className="text-center mb-16">
                    <p className="text-xs text-violet-500 font-bold uppercase tracking-widest mb-3">Everything you need</p>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">The platform does the heavy lifting</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {FEATURES.map((f, i) => (
                        <div key={i} className="bg-[#0e0e0e] border border-zinc-800/80 rounded-2xl p-6 hover:border-zinc-600 hover:bg-[#111] transition-all group cursor-default">
                            <div className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center text-zinc-500 mb-4 group-hover:border-violet-500/30 group-hover:text-violet-400 transition-all">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-white text-sm mb-2">{f.title}</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed">{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-32 px-6 text-center relative overflow-hidden border-t border-white/[0.04]">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(109,40,217,0.12) 0%, transparent 70%)' }} />
                <div className="relative z-10 max-w-xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
                        Ready to ship?
                    </h2>
                    <p className="text-zinc-500 mb-10 leading-relaxed">
                        Join 50,000+ developers deploying faster with AutoDeploy. Start free, scale as you grow.
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Link href="/register" className="inline-flex items-center gap-2 bg-white text-black font-black px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all text-sm shadow-2xl shadow-white/10">
                            Start for free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/login" className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 font-semibold px-8 py-4 rounded-xl transition-all text-sm">
                            <Github className="w-4 h-4" /> GitHub login
                        </Link>
                    </div>
                    <p className="text-xs text-zinc-700 mt-6">No credit card required · Deploy in 60 seconds</p>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="border-t border-zinc-900 py-12 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-700 rounded-md flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                                <span className="font-black text-white">AutoDeploy</span>
                            </div>
                            <p className="text-xs text-zinc-600 max-w-xs">The cloud platform built for developers who value speed, simplicity, and reliability.</p>
                        </div>
                        <div className="grid grid-cols-3 gap-12 text-sm">
                            {[
                                { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
                                { title: 'Developers', links: ['Docs', 'API Reference', 'CLI', 'Status'] },
                                { title: 'Company', links: ['Blog', 'About', 'Careers', 'Privacy'] },
                            ].map(col => (
                                <div key={col.title}>
                                    <p className="text-zinc-400 font-semibold mb-3">{col.title}</p>
                                    <div className="space-y-2">
                                        {col.links.map(l => <button key={l} className="block text-zinc-600 hover:text-zinc-300 transition-colors text-xs">{l}</button>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 pt-6 border-t border-zinc-900 flex items-center justify-between">
                        <p className="text-xs text-zinc-700">© 2025 AutoDeploy. All rights reserved.</p>
                        <p className="text-xs text-zinc-700">Made with ♥ for developers</p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
        </div>
    );
}
