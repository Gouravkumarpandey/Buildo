'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, XCircle, Clock, Terminal, ExternalLink, RotateCcw, GitBranch, Filter } from 'lucide-react';
import { LogsModal } from '../LogsModal';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Deployment {
    _id: string; projectName: string; repoUrl: string;
    status: string; liveUrl?: string; createdAt: string; timeTaken?: number;
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        building: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        running: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        deploying: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        cloning: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        pending: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    };
    const cls = styles[status] || styles.pending;
    const isActive = ['pending', 'cloning', 'building', 'running', 'deploying'].includes(status);
    return (
        <span className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide border ${cls}`}>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
            {status}
        </span>
    );
}

function timeAgo(d: string) {
    const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
}

export function DeploymentsView() {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [logsInfo, setLogsInfo] = useState<{ id: string; name: string } | null>(null);
    const [rollbackId, setRollbackId] = useState<string | null>(null);

    const fetch = async () => {
        try {
            const { data } = await axios.get(`${API}/api/deployments?limit=50`);
            setDeployments(data.deployments || data);
        } catch { /* silent */ } finally { setLoading(false); }
    };

    useEffect(() => { fetch(); const t = setInterval(fetch, 5000); return () => clearInterval(t); }, []);

    const handleRollback = async (id: string, name: string) => {
        if (!confirm(`Rollback "${name}"?`)) return;
        setRollbackId(id);
        try {
            await axios.post(`${API}/api/rollback`, { deploymentId: id });
            toast.success('♻️ Rollback done!');
            fetch();
        } catch (e: any) { toast.error(e?.response?.data?.error || 'Failed'); }
        finally { setRollbackId(null); }
    };

    const filtered = filter === 'all' ? deployments : deployments.filter(d => d.status === filter);
    const statuses = ['all', 'success', 'failed', 'building', 'running', 'pending'];

    return (
        <div className="flex-1 p-6 min-w-0 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-white">Deployments</h1>
                        <p className="text-sm text-zinc-500 mt-0.5">{deployments.length} total • auto-refreshes every 5s</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-zinc-500" />
                        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                            {statuses.map(s => (
                                <button key={s} onClick={() => setFilter(s)}
                                    className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filter === s ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-zinc-500 w-6 h-6" /></div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">No deployments found.</div>
                ) : (
                    <div className="border border-zinc-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Project</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Branch</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Duration</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Age</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60">
                                {filtered.map(d => (
                                    <tr key={d._id} className="hover:bg-zinc-900/60 transition-colors group">
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                                    {d.projectName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{d.projectName}</p>
                                                    {d.liveUrl && <a href={d.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-indigo-400 transition-colors">{d.liveUrl.replace(/^https?:\/\//, '')}</a>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5"><StatusBadge status={d.status} /></td>
                                        <td className="px-4 py-3.5">
                                            <span className="flex items-center gap-1 text-xs text-zinc-400">
                                                <GitBranch className="w-3 h-3" />
                                                {d.repoUrl.replace(/\.git$/, '').split('/').slice(-1)[0]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-zinc-400 font-mono">
                                            {d.timeTaken ? `${(d.timeTaken / 1000).toFixed(1)}s` : '—'}
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-zinc-500">{timeAgo(d.createdAt)}</td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                                                <button onClick={() => setLogsInfo({ id: d._id, name: d.projectName })} title="Logs"
                                                    className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded transition-all">
                                                    <Terminal className="w-3.5 h-3.5" />
                                                </button>
                                                {d.liveUrl && (
                                                    <a href={d.liveUrl} target="_blank" rel="noopener noreferrer" title="Open"
                                                        className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded transition-all">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                <button onClick={() => handleRollback(d._id, d.projectName)}
                                                    disabled={rollbackId === d._id || d.status !== 'success'}
                                                    title="Rollback"
                                                    className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded transition-all disabled:opacity-30">
                                                    {rollbackId === d._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
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
            {logsInfo && <LogsModal deploymentId={logsInfo.id} projectName={logsInfo.name} onClose={() => setLogsInfo(null)} />}
        </div>
    );
}
