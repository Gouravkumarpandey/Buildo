'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  ArrowRight, Github, Zap, Globe, Shield, CheckCircle2,
  Code2, Rocket, Gauge, Server, Database, Sparkles,
  GitBranch, Terminal, Mail, ExternalLink, Star, Heart,
} from 'lucide-react';
import { NeoButton } from '@/components/Neo/NeoButton';
import { NeoCard } from '@/components/Neo/NeoCard';
import { NeoBadge } from '@/components/Neo/NeoBadge';
import { NeoHero, NeoSectionHeader } from '@/components/Neo/NeoHero';
import { NeoCircle, NeoSquare, NeoTriangle } from '@/components/Neo/NeoShapes';


const FEATURES = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Deploy to production in seconds with zero configuration needed.',
  },
  {
    icon: '🚀',
    title: 'Scale Instantly',
    description: 'Auto-scaling infrastructure that grows with your traffic.',
  },
  {
    icon: '🔒',
    title: 'Built-in Security',
    description: 'Enterprise-grade security with HTTPS, DDoS protection & more.',
  },
  {
    icon: '🌍',
    title: 'Global CDN',
    description: 'Servers in 300+ cities for fastest content delivery worldwide.',
  },
  {
    icon: '💾',
    title: 'Data Storage',
    description: 'Integrated databases & file storage with automatic backups.',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Real-time monitoring and detailed insights into your deployment.',
  },
];

const STEPS = [
  {
    num: 1,
    title: 'Connect Your Code',
    description: 'Link your GitHub, GitLab, or deploy directly from CLI.',
    icon: <GitBranch className="w-8 h-8" />,
  },
  {
    num: 2,
    title: 'Configure Once',
    description: 'Set environment variables and select your deployment region.',
    icon: <Gauge className="w-8 h-8" />,
  },
  {
    num: 3,
    title: 'Ship to World',
    description: 'Your app is live globally with automatic optimizations.',
    icon: <Rocket className="w-8 h-8" />,
  },
];

const PRICING_PLANS = [
  {
    name: 'Starter',
    price: 'FREE',
    description: 'Perfect for learning and experimentation',
    features: ['1 project', '512MB RAM', '1GB storage', 'Community support'],
    cta: 'Get Started',
    badge: false,
  },
  {
    name: 'Professional',
    price: '$29',
    description: 'For growing teams and production apps',
    features: ['Unlimited projects', '4GB RAM', '100GB storage', '24/7 support', 'Staging environment', 'Analytics'],
    cta: 'Start Free Trial',
    badge: true,
    badgeText: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale deployments',
    features: ['Everything in Pro', 'Custom limits', 'Dedicated support', 'SLA guarantee', 'Custom integrations'],
    cta: 'Contact Sales',
    badge: false,
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden">
      {/* Fixed navigation with blue top border */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-4 border-black dark:border-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-900 text-2xl text-black dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-neo border-2 border-black dark:border-white flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Buildo
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {['Features', 'Pricing', 'Docs'].map((item) => (
              <button key={item} className="px-4 py-2 font-display font-700 uppercase text-xs tracking-widest hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="font-display font-700 uppercase text-xs tracking-widest px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              Sign In
            </Link>
            <NeoButton variant="primary" size="sm" as={Link} href="/register">
              Start Free
            </NeoButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <NeoHero
        title={
          <>
            Deploy Your {' '}
            <span className="text-blue-600">Code</span>
            {' '} In Seconds
          </>
        }
        subtitle="Welcome to Buildo"
        description="The fastest way to deploy web apps. Git push. We handle the rest. No DevOps required."
        bgColor="blue"
        showDecorations={true}
        cta={{
          text: 'Start Building →',
          href: '/register',
        }}
        secondaryCta={{
          text: 'View Demo',
          onClick: () => {},
        }}
      />

      {/* TRUSTED BY SECTION */}
      <section className="py-12 px-4 md:px-8 border-b-4 border-black dark:border-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-center font-display font-700 uppercase text-xs tracking-widest text-gray-600 dark:text-gray-400 mb-8">
            Trusted by leading companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="flex items-center justify-center h-12 bg-gray-100 dark:bg-gray-900 border-2 border-black dark:border-white rounded-neo">
                <span className="font-display font-800">COMPANY</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-4 md:px-8 border-b-4 border-black dark:border-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <NeoBadge variant="primary" size="md">NEW FEATURES</NeoBadge>
            <h2 className="text-5xl md:text-6xl font-display font-900 mt-6 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              All the tools to build, deploy, and scale modern web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <NeoCard key={idx} padding="lg" shadow="md" bgColor="white">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-800 text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{feature.description}</p>
              </NeoCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 px-4 md:px-8 bg-gray-100 dark:bg-gray-900 border-b-4 border-black dark:border-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <NeoBadge variant="secondary" size="md">HOW IT WORKS</NeoBadge>
            <h2 className="text-5xl md:text-6xl font-display font-900 mt-6 mb-4">
              Deploy in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative">
                <NeoCard padding="lg" shadow="lg" bgColor={idx % 2 === 0 ? 'white' : 'blue'}>
                  <div className="absolute -top-8 -left-4 w-16 h-16 bg-orange-600 border-4 border-black dark:border-white rounded-neo flex items-center justify-center font-display font-900 text-2xl text-white shadow-neo">
                    {step.num}
                  </div>
                  
                  <div className={`mb-4 ${idx % 2 === 0 ? 'text-blue-600' : 'text-white'}`}>
                    {step.icon}
                  </div>
                  
                  <h3 className={`font-display font-800 text-xl mb-2 ${idx % 2 === 0 ? 'text-black' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className={`${idx % 2 === 0 ? 'text-gray-600' : 'text-gray-100'}`}>
                    {step.description}
                  </p>
                </NeoCard>

                {/* Connecting arrow (visible on larger screens) */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 text-2xl font-display font-900 text-black dark:text-white">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 px-4 md:px-8 border-b-4 border-black dark:border-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <NeoBadge variant="pink" size="md">PRICING</NeoBadge>
            <h2 className="text-5xl md:text-6xl font-display font-900 mt-6 mb-4">
              Simple, Transparent
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan, idx) => (
              <div key={idx} className="relative group">
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <NeoBadge variant="pink" size="sm">
                      {plan.badgeText}
                    </NeoBadge>
                  </div>
                )}
                
                <NeoCard
                  padding="lg"
                  shadow={plan.badge ? 'lg' : 'md'}
                  bgColor={plan.badge ? 'pink' : 'white'}
                  className={plan.badge ? 'scale-105 md:scale-110 pt-12' : 'pt-6'}
                >
                  <h3 className={`font-display font-800 text-2xl mb-2 ${plan.badge ? 'text-white' : 'text-black dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className={`text-4xl font-display font-900 ${plan.badge ? 'text-white' : 'text-black dark:text-white'}`}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className={`text-sm font-medium ml-2 ${plan.badge ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        /month
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-6 ${plan.badge ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.description}
                  </p>
                  
                  <NeoButton
                    variant={plan.badge ? 'secondary' : 'primary'}
                    size="md"
                    className="w-full mb-6"
                  >
                    {plan.cta}
                  </NeoButton>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm font-medium ${plan.badge ? 'text-white' : 'text-black dark:text-white'}`}>
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </NeoCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 px-4 md:px-8 bg-black text-white border-b-4 border-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Deployments', value: '10M+', emoji: '🚀' },
              { label: 'Products Built', value: '500K+', emoji: '💡' },
              { label: 'Global Users', value: '2M+', emoji: '🌍' },
            ].map((stat, idx) => (
              <NeoCard key={idx} padding="lg" shadow="lg" bgColor="white" className="text-center text-black transform hover:scale-105 transition-transform">
                <div className="text-5xl mb-4">{stat.emoji}</div>
                <p className="text-4xl font-display font-900 mb-2">{stat.value}</p>
                <p className="text-sm font-display font-700 uppercase tracking-widest text-gray-600">
                  {stat.label}
                </p>
              </NeoCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 md:px-8 border-b-4 border-black dark:border-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-display font-900 mb-6">
            Ready to Deploy?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building amazing apps on Buildo. Start for free, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NeoButton variant="primary" size="lg">
              Start Building →
            </NeoButton>
            <NeoButton variant="secondary" size="lg">
              Schedule Demo
            </NeoButton>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
            No credit card required • Completely free to start
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t-4 border-black dark:border-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Status'] },
              { title: 'Developers', links: ['Documentation', 'API', 'Guides', 'Community'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'License', 'Contact'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-display font-800 mb-4 text-black dark:text-white">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-black dark:border-white pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              © 2024 Buildo. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {[Github, Mail].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 border-2 border-black dark:border-white rounded-neo hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
            {/* Scroll progress bar */}
            <div 
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600 z-50 transition-all"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* ─── NAV ─── */}
            <nav className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 md:px-16 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-700 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-white text-lg tracking-tight">Buildo</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-1">
                        {['Features', 'Pricing', 'Docs', 'Blog', 'Status'].map(l => (
                            <button key={l} className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">{l}</button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">Sign in</Link>
                    <Link href="/register" className="text-sm bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-zinc-100 transition-all">
                        Get started
                    </Link>
                </div>
            </nav>

            {/* ─── HERO ─── */}
            <section className="pt-32 pb-20 px-6 md:px-16 text-center relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px] opacity-20 animate-pulse-slow"
                        style={{ background: 'radial-gradient(circle, #7c3aed 0%, #4c1d95 40%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="animate-fadeInUp" style={{ animationDelay: '0s' }}>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
                            Push your ideas <br />
                            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                to the web
                            </span>
                        </h1>
                    </div>
                    
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-6 leading-relaxed">
                            Build your way. Ship on one platform.
                        </p>
                    </div>

                    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <p className="text-base text-zinc-500 max-w-2xl mx-auto mb-12">
                            Create with AI or code, deploy instantly on production infrastructure. One platform to build and ship.
                        </p>
                    </div>

                    <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
                            <Link href="/register"
                                className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-zinc-100 transition-all text-base hover:scale-105 transform duration-200">
                                Start building → <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-semibold px-8 py-4 rounded-lg transition-all text-base hover:scale-105 transform duration-200">
                                Talk to sales
                            </button>
                        </div>
                    </div>

                    {/* Trusted companies - Marquee */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                        <div className="overflow-hidden relative">
                            <div className="flex gap-12 w-fit animate-marquee">
                                {[...COMPANIES, ...COMPANIES].map((company, idx) => (
                                    <div key={idx} className="flex-shrink-0 min-w-fit">
                                        <p className="text-sm font-semibold text-zinc-500 whitespace-nowrap">{company}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section ref={statsRef.ref} className="py-20 px-6 md:px-16 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { label: 'Developers', value: '10M+' },
                            { label: 'Apps Deployed', value: '60M+' },
                            { label: 'Uptime', value: '99.99%' },
                        ].map((stat, idx) => (
                            <div key={stat.label} className={statsRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS (3-step workflow) ─── */}
            <section ref={workflowRef.ref} className="py-28 px-6 md:px-16 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-20 ${workflowRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Build your way. Ship on one platform.</h2>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            Every path runs on the same workflow and production infrastructure, powering millions of sites and apps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {WORKFLOW_STEPS.map((step, idx) => (
                            <div key={idx} className={workflowRef.isVisible ? 'animate-slideInLeft' : 'opacity-0'} style={{ animationDelay: `${idx * 0.1}s` }}>
                                {/* Step number */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-violet-500/50 hover:bg-violet-500/30 transition-colors">
                                        <span className="text-xl font-black text-violet-400">{step.num}</span>
                                    </div>
                                    <p className="text-sm font-bold text-violet-400 uppercase tracking-widest">Step {step.num}</p>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                                <p className="text-base text-zinc-400 leading-relaxed mb-8">{step.description}</p>

                                {/* Icon placeholder */}
                                <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 hover:border-violet-500/50 transition-colors group hover:bg-zinc-900/80">
                                    <div className="group-hover:scale-110 transition-transform duration-200">{step.icon}</div>
                                </div>

                                {/* Connector line */}
                                {idx < WORKFLOW_STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-20 -right-6 w-12 h-0.5 bg-gradient-to-r from-violet-500 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURES (Switchback style) ─── */}
            <section ref={featuresRef.ref} className="py-28 px-6 md:px-16 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto space-y-32">
                    {FEATURES.map((feature, idx) => (
                        <div key={idx} className={`grid md:grid-cols-2 gap-16 items-center ${feature.reverse ? 'md:[direction:rtl]' : ''} ${
                            featuresRef.isVisible ? (feature.reverse ? 'animate-slideInRight' : 'animate-slideInLeft') : 'opacity-0'
                        }`}>
                            {/* Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-6 hover:bg-violet-500/20 transition-colors">
                                    <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">{feature.title}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{feature.subtitle}</h2>
                                <p className="text-lg text-zinc-400 mb-8 leading-relaxed">{feature.description}</p>
                                
                                {/* Feature list */}
                                <ul className="space-y-3 mb-8">
                                    {feature.features.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300 group">
                                            <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/features" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors group">
                                    Explore {feature.title.toLowerCase()} → <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Demo/Image placeholder */}
                            <div className={`bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl aspect-square flex items-center justify-center border border-zinc-700 hover:border-violet-500/50 transition-colors ${feature.reverse ? 'md:[direction:ltr]' : ''} group`}>
                                <div className="text-center group-hover:scale-105 transition-transform duration-300">
                                    <div className="w-20 h-20 bg-violet-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-violet-500/30 group-hover:bg-violet-500/30 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <p className="text-sm text-zinc-500">[{feature.title} Demo]</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── PRODUCTION MONITORING ─── */}
            <section className="py-28 px-6 md:px-16 border-t border-white/[0.06] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(124, 58, 237, 0.05) 25%, rgba(124, 58, 237, 0.05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, 0.05) 75%, rgba(124, 58, 237, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(124, 58, 237, 0.05) 25%, rgba(124, 58, 237, 0.05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, 0.05) 75%, rgba(124, 58, 237, 0.05) 76%, transparent 77%, transparent)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Real-time Monitoring</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Production Dashboard</h2>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Monitor all your services with real-time metrics and instant status updates</p>
                    </div>

                    {/* Terminal command */}
                    <div className="mb-16 max-w-2xl">
                        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 font-mono text-sm">
                            <div className="text-green-400">$ git push</div>
                            <div className="text-zinc-400 mt-2">Deploying to production...</div>
                            <div className="text-green-400 mt-2">✓ All services deployed</div>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PRODUCTION_SERVICES.map((service, idx) => (
                            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group animate-scaleIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-violet-500/20 rounded flex items-center justify-center border border-violet-500/30">
                                            {service.icon}
                                        </div>
                                        <h3 className="font-semibold text-white">{service.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs font-semibold text-green-400">{service.status}</span>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {service.metrics.map((metric, i) => (
                                        <div key={i} className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
                                            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{metric.label}</p>
                                            <p className="text-sm font-semibold text-white">{metric.value}</p>
                                            {metric.percent && (
                                                <div className="mt-2 w-full bg-zinc-700 rounded-full h-1">
                                                    <div 
                                                        className="bg-gradient-to-r from-violet-500 to-purple-500 h-1 rounded-full"
                                                        style={{ width: `${metric.percent}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── USE CASES ─── */}
            <section ref={useCasesRef.ref} className="py-28 px-6 md:px-16 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-20 ${useCasesRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">For every kind of web app</h2>
                        <p className="text-lg text-zinc-400">Build everything from marketing sites to AI apps on one platform</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {USE_CASES.map((useCase, idx) => (
                            <div key={idx} className={`bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 hover:bg-zinc-900 transition-all group cursor-pointer ${
                                useCasesRef.isVisible ? 'animate-scaleIn' : 'opacity-0'
                            }`} style={{ animationDelay: `${idx * 0.05}s` }}>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors">{useCase.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── GETTING STARTED OPTIONS ─── */}
            <section ref={gettingStartedRef.ref} className="py-28 px-6 md:px-16 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-20 ${gettingStartedRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Start your way</h2>
                        <p className="text-lg text-zinc-400">Choose the workflow that fits how you work</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {GETTING_STARTED.map((option, idx) => (
                            <Link key={idx} href="/register" className={`bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-violet-500/50 hover:bg-zinc-900 transition-all group ${
                                gettingStartedRef.isVisible ? 'animate-slideInLeft' : 'opacity-0'
                            }`} style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-violet-500/30 transition-colors border border-violet-500/30 group-hover:scale-110 transform duration-200">
                                    {option.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{option.description}</p>
                                <span className="inline-flex items-center gap-2 text-violet-400 font-semibold group-hover:gap-3 transition-all">
                                    {option.cta} → <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section ref={testimonialsRef.ref} className="py-28 px-6 md:px-16 border-t border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-16 ${testimonialsRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                        <div className="inline-block bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Testimonial</span>
                        </div>
                        <p className="text-base text-zinc-500 mb-6">What builders are saying</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial, idx) => (
                            <div key={idx} className={`bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all group ${
                                testimonialsRef.isVisible ? 'animate-scaleIn' : 'opacity-0'
                            }`} style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 0.05}s` }} />
                                    ))}
                                </div>
                                <p className="text-base text-zinc-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-zinc-500">{testimonial.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section ref={ctaRef.ref} className="py-32 px-6 md:px-16 text-center relative overflow-hidden border-t border-white/[0.06]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-10 animate-pulse-slow"
                        style={{ background: 'radial-gradient(circle, #7c3aed 0%, #4c1d95 40%, transparent 70%)' }} />
                </div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className={ctaRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0s' }}>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                            A better future is<br />
                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">now boarding</span>
                        </h2>
                    </div>
                    
                    <div className={ctaRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.1s' }}>
                        <p className="text-xl text-zinc-400 mb-10">Deploy your first project today. No credit card required.</p>
                    </div>

                    <div className={ctaRef.isVisible ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-black font-bold px-10 py-4 rounded-lg hover:bg-zinc-100 transition-all text-base hover:scale-105 transform duration-200">
                                Get started free → <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-semibold px-10 py-4 rounded-lg transition-all text-base hover:scale-105 transform duration-200">
                                <Github className="w-5 h-5" /> Deploy from GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="border-t border-zinc-900 py-20 px-6 md:px-16 bg-zinc-950/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    {/* Newsletter */}
                    <div className="mb-16 pb-16 border-b border-zinc-800">
                        <h3 className="text-2xl font-bold mb-4">Stay up to date with Buildo news</h3>
                        <div className="flex gap-3 max-w-md group">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors group-hover:border-zinc-700 duration-200"
                            />
                            <button className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-zinc-100 transition-all hover:scale-105 transform duration-200">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Links grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
                        <div>
                            <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase">Product</p>
                            <div className="space-y-3">
                                {['Features', 'Pricing', 'Changelog', 'Roadmap'].map(l => (
                                    <button key={l} className="block text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 hover:translate-x-1 transform">{l}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase">Company</p>
                            <div className="space-y-3">
                                {['About', 'Blog', 'Careers', 'Status'].map(l => (
                                    <button key={l} className="block text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 hover:translate-x-1 transform">{l}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase">Developers</p>
                            <div className="space-y-3">
                                {['Docs', 'API', 'CLI', 'SDK'].map(l => (
                                    <button key={l} className="block text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 hover:translate-x-1 transform">{l}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase">Community</p>
                            <div className="space-y-3">
                                {['Discord', 'GitHub', 'Twitter', 'Forums'].map(l => (
                                    <button key={l} className="block text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 hover:translate-x-1 transform">{l}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase">Legal</p>
                            <div className="space-y-3">
                                {['Privacy', 'Terms', 'Trust Center', 'Support'].map(l => (
                                    <button key={l} className="block text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-200 hover:translate-x-1 transform">{l}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 group">
                            <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-700 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Zap className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-bold text-white">Buildo</span>
                        </div>
                        <p className="text-sm text-zinc-600">© 2026 Buildo. All rights reserved. Made with ♥ for developers</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
