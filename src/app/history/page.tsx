'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import {
    Activity, History, LayoutDashboard, GitBranch, LogOut, ExternalLink,
    RotateCcw, CheckCircle2, XCircle, Clock, Loader2, Terminal, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { LogsModal } from '@/components/LogsModal';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Deployment {
    _id: string;
    projectName: string;
    repoUrl: string;
    status: string;
    liveUrl?: string;
    createdAt: string;
    timeTaken?: number;
    deployTarget?: string;
}

const statusFilters = ['all', 'success', 'failed', 'running', 'cloning', 'building'];

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        pending: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        cloning: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        building: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        running: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        deploying: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    };
    const cls = map[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    const isActive = ['pending', 'cloning', 'building', 'running', 'deploying'].includes(status);
    return (
        <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tighter border ${cls}`}>
            {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
            {status}
        </span>
    );
};

export default function HistoryPage() {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [rollbackId, setRollbackId] = useState<string | null>(null);
    const [logsDeployment, setLogsDeployment] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [user, authLoading, router]);

    const fetchDeployments = async () => {
        try {
            const params = statusFilter !== 'all' ? `?status=${statusFilter}&limit=50` : '?limit=50';
            const { data } = await axios.get(`${API}/api/deployments${params}`);
            setDeployments(data.deployments || data);
        } catch { /* silent */ } finally { setLoading(false); }
    };

    useEffect(() => { fetchDeployments(); }, [statusFilter]);
    useEffect(() => {
        const interval = setInterval(fetchDeployments, 8000);
        return () => clearInterval(interval);
    }, [statusFilter]);

    const handleRollback = async (id: string, name: string) => {
        if (!confirm(`Rollback "${name}"?`)) return;
        setRollbackId(id);
        try {
            await axios.post(`${API}/api/rollback`, { deploymentId: id });
            toast.success('♻️ Rollback successful!');
            fetchDeployments();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Rollback failed.');
        } finally { setRollbackId(null); }
    };

    if (authLoading || !user) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.10),transparent_55%)] pointer-events-none" />

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-20 flex flex-col items-center py-8 bg-black/25 border-r border-white/5 backdrop-blur-3xl z-10 shrink-0">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/40 mb-10">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <nav className="flex flex-col gap-6 flex-1">
                        <Link href="/" title="Dashboard" className="text-slate-500 hover:text-slate-300 p-2.5 rounded-xl transition-colors hover:bg-white/5"><LayoutDashboard size={22} /></Link>
                        <Link href="/repos" title="Repos" className="text-slate-500 hover:text-slate-300 p-2.5 rounded-xl transition-colors hover:bg-white/5"><GitBranch size={22} /></Link>
                        <Link href="/history" title="History" className="text-indigo-400 p-2.5 rounded-xl bg-indigo-500/10"><History size={22} /></Link>
                    </nav>
                    <button onClick={logout} className="text-slate-500 hover:text-rose-400 p-2.5 rounded-xl transition-colors hover:bg-rose-500/10" title="Logout"><LogOut size={22} /></button>
                </aside>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                                <History className="text-indigo-400 w-8 h-8" /> Deployment History
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">Full record of all deployments</p>
                        </div>
                        <Link href="/"
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
                            + New Deploy
                        </Link>
                    </header>

                    {/* Filters */}
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                        <Filter className="w-4 h-4 text-slate-500" />
                        {statusFilters.map(f => (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${statusFilter === f
                                    ? 'bg-indigo-600 text-white border-indigo-500'
                                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                        {loading ? (
                            <div className="flex items-center justify-center p-16">
                                <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
                            </div>
                        ) : deployments.length === 0 ? (
                            <div className="p-16 text-center text-slate-500">
                                <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p className="font-medium">No deployments found for filter: <span className="text-indigo-400">{statusFilter}</span></p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Project</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">Repo</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Date</th>
                                            <th className="text-left px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Duration</th>
                                            <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {deployments.map((d) => (
                                            <tr key={d._id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="shrink-0">
                                                            {d.status === 'success' ? <CheckCircle2 className="text-emerald-400 w-4 h-4" /> :
                                                                d.status === 'failed' ? <XCircle className="text-rose-400 w-4 h-4" /> :
                                                                    <Loader2 className="animate-spin text-indigo-400 w-4 h-4" />}
                                                        </div>
                                                        <span className="text-white font-semibold text-sm">{d.projectName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 hidden md:table-cell">
                                                    <span className="text-xs text-slate-500 font-mono truncate max-w-[180px] block">
                                                        {d.repoUrl?.replace('https://github.com/', '')}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4"><StatusBadge status={d.status} /></td>
                                                <td className="px-4 py-4 hidden lg:table-cell">
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(d.createdAt).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 hidden lg:table-cell">
                                                    <span className="text-xs text-slate-500">
                                                        {d.timeTaken ? `${(d.timeTaken / 1000).toFixed(1)}s` : '—'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <button onClick={() => setLogsDeployment({ id: d._id, name: d.projectName })}
                                                            className="p-2 text-slate-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-indigo-500/10" title="View Logs">
                                                            <Terminal className="w-4 h-4" />
                                                        </button>
                                                        {d.liveUrl && (
                                                            <a href={d.liveUrl} target="_blank" rel="noopener noreferrer"
                                                                className="p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10" title="Open App">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        <button onClick={() => handleRollback(d._id, d.projectName)}
                                                            disabled={rollbackId === d._id || d.status !== 'success'}
                                                            className="p-2 text-slate-400 hover:text-violet-400 transition-colors disabled:opacity-30 rounded-lg hover:bg-violet-500/10 disabled:hover:bg-transparent" title="Rollback">
                                                            {rollbackId === d._id ? <Loader2 className="animate-spin w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {logsDeployment && (
                <LogsModal deploymentId={logsDeployment.id} projectName={logsDeployment.name} onClose={() => setLogsDeployment(null)} />
            )}
        </main>
    );
}
