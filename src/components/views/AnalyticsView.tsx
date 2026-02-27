'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, TrendingUp, CheckCircle2, XCircle, Rocket, Clock } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Deployment {
    _id: string; projectName: string; status: string; createdAt: string; timeTaken?: number;
}

export function AnalyticsView() {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API}/api/deployments?limit=100`)
            .then(r => setDeployments(r.data.deployments || r.data))
            .catch(() => { }).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-zinc-500 w-6 h-6" /></div>;

    const total = deployments.length;
    const success = deployments.filter(d => d.status === 'success').length;
    const failed = deployments.filter(d => d.status === 'failed').length;
    const avgTime = (() => {
        const timed = deployments.filter(d => d.timeTaken);
        return timed.length ? timed.reduce((a, d) => a + (d.timeTaken || 0), 0) / timed.length / 1000 : 0;
    })();
    const successRate = total ? Math.round((success / total) * 100) : 0;

    // Group by day (last 14 days)
    const dayMap: Record<string, { success: number; failed: number; total: number }> = {};
    const now = Date.now();
    for (let i = 13; i >= 0; i--) {
        const d = new Date(now - i * 86400000);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dayMap[key] = { success: 0, failed: 0, total: 0 };
    }
    deployments.forEach(d => {
        const key = new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dayMap[key]) {
            dayMap[key].total++;
            if (d.status === 'success') dayMap[key].success++;
            if (d.status === 'failed') dayMap[key].failed++;
        }
    });
    const days = Object.entries(dayMap);
    const maxDay = Math.max(...days.map(([, v]) => v.total), 1);

    // Top projects
    const projectCount: Record<string, number> = {};
    deployments.forEach(d => { projectCount[d.projectName] = (projectCount[d.projectName] || 0) + 1; });
    const topProjects = Object.entries(projectCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return (
        <div className="flex-1 p-6 min-w-0 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-xl font-bold text-white mb-1">Analytics</h1>
                <p className="text-sm text-zinc-500 mb-6">Deployment trends and performance insights</p>

                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total Deploys', value: total, icon: <Rocket className="w-4 h-4" />, color: 'text-indigo-400' },
                        { label: 'Success Rate', value: `${successRate}%`, icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-400' },
                        { label: 'Failed', value: failed, icon: <XCircle className="w-4 h-4" />, color: 'text-rose-400' },
                        { label: 'Avg Build Time', value: avgTime ? `${avgTime.toFixed(1)}s` : '—', icon: <Clock className="w-4 h-4" />, color: 'text-amber-400' },
                    ].map(card => (
                        <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                            <div className={`flex items-center gap-2 mb-2 ${card.color}`}>{card.icon}<span className="text-xs font-medium">{card.label}</span></div>
                            <div className="text-3xl font-bold text-white">{card.value}</div>
                        </div>
                    ))}
                </div>

                {/* Bar chart */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp className="w-4 h-4 text-zinc-500" />
                        <h2 className="text-sm font-semibold text-white">Deployments Last 14 Days</h2>
                    </div>
                    <div className="flex items-end gap-1.5 h-32">
                        {days.map(([label, data]) => (
                            <div key={label} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '100%' }}>
                                    <div
                                        className="w-full bg-emerald-500 rounded-t-sm"
                                        style={{ height: `${(data.success / maxDay) * 100}%`, minHeight: data.success > 0 ? 2 : 0 }}
                                        title={`${data.success} success`}
                                    />
                                    <div
                                        className="w-full bg-rose-500 rounded-t-sm"
                                        style={{ height: `${(data.failed / maxDay) * 100}%`, minHeight: data.failed > 0 ? 2 : 0 }}
                                        title={`${data.failed} failed`}
                                    />
                                </div>
                                <span className="text-[9px] text-zinc-600 whitespace-nowrap">{label.split(' ')[1]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                        <span className="flex items-center gap-1.5 text-xs text-zinc-500"><span className="w-2 h-2 rounded-sm bg-emerald-500" />Success</span>
                        <span className="flex items-center gap-1.5 text-xs text-zinc-500"><span className="w-2 h-2 rounded-sm bg-rose-500" />Failed</span>
                    </div>
                </div>

                {/* Top projects */}
                {topProjects.length > 0 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                        <h2 className="text-sm font-semibold text-white mb-4">Most Active Projects</h2>
                        <div className="space-y-3">
                            {topProjects.map(([name, count]) => (
                                <div key={name} className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                        {name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-zinc-300 font-medium">{name}</span>
                                            <span className="text-zinc-500">{count} deploys</span>
                                        </div>
                                        <div className="h-1 bg-zinc-800 rounded-full">
                                            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                                style={{ width: `${(count / (topProjects[0]?.[1] || 1)) * 100}%` }} />
                                        </div>
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
