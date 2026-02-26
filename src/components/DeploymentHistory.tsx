'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { History, ExternalLink, RotateCcw, CheckCircle2, XCircle, Clock, Loader2, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';
import { LogsModal } from './LogsModal';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Deployment {
    _id: string;
    projectName: string;
    repoUrl: string;
    status: string;
    liveUrl?: string;
    createdAt: string;
    timeTaken?: number;
}

interface DeploymentHistoryProps {
    refreshKey?: number;
}

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

export const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ refreshKey }) => {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);
    const [rollbackId, setRollbackId] = useState<string | null>(null);
    const [logsDeployment, setLogsDeployment] = useState<{ id: string; name: string } | null>(null);

    const fetchHistory = async () => {
        try {
            const { data } = await axios.get(`${API}/api/deployments?limit=10`);
            setDeployments(data.deployments || data);
        } catch { /* silent */ } finally { setLoading(false); }
    };

    useEffect(() => { fetchHistory(); }, [refreshKey]);

    useEffect(() => {
        fetchHistory();
        const interval = setInterval(fetchHistory, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleRollback = async (id: string, name: string) => {
        if (!confirm(`Rollback deployment "${name}"? This will restart the previous Docker container.`)) return;
        setRollbackId(id);
        try {
            await axios.post(`${API}/api/rollback`, { deploymentId: id });
            toast.success('♻️ Rollback successful!');
            fetchHistory();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Rollback failed.');
        } finally { setRollbackId(null); }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-12">
            <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
        </div>
    );

    return (
        <>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-400" /> Recent Deployments
                    </h3>
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">{deployments.length} events</span>
                </div>

                <div className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
                    {deployments.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 text-sm">
                            <Loader2 className="w-8 h-8 mx-auto mb-3 opacity-20" />
                            No deployments yet. Start your first deployment above!
                        </div>
                    ) : (
                        deployments.map((d) => (
                            <div key={d._id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2 rounded-xl bg-slate-900 border border-white/5 shrink-0">
                                        {d.status === 'success' && <CheckCircle2 className="text-emerald-400 w-4 h-4" />}
                                        {d.status === 'failed' && <XCircle className="text-rose-400 w-4 h-4" />}
                                        {!['success', 'failed'].includes(d.status) && <Loader2 className="animate-spin text-indigo-400 w-4 h-4" />}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-white font-semibold text-sm truncate">{d.projectName}</h4>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(d.createdAt).toLocaleString()}
                                            </span>
                                            {d.timeTaken && (
                                                <span className="text-[10px] text-slate-600">⏱ {(d.timeTaken / 1000).toFixed(1)}s</span>
                                            )}
                                            <StatusBadge status={d.status} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => setLogsDeployment({ id: d._id, name: d.projectName })}
                                        className="p-2 text-slate-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-indigo-500/10"
                                        title="View Logs"
                                    >
                                        <Terminal className="w-4 h-4" />
                                    </button>
                                    {d.liveUrl && (
                                        <a
                                            href={d.liveUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
                                            title="Open Live App"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => handleRollback(d._id, d.projectName)}
                                        disabled={rollbackId === d._id || d.status !== 'success'}
                                        className="p-2 text-slate-400 hover:text-violet-400 transition-colors disabled:opacity-30 rounded-lg hover:bg-violet-500/10 disabled:hover:bg-transparent"
                                        title="Rollback"
                                    >
                                        {rollbackId === d._id ? <Loader2 className="animate-spin w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {logsDeployment && (
                <LogsModal
                    deploymentId={logsDeployment.id}
                    projectName={logsDeployment.name}
                    onClose={() => setLogsDeployment(null)}
                />
            )}
        </>
    );
};
