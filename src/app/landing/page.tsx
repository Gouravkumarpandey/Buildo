'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

// Animated concentric-triangle logo (like Vercel's hero)
function VercelTriangle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animFrame: number;
        let progress = 0;

        const W = canvas.width;
        const H = canvas.height;

        function drawTriangle(scale: number, alpha: number) {
            if (!ctx) return;
            const cx = W / 2;
            const tip = H * 0.05;
            const baseY = H * 0.98;
            const halfBase = W * 0.45 * scale;

            ctx.beginPath();
            ctx.moveTo(cx, tip + (baseY - tip) * (1 - scale) * 0.5);
            ctx.lineTo(cx - halfBase, baseY - (baseY - tip) * (1 - scale) * 0.5);
            ctx.lineTo(cx + halfBase, baseY - (baseY - tip) * (1 - scale) * 0.5);
            ctx.closePath();

            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        function render() {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);
            progress += 0.004;

            const layers = 18;
            for (let i = 0; i < layers; i++) {
                const t = i / layers;
                const pulse = Math.sin(progress - t * 2) * 0.5 + 0.5;
                const scale = 0.12 + (1 - t) * 0.88;
                const alpha = (0.08 + pulse * 0.25) * (1 - t * 0.5);
                drawTriangle(scale, alpha);
            }

            // Solid outermost
            drawTriangle(1, 0.9);

            animFrame = requestAnimationFrame(render);
        }

        render();
        return () => cancelAnimationFrame(animFrame);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={340}
            height={300}
            className="opacity-90"
            style={{ filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.15))' }}
        />
    );
}

// Grid overlay background
function GridBackground() {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
                backgroundSize: '120px 120px',
            }}
        />
    );
}

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-black text-white overflow-hidden font-sans">
            {/* ─── NAVBAR ─── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 20h20L12 2z" />
                    </svg>
                    <span className="text-white font-semibold text-lg tracking-tight">AutoDeploy</span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
                    {['Products', 'Resources', 'Solutions', 'Enterprise', 'Pricing'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="hover:text-white transition-colors duration-200 flex items-center gap-1"
                        >
                            {item}
                            {['Products', 'Resources', 'Solutions'].includes(item) && (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-50">
                                    <path d="M5 7L1 3h8L5 7z" />
                                </svg>
                            )}
                        </a>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/login"
                        className="px-4 py-1.5 text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                        Log In
                    </Link>
                    <a
                        href="#"
                        className="px-4 py-1.5 text-sm text-zinc-300 border border-white/20 rounded-full hover:bg-white/5 transition-all"
                    >
                        Ask AI
                    </a>
                    <Link
                        href="/register"
                        className="px-4 py-1.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-zinc-100 transition-all"
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* ─── HERO SECTION ─── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
                <GridBackground />

                {/* Corner marker */}
                <div className="absolute top-20 left-6 md:left-20 text-white/20 text-xs">+</div>

                {/* Colorful gradient backdrop behind triangle */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[55%]"
                    style={{
                        background: `
              radial-gradient(ellipse 60% 70% at 20% 100%, rgba(29,78,216,0.85) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 50% 85%, rgba(16,185,129,0.5) 0%, transparent 50%),
              radial-gradient(ellipse 60% 70% at 80% 100%, rgba(185,28,28,0.85) 0%, transparent 60%)
            `,
                    }}
                />

                {/* Hero text */}
                <div className="relative z-10 flex flex-col items-center text-center px-4 mb-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-5">
                        Build and deploy on the{' '}
                        <span className="text-white">AI Cloud.</span>
                    </h1>
                    <p className="text-zinc-400 text-base md:text-xl max-w-xl leading-relaxed mb-10">
                        AutoDeploy provides the developer tools and cloud infrastructure
                        <br className="hidden md:block" />
                        to build, scale, and deploy a faster, more reliable web.
                    </p>

                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <Link
                            href="/register"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-zinc-100 shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 20h20L12 2z" />
                            </svg>
                            Start Deploying
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-3 border border-white/20 text-white font-semibold rounded-full text-sm hover:bg-white/5 transition-all hover:-translate-y-0.5"
                        >
                            Get a Demo
                        </Link>
                    </div>
                </div>

                {/* Triangle Visual */}
                <div className="relative z-10 mt-4">
                    <VercelTriangle />
                </div>
            </section>

            {/* ─── TAGLINE STRIP ─── */}
            <section className="relative bg-black py-14 border-t border-white/[0.05] overflow-hidden">
                <GridBackground />
                <div className="relative z-10 text-center">
                    <p className="text-white/80 text-lg md:text-2xl font-light tracking-wide">
                        Develop with your favorite tools{' '}
                        <span className="font-mono text-zinc-400">&gt;_</span>
                    </p>
                    <p className="text-white/80 text-lg md:text-2xl font-light tracking-wide mt-1">
                        Launch globally, instantly{' '}
                        <span className="inline-block">🌐</span>{' '}
                        Keep pushing{' '}
                        <span className="font-mono text-zinc-400">↑.</span>
                    </p>
                </div>
            </section>

            {/* ─── FEATURES SECTION ─── */}
            <section className="relative bg-black py-24 px-6 border-t border-white/[0.05]">
                <GridBackground />
                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                        Everything you need to ship faster
                    </h2>
                    <p className="text-zinc-500 text-center text-lg mb-16 max-w-2xl mx-auto">
                        From first commit to global production. AutoDeploy handles the infrastructure so you can focus on building.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                        {[
                            {
                                icon: '⚡',
                                title: 'Instant Deploys',
                                desc: 'Push to GitHub and your app is live in seconds. Zero config, zero friction.',
                            },
                            {
                                icon: '🌍',
                                title: 'Global Edge Network',
                                desc: 'Your deployments are served from the closest edge location worldwide.',
                            },
                            {
                                icon: '📊',
                                title: 'Live Deployment Logs',
                                desc: 'Watch your build stream in real-time. Debug instantly with full log history.',
                            },
                            {
                                icon: '🐳',
                                title: 'Docker Native',
                                desc: 'Containerize and deploy any stack. Full Docker support out of the box.',
                            },
                            {
                                icon: '🔄',
                                title: 'Rollback in 1 Click',
                                desc: 'Every deployment is snapshotted. Roll back to any version instantly.',
                            },
                            {
                                icon: '🔒',
                                title: 'Secure by Default',
                                desc: 'HTTPS everywhere, secret management, and GitHub OAuth baked in.',
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-black p-8 hover:bg-white/[0.03] transition-colors duration-300 group cursor-default"
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── STATS SECTION ─── */}
            <section className="relative bg-black py-20 px-6 border-t border-white/[0.05]">
                <GridBackground />
                <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    {[
                        { number: '10K+', label: 'Deployments' },
                        { number: '99.9%', label: 'Uptime SLA' },
                        { number: '<2s', label: 'Avg Deploy Time' },
                        { number: '50+', label: 'Global Regions' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-zinc-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA SECTION ─── */}
            <section className="relative bg-black py-28 px-6 border-t border-white/[0.05] overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)
            `,
                    }}
                />
                <GridBackground />
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Start deploying today.
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10">
                        Join developers shipping faster with AutoDeploy. Free to start. No credit card required.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link
                            href="/register"
                            className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full text-base hover:bg-zinc-100 shadow-2xl shadow-white/10 transition-all hover:-translate-y-0.5"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 20h20L12 2z" />
                            </svg>
                            Get Started Free
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full text-base hover:bg-white/5 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="bg-black border-t border-white/[0.06] px-6 py-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L2 20h20L12 2z" />
                            </svg>
                            <span className="text-white font-semibold">AutoDeploy</span>
                        </div>
                        <p className="text-zinc-600 text-sm max-w-xs">
                            The platform for modern developers. Deploy smarter, ship faster.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
                        {[
                            { title: 'Product', links: ['Features', 'Docs', 'Changelog', 'Pricing'] },
                            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
                            { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <p className="text-white font-semibold mb-3">{col.title}</p>
                                {col.links.map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="block text-zinc-500 hover:text-white transition-colors mb-2"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/[0.05] text-zinc-600 text-xs">
                    © 2026 AutoDeploy. All rights reserved.
                </div>
            </footer>
        </main>
    );
}
