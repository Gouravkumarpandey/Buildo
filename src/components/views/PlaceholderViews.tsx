'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Zap, Eye, Shield, Globe, Puzzle, Database, Flag, Bot, Cpu, Box, TrendingUp, CheckCircle2, XCircle, Rocket, Clock, GithubIcon } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/* ── Reusable upgrade card ── */
function UpgradeCard({ icon, title, description, feature }: {
    icon: React.ReactNode; title: string; description: string; feature: string;
}) {
    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto pt-16 text-center">
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-400">
                    {icon}
                </div>
                <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>
                <p className="text-zinc-500 mb-8 leading-relaxed max-w-md mx-auto">{description}</p>
                <div className="flex items-center justify-center gap-3">
                    <button className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-100 transition-all">
                        Upgrade to Pro
                    </button>
                    <button className="px-6 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:border-zinc-500 transition-all">
                        Learn more about {feature}
                    </button>
                </div>
                <p className="text-xs text-zinc-600 mt-6">Available on Pro and Enterprise plans</p>
            </div>
        </div>
    );
}

export function SpeedInsightsView() {
    return <UpgradeCard icon={<Zap className="w-8 h-8" />} title="Speed Insights" description="Measure real-world performance of your deployments. Get Core Web Vitals data from actual visitors, broken down by page and country." feature="Speed Insights" />;
}

export function ObservabilityView() {
    return <UpgradeCard icon={<Eye className="w-8 h-8" />} title="Observability" description="Monitor, debug, and understand your deployments with logs, traces, and metrics — all in one place. Set up alerts for anomalies before they impact users." feature="Observability" />;
}

export function FirewallView() {
    return <UpgradeCard icon={<Shield className="w-8 h-8" />} title="Firewall" description="Protect your deployments with a managed Web Application Firewall. Block malicious traffic, set rate limits, and configure IP allow/deny lists." feature="Firewall" />;
}

export function DomainsView() {
    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-bold text-white mb-1">Domains</h1>
                <p className="text-sm text-zinc-500 mb-6">Manage custom domains for your deployments</p>
                <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-300">Custom Domains</span>
                        <button className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                            <span>+ Add Domain</span>
                        </button>
                    </div>
                    <div className="p-12 text-center">
                        <Globe className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                        <p className="text-white font-medium mb-1">No custom domains yet</p>
                        <p className="text-sm text-zinc-500">Add a domain to point to your deployments.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IntegrationsView() {
    const integrations = [
        { name: 'GitHub', icon: '🐙', description: 'Connect repositories and trigger deployments on push.', connected: true, category: 'Source Control' },
        { name: 'Slack', icon: '💬', description: 'Get deployment notifications in your Slack channels.', connected: false, category: 'Notifications' },
        { name: 'Datadog', icon: '🐕', description: 'Send metrics, logs and traces to Datadog.', connected: false, category: 'Monitoring' },
        { name: 'Sentry', icon: '🔍', description: 'Track errors and performance issues automatically.', connected: false, category: 'Error Tracking' },
        { name: 'PlanetScale', icon: '🌐', description: 'Serverless MySQL platform for scalable databases.', connected: false, category: 'Database' },
        { name: 'Supabase', icon: '⚡', description: 'Open source Firebase alternative with Postgres.', connected: false, category: 'Database' },
    ];
    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-bold text-white mb-1">Integrations</h1>
                <p className="text-sm text-zinc-500 mb-6">Connect your favorite tools to AutoDeploy</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {integrations.map(i => (
                        <div key={i.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{i.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{i.name}</p>
                                        <p className="text-xs text-zinc-500">{i.category}</p>
                                    </div>
                                </div>
                                {i.connected && (
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">Connected</span>
                                )}
                            </div>
                            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">{i.description}</p>
                            <button className={`w-full py-2 text-xs font-medium rounded-lg transition-all ${i.connected ? 'border border-zinc-700 text-zinc-400 hover:border-zinc-500' : 'border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500'}`}>
                                {i.connected ? 'Manage' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function StorageView() {
    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-bold text-white mb-1">Storage</h1>
                <p className="text-sm text-zinc-500 mb-6">Managed databases and file storage for your projects</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { name: 'KV', icon: '⚡', desc: 'Durable global Redis-compatible storage for low-latency data.' },
                        { name: 'Postgres', icon: '🐘', desc: 'Serverless SQL database powered by Neon.' },
                        { name: 'Blob', icon: '🗂️', desc: 'Scalable file storage optimized for static assets.' },
                        { name: 'Edge Config', icon: '🔧', desc: 'Ultra-low latency data store for flags and config.' },
                    ].map(s => (
                        <div key={s.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{s.icon}</span>
                                <p className="text-sm font-semibold text-white">{s.name}</p>
                            </div>
                            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">{s.desc}</p>
                            <button className="w-full py-2 text-xs font-medium border border-zinc-700 text-zinc-300 rounded-lg hover:border-zinc-500 hover:text-white transition-all">
                                Create {s.name} Store
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function FlagsView() {
    return <UpgradeCard icon={<Flag className="w-8 h-8" />} title="Feature Flags" description="Ship features safely with runtime flags. Roll out incrementally, run A/B tests, and kill-switch any feature instantly without a redeploy." feature="Feature Flags" />;
}

export function AgentView() {
    return <UpgradeCard icon={<Bot className="w-8 h-8" />} title="Agent" description="An AI agent that can create, configure, and deploy projects on your behalf using natural language instructions." feature="Agent" />;
}

export function AIGatewayView() {
    return <UpgradeCard icon={<Cpu className="w-8 h-8" />} title="AI Gateway" description="A unified API gateway for all major AI model providers. Rate-limit, cache, and monitor your AI usage from one place." feature="AI Gateway" />;
}

export function SandboxesView() {
    return <UpgradeCard icon={<Box className="w-8 h-8" />} title="Sandboxes" description="Spin up isolated, ephemeral compute environments for testing, previewing, or running untrusted code — with full filesystem access." feature="Sandboxes" />;
}

/* ── Usage View (real data) ── */
interface Stats { total: number; success: number; failed: number; running: number; }
export function UsageView() {
    const [stats, setStats] = useState<Stats>({ total: 0, success: 0, failed: 0, running: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API}/api/stats`).then(r => setStats(r.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const rows = [
        { label: 'Total Deployments', value: stats.total, max: 100, unit: '' },
        { label: 'Successful Deployments', value: stats.success, max: 100, unit: '' },
        { label: 'Failed Deployments', value: stats.failed, max: 100, unit: '' },
        { label: 'Currently Running', value: stats.running, max: 10, unit: '' },
    ];

    return (
        <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-bold text-white mb-1">Usage</h1>
                <p className="text-sm text-zinc-500 mb-6">Deployment usage across your account • last 30 days</p>
                {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-zinc-500 w-6 h-6" /></div> : (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">Resources</span>
                            <button className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-full transition-colors">Upgrade Plan</button>
                        </div>
                        <div className="divide-y divide-zinc-800">
                            {rows.map(row => (
                                <div key={row.label} className="px-5 py-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-zinc-300">{row.label}</span>
                                        <span className="text-white font-mono font-medium">{row.value} / {row.max}{row.unit}</span>
                                    </div>
                                    <div className="h-1.5 bg-zinc-800 rounded-full">
                                        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                                            style={{ width: `${Math.min(100, (row.value / row.max) * 100)}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
