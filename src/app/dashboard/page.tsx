'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Grid3x3, Plus, MoreVertical, AlertCircle, CheckCircle2, Clock,
    GitBranch, Code2, Database, Zap, Settings, Share2, Eye, Activity,
    ChevronDown, Cpu, HardDrive, Network, TrendingUp, LogOut, Bell,
    Menu, X
} from 'lucide-react';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('architecture');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const services = [
        {
            id: 'backend',
            name: 'backend',
            icon: <Code2 className="w-5 h-5" />,
            status: 'high-cpu',
            statusText: 'High CPU usage',
            cpu: '85%',
            memory: '2.1GB',
            deployedBy: 'CLI',
            lastDeploy: '2 days ago',
        },
        {
            id: 'postgres',
            name: 'postgres',
            icon: <Database className="w-5 h-5" />,
            status: 'deployed',
            statusText: 'Just deployed',
            cpu: '12%',
            memory: '512MB',
            deployedBy: 'GitHub',
            volume: 'pg-data',
        },
        {
            id: 'redis',
            name: 'redis',
            icon: <Zap className="w-5 h-5" />,
            status: 'running',
            statusText: 'Running',
            cpu: '5%',
            memory: '256MB',
            deployedBy: 'CLI',
        },
    ];

    const projects = [
        { name: 'gravy-truck', env: 'production', services: 8 },
        { name: 'buildo-api', env: 'staging', services: 5 },
        { name: 'web-app', env: 'development', services: 3 },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'deployed': return 'text-emerald-400';
            case 'running': return 'text-emerald-400';
            case 'high-cpu': return 'text-red-400';
            case 'building': return 'text-amber-400';
            default: return 'text-zinc-400';
        }
    };

    const getStatusBg = (status: string) => {
        switch(status) {
            case 'deployed': return 'bg-emerald-500/10';
            case 'running': return 'bg-emerald-500/10';
            case 'high-cpu': return 'bg-red-500/10';
            case 'building': return 'bg-amber-500/10';
            default: return 'bg-zinc-500/10';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Top Navigation */}
            <nav className="h-16 border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-xl flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-700 rounded flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold hidden sm:inline">Buildo</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400">
                            <ChevronDown className="w-4 h-4" />
                            <span>gravy-truck</span>
                            <ChevronDown className="w-4 h-4" />
                            <span className="text-zinc-600">production</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            <div className="flex h-[calc(100vh-4rem)]">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? 'w-16' : 'hidden lg:w-16'} border-r border-zinc-800 bg-[#0a0a0a] flex flex-col items-center py-4 gap-6`}>
                    <button className="p-3 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
                        <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button className="p-3 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
                        <Plus className="w-5 h-5" />
                    </button>
                    <div className="flex-1" />
                    <button className="p-3 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {/* Header with tabs and actions */}
                    <div className="border-b border-zinc-800 bg-[#0a0a0a]/50 sticky top-0 z-10">
                        <div className="px-8 py-4 flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-black">gravy-truck</h1>
                                <p className="text-sm text-zinc-500">production</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/50">
                                    <AlertCircle className="w-4 h-4 text-orange-400" />
                                    <span className="text-sm text-orange-300">1 unsapped change</span>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm transition-colors">
                                    Details
                                </button>
                                <button className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg> Deploy
                                </button>
                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="px-8 flex items-center gap-8 border-t border-zinc-800">
                            {[
                                { id: 'architecture', label: 'Architecture', icon: Grid3x3 },
                                { id: 'observability', label: 'Observability', icon: Eye },
                                { id: 'logs', label: 'Logs', icon: Code2 },
                                { id: 'settings', label: 'Settings', icon: Settings },
                                { id: 'share', label: 'Share', icon: Share2 },
                            ].map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-1 py-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-violet-500 text-white'
                                                : 'border-transparent text-zinc-500 hover:text-zinc-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {activeTab === 'architecture' && (
                            <div>
                                <h2 className="text-xl font-bold mb-8">Services</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {services.map(service => (
                                        <div
                                            key={service.id}
                                            onClick={() => setSelectedService(service.id)}
                                            className={`p-6 rounded-xl border transition-all cursor-pointer ${
                                                selectedService === service.id
                                                    ? 'border-violet-500 bg-violet-500/10'
                                                    : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-white/5">
                                                        {service.icon}
                                                    </div>
                                                    <span className="font-semibold">{service.name}</span>
                                                </div>
                                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4 text-zinc-600" />
                                                </button>
                                            </div>

                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusBg(service.status)}`}>
                                                {service.status === 'high-cpu' ? (
                                                    <AlertCircle className={`w-3 h-3 ${getStatusColor(service.status)}`} />
                                                ) : (
                                                    <CheckCircle2 className={`w-3 h-3 ${getStatusColor(service.status)}`} />
                                                )}
                                                <span className={getStatusColor(service.status)}>{service.statusText}</span>
                                            </div>

                                            <div className="space-y-2 text-sm text-zinc-400">
                                                <div className="flex justify-between">
                                                    <span className="flex items-center gap-2">
                                                        <Cpu className="w-4 h-4" /> CPU
                                                    </span>
                                                    <span className="text-white">{service.cpu}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="flex items-center gap-2">
                                                        <HardDrive className="w-4 h-4" /> Memory
                                                    </span>
                                                    <span className="text-white">{service.memory}</span>
                                                </div>
                                                {service.volume && (
                                                    <div className="flex justify-between">
                                                        <span className="flex items-center gap-2">
                                                            📦 Volume
                                                        </span>
                                                        <span className="text-white text-xs">{service.volume}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'observability' && (
                            <div>
                                <h2 className="text-xl font-bold mb-8">Monitoring</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'CPU Usage', value: '34%', trend: 'up' },
                                        { label: 'Memory Usage', value: '2.8GB', trend: 'down' },
                                        { label: 'Network I/O', value: '15MB/s', trend: 'up' },
                                        { label: 'Error Rate', value: '0.2%', trend: 'down' },
                                    ].map((metric, idx) => (
                                        <div key={idx} className="p-4 rounded-lg border border-zinc-700 bg-zinc-900/50">
                                            <p className="text-sm text-zinc-500 mb-2">{metric.label}</p>
                                            <p className="text-2xl font-bold flex items-center gap-2">
                                                {metric.value}
                                                <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`} />
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'logs' && (
                            <div>
                                <h2 className="text-xl font-bold mb-8">Logs</h2>
                                <div className="p-4 rounded-lg border border-zinc-700 bg-zinc-950 font-mono text-sm">
                                    <div className="text-zinc-500">
                                        <div>2024-03-16 14:32:15 [backend] Starting server...</div>
                                        <div className="text-emerald-400">2024-03-16 14:32:16 [backend] ✓ Server listening on port 3000</div>
                                        <div>2024-03-16 14:32:17 [postgres] Connected to database</div>
                                        <div className="text-amber-400">2024-03-16 14:32:20 [backend] High memory usage detected</div>
                                        <div>2024-03-16 14:32:21 [redis] Cache initialized</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div>
                                <h2 className="text-xl font-bold mb-8">Settings</h2>
                                <div className="space-y-4 max-w-2xl">
                                    {[
                                        { label: 'Environment', value: 'production' },
                                        { label: 'Region', value: 'US East 1' },
                                        { label: 'Autoscaling', value: 'Enabled' },
                                    ].map((setting, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-zinc-700 bg-zinc-900/50">
                                            <span className="text-sm font-medium">{setting.label}</span>
                                            <span className="text-sm text-zinc-400">{setting.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'share' && (
                            <div>
                                <h2 className="text-xl font-bold mb-8">Share</h2>
                                <div className="max-w-2xl p-6 rounded-lg border border-zinc-700 bg-zinc-900/50">
                                    <p className="text-sm text-zinc-400 mb-4">Share this project with your team</p>
                                    <button className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold transition-colors">
                                        Generate Share Link
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Activity */}
                <div className="hidden xl:flex w-80 border-l border-zinc-800 bg-[#0a0a0a]/50 flex-col">
                    <div className="border-b border-zinc-800 p-6 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        <h3 className="font-semibold">Activity</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-6 space-y-4">
                        {[
                            { time: '2 minutes ago', action: 'Deployed backend', status: 'success' },
                            { time: '15 minutes ago', action: 'Created postgres Volume', status: 'success' },
                            { time: '1 hour ago', action: 'Updated environment', status: 'success' },
                            { time: '2 hours ago', action: 'Scaled to 3 replicas', status: 'success' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-sm">
                                <p className="text-zinc-400">{item.time}</p>
                                <p className="text-white mt-1">{item.action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Tabs */}
            <div className="hidden lg:flex fixed bottom-0 left-16 right-0 h-12 border-t border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="flex items-center gap-12 px-8">
                    {['Deploy', 'Network', 'Scale', 'Monitor', 'Evolve'].map(tab => (
                        <button
                            key={tab}
                            className="h-full text-sm font-medium text-zinc-500 hover:text-white transition-colors border-b-2 border-transparent hover:border-violet-500"
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ArrowUp() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
    );
}
