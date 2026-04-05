'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import {
    Activity, History, LayoutDashboard, GitBranch, LogOut, ExternalLink,
    RotateCcw, CheckCircle2, XCircle, Clock, Loader2, Terminal, Filter, Plus, Globe, Settings, Shield, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { LogsModal } from '@/components/LogsModal';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    const map: Record<string, { bg: string, text: string, border: string, dot: string }> = {
        success: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-600' },
        failed: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-600' },
        pending: { bg: 'bg-[#f2f4f7]', text: 'text-[#667085]', border: 'border-[#eaecf0]', dot: 'bg-[#98a2b3]' },
        cloning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-600' },
        building: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', dot: 'bg-orange-600' },
        running: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100', dot: 'bg-purple-600' },
        deploying: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-600' },
    };
    
    const config = map[status] || { bg: 'bg-[#f2f4f7]', text: 'text-[#667085]', border: 'border-[#eaecf0]', dot: 'bg-[#98a2b3]' };
    
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border ${config.border} ${config.bg} ${config.text} text-[10px] font-bold uppercase tracking-wider`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${['cloning', 'building', 'running', 'deploying'].includes(status) ? 'animate-pulse' : ''}`} />
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

    const fetchDeployments = useCallback(async () => {
        try {
            const params = statusFilter !== 'all' ? `?status=${statusFilter}&limit=50` : '?limit=50';
            const { data } = await axios.get(`${API}/api/deployments${params}`);
            setDeployments(data.deployments || data);
        } catch { /* silent */ } finally { setLoading(false); }
    }, [statusFilter]);

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
            toast.success('Rollback initiated successfully.');
            fetchDeployments();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Rollback failed.');
        } finally { setRollbackId(null); }
    };

    if (authLoading || !user) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#fcfcfd] text-[#101828] flex overflow-hidden font-sans">
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <aside className="w-20 lg:w-72 border-r border-[#eaecf0] bg-white h-screen flex flex-col p-4 gap-6 sticky top-0 shrink-0 z-40">
                    <div className="px-3 py-2">
                        <Link href="/landing" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/10 transition-transform group-hover:scale-105">
                                <Globe className="w-5 h-5" />
                            </div>
                            <span className="hidden lg:block font-black text-2xl tracking-tighter text-[#101828]">BUILDO</span>
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                            <LayoutDashboard className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                            <span className="hidden lg:block">Dashboard</span>
                        </Link>
                        <Link href="/repos" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                            <GitBranch className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                            <span className="hidden lg:block">Repositories</span>
                        </Link>
                        <Link href="/history" className="flex items-center gap-3 px-3 py-2.5 bg-[#f9fafb] text-blue-700 border-r-2 border-blue-600 transition-all font-bold text-[13px] uppercase tracking-wider">
                            <History className="w-5 h-5 text-blue-600" />
                            <span className="hidden lg:block">History</span>
                        </Link>
                        <div className="pt-4 mt-4 border-t border-[#eaecf0]">
                           <p className="hidden lg:block px-3 text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] mb-2">Admin Tasks</p>
                           <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                              <Settings className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                              <span className="hidden lg:block">Settings</span>
                           </Link>
                           <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                              <Shield className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                              <span className="hidden lg:block">Security Metrics</span>
                           </Link>
                        </div>
                    </nav>

                    <div className="mt-auto border-t border-[#eaecf0] pt-4">
                        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-3 text-[#667085] hover:text-red-600 hover:bg-red-50 transition-all font-bold text-[13px] uppercase tracking-wider group">
                            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="hidden lg:block">Terminate Session</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto relative bauhaus-pattern">
                    <header className="sticky top-0 z-30 flex items-center justify-between px-8 h-20 border-b border-[#eaecf0] bg-white/80 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-black text-[#101828] uppercase tracking-tighter flex items-center gap-3 italic">
                                <History className="text-blue-600 w-6 h-6" /> Pipeline History
                            </h1>
                            <div className="h-6 w-[1px] bg-[#eaecf0] hidden md:block" />
                            <p className="hidden md:block text-[11px] font-bold text-[#667085] uppercase tracking-widest">Global Compute Records</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <Link href="/" className="bauhaus-button px-6 py-2.5 text-xs">
                                <Plus className="w-4 h-4" /> New Deployment
                            </Link>
                        </div>
                    </header>

                    <div className="p-8 max-w-7xl mx-auto">
                        {/* Filters */}
                        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                            <div className="flex items-center gap-2 mr-4 bg-white border border-[#eaecf0] px-3 py-1.5 shadow-sm">
                               <Filter className="w-3.5 h-3.5 text-[#667085]" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-[#101828]">Grid Filters</span>
                            </div>
                            {statusFilters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setStatusFilter(f)}
                                    className={`px-5 py-1.5 border font-bold text-[11px] uppercase tracking-[0.15em] transition-all ${statusFilter === f
                                        ? 'bg-[#101828] text-white border-[#101828]'
                                        : 'bg-white text-[#667085] border-[#eaecf0] hover:border-blue-600 hover:text-blue-600'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Recent Activity Alert */}
                        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
                           <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-blue-600" />
                              <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">Automatic grid health monitoring is active. All pipelines are being audited.</p>
                           </div>
                           <span className="text-[9px] font-black text-blue-600 bg-white border border-blue-200 px-2 py-0.5 uppercase">Live Status</span>
                        </div>

                        {/* Inventory / Table */}
                        <div className="bauhaus-card bg-white overflow-hidden shadow-xl shadow-blue-900/5 border-[#eaecf0]">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center p-32 gap-4">
                                    <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
                                    <p className="text-xs font-bold text-[#98a2b3] uppercase tracking-[0.3em]">Downloading Compute Logs...</p>
                                </div>
                            ) : deployments.length === 0 ? (
                                <div className="p-32 text-center">
                                    <div className="w-16 h-16 bg-[#f9fafb] border border-[#eaecf0] flex items-center justify-center mx-auto mb-6">
                                       <History className="text-[#d0d5dd] w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-[#101828] uppercase italic mb-2 tracking-tighter">Zero Footprints</h3>
                                    <p className="text-sm font-medium text-[#667085] mb-8">No records found for filter: <span className="text-blue-600 font-bold">{statusFilter}</span></p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-[#fcfcfd] border-b border-[#eaecf0]">
                                                <th className="px-8 py-5 text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em]">Compute Node / Project</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] hidden md:table-cell">Architecture</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em]">Execution Status</th>
                                                <th className="px-6 py-5 text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] hidden lg:table-cell">Metadata</th>
                                                <th className="px-8 py-5 text-right text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em]">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#f2f4f7]">
                                            {deployments.map((d) => (
                                                <tr key={d._id} className="hover:bg-[#f9fafb] transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-[#f9fafb] border border-[#eaecf0] flex items-center justify-center group-hover:border-blue-600/30 group-hover:bg-white transition-all">
                                                                {d.status === 'success' ? <CheckCircle2 className="text-blue-600 w-5 h-5" /> :
                                                                    d.status === 'failed' ? <XCircle className="text-red-500 w-5 h-5" /> :
                                                                        <Loader2 className="animate-spin text-blue-600 w-5 h-5" />}
                                                            </div>
                                                            <div className="min-w-0">
                                                               <span className="text-[#101828] font-bold text-sm block truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{d.projectName}</span>
                                                               <span className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest">{d.deployTarget || 'Grid Edge'}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 hidden md:table-cell">
                                                        <div className="flex items-center gap-2 group-hover:bg-white px-2 py-1 rounded transition-colors inline-flex border border-transparent group-hover:border-[#eaecf0]">
                                                           <GitBranch className="w-3.5 h-3.5 text-[#98a2b3]" />
                                                           <span className="text-[11px] font-bold text-[#667085] uppercase tracking-tighter truncate max-w-[150px]">
                                                               {d.repoUrl?.replace('https://github.com/', '')}
                                                           </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6"><StatusBadge status={d.status} /></td>
                                                    <td className="px-6 py-6 hidden lg:table-cell">
                                                        <div className="space-y-1">
                                                           <span className="text-[11px] text-[#667085] font-bold flex items-center gap-1.5 uppercase">
                                                               <Clock className="w-3.5 h-3.5 text-[#98a2b3]" />
                                                               {new Date(d.createdAt).toLocaleDateString()}
                                                           </span>
                                                           <span className="text-[10px] text-[#98a2b3] font-bold block uppercase tracking-wider">
                                                               Process: {d.timeTaken ? `${(d.timeTaken / 1000).toFixed(1)}s` : 'Initializing'}
                                                           </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center gap-1.5 justify-end">
                                                            <button onClick={() => setLogsDeployment({ id: d._id, name: d.projectName })}
                                                                className="p-2 text-[#98a2b3] hover:text-[#101828] hover:bg-[#f2f4f7] transition-all" title="View Logs">
                                                                <Terminal className="w-4.5 h-4.5" />
                                                            </button>
                                                            {d.liveUrl && (
                                                                <a href={d.liveUrl} target="_blank" rel="noopener noreferrer"
                                                                    className="p-2 text-[#98a2b3] hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100" title="Open App">
                                                                    <ExternalLink className="w-4.5 h-4.5" />
                                                                </a>
                                                            )}
                                                            <button onClick={() => handleRollback(d._id, d.projectName)}
                                                                disabled={rollbackId === d._id || d.status !== 'success'}
                                                                className="p-2 text-[#98a2b3] hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 disabled:opacity-20 disabled:hover:bg-transparent" title="Rollback Operation">
                                                                {rollbackId === d._id ? <Loader2 className="animate-spin w-4.5 h-4.5" /> : <RotateCcw className="w-4.5 h-4.5" />}
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
                        
                        <div className="mt-8 flex items-center justify-between text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] px-2 opacity-50">
                           <div className="flex items-center gap-4">
                              <span>Audit ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                              <span>•</span>
                              <span>System: OK</span>
                           </div>
                           <div className="flex items-center gap-2">
                              {new Date().getFullYear()} Buildo Infrastructure
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {logsDeployment && (
                <LogsModal deploymentId={logsDeployment.id} projectName={logsDeployment.name} onClose={() => setLogsDeployment(null)} />
            )}
        </main>
    );
}
