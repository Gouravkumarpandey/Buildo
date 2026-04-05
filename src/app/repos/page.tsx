'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import {
    Activity, History, LayoutDashboard, GitBranch, LogOut,
    Loader2, Plus, Trash2, Rocket, Github, Clock, X, Globe, Settings, ExternalLink, Shield, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Repo {
    _id: string;
    name: string;
    repoUrl: string;
    description?: string;
    lastDeployedAt?: string;
    createdAt: string;
}

export default function ReposPage() {
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', repoUrl: '', description: '' });
    const [formLoading, setFormLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [user, authLoading, router]);

    const fetchRepos = async () => {
        try {
            const { data } = await axios.get(`${API}/api/repos`);
            setRepos(Array.isArray(data) ? data : []);
        } catch { /* silent */ } finally { setLoading(false); }
    };

    useEffect(() => { fetchRepos(); }, []);

    const handleConnect = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            await axios.post(`${API}/api/repos`, form);
            toast.success('Repository connected to grid.');
            setShowForm(false);
            setForm({ name: '', repoUrl: '', description: '' });
            fetchRepos();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Connection failed.');
        } finally { setFormLoading(false); }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Disconnect repository "${name}"?`)) return;
        setDeletingId(id);
        try {
            await axios.delete(`${API}/api/repos/${id}`);
            toast.success('Repository disconnected.');
            setRepos(repos.filter(r => r._id !== id));
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Failed to disconnect.');
        } finally { setDeletingId(null); }
    };

    const handleDeploy = (repo: Repo) => {
        router.push(`/?repoUrl=${encodeURIComponent(repo.repoUrl)}&name=${encodeURIComponent(repo.name)}`);
    };

    if (authLoading || !user) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
    );

    return (
        <main className="min-h-screen bg-[#fcfcfd] text-[#101828] flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-20 lg:w-72 border-r border-[#eaecf0] bg-white h-screen flex flex-col p-4 gap-6 sticky top-0 shrink-0 z-40">
                <div className="px-3 py-2">
                    <Link href="/landing" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/10 transition-transform group-hover:scale-105">
                            <Globe className="w-5 h-5" />
                        </div>
                        <span className="hidden lg:block font-black text-2xl tracking-tighter text-[#101828]">NEXORA</span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-1">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                        <LayoutDashboard className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                        <span className="hidden lg:block">Dashboard</span>
                    </Link>
                    <Link href="/repos" className="flex items-center gap-3 px-3 py-2.5 bg-[#f9fafb] text-blue-700 border-r-2 border-blue-600 transition-all font-bold text-[13px] uppercase tracking-wider">
                        <GitBranch className="w-5 h-5 text-blue-600" />
                        <span className="hidden lg:block">Repositories</span>
                    </Link>
                    <Link href="/history" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                        <History className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                        <span className="hidden lg:block">History</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-[#eaecf0]">
                       <p className="hidden lg:block px-3 text-[10px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] mb-2">Grid Configuration</p>
                       <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                          <Settings className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                          <span className="hidden lg:block">Settings</span>
                       </Link>
                       <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all font-bold text-[13px] uppercase tracking-wider group">
                          <Shield className="w-5 h-5 text-[#98a2b3] group-hover:text-blue-600 transition-colors" />
                          <span className="hidden lg:block">Architecture</span>
                       </Link>
                    </div>
                </nav>

                <div className="mt-auto border-t border-[#eaecf0] pt-4">
                     <div className="hidden lg:flex items-center gap-3 px-3 py-4 mb-2">
                        <div className="w-10 h-10 bg-[#f2f4f7] border border-[#eaecf0] flex items-center justify-center font-bold text-blue-600 shadow-sm">
                           {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                           <p className="text-sm font-bold text-[#101828] truncate">{user.name}</p>
                           <p className="text-[10px] text-[#667085] uppercase font-bold tracking-widest">Admin Node</p>
                        </div>
                     </div>
                     <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-3 text-[#667085] hover:text-red-600 hover:bg-red-50 transition-all font-bold text-[13px] uppercase tracking-wider group">
                        <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="hidden lg:block">Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between px-8 h-20 border-b border-[#eaecf0] bg-white/80 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-4">
                         <h1 className="text-xl font-black text-[#101828] uppercase tracking-tighter flex items-center gap-3 italic">
                            <GitBranch className="text-blue-600 w-6 h-6" /> Source Catalog
                        </h1>
                        <div className="h-6 w-[1px] bg-[#eaecf0] hidden md:block" />
                        <p className="hidden md:block text-[11px] font-bold text-[#667085] uppercase tracking-widest bg-[#f9fafb] px-3 py-1 rounded-full border border-[#eaecf0]">
                           {repos.length} Connected Repositories
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <ThemeToggle />
                      <button
                          onClick={() => setShowForm(true)}
                          className="bauhaus-button px-6 py-2.5 text-xs"
                      >
                          <Plus className="w-4 h-4" /> Connect Source
                      </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 relative bauhaus-pattern">
                    
                    {/* Connect Repo Modal */}
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101828]/20 backdrop-blur-sm animate-in fade-in duration-200">
                             <div className="bauhaus-card bg-white w-full max-w-md p-8 relative shadow-2xl shadow-blue-900/10 animate-in zoom-in-95 duration-200">
                                <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-[#98a2b3] hover:text-[#101828] transition-colors"><X className="w-5 h-5" /></button>
                                
                                <div className="text-center mb-8">
                                   <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                                      <GitBranch className="w-6 h-6" />
                                   </div>
                                   <h2 className="text-2xl font-black text-[#101828] uppercase italic tracking-tighter">Source Connection</h2>
                                   <p className="text-sm font-medium text-[#667085] mt-1">Initialize direct access to your compute source.</p>
                                </div>

                                <form onSubmit={handleConnect} className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest ml-1">Grid Name</label>
                                        <input type="text" value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="Production-Engine-01" required
                                            className="bauhaus-input w-full text-sm font-medium border-[#eaecf0]" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest ml-1">GitHub Endpoint</label>
                                        <div className="relative">
                                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3] w-4 h-4" />
                                            <input type="url" value={form.repoUrl}
                                                onChange={e => setForm({ ...form, repoUrl: e.target.value })}
                                                placeholder="https://github.com/org/repo" required
                                                className="bauhaus-input w-full pl-10 text-sm font-medium border-[#eaecf0]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest ml-1">Domain Logic <span className="italic">(optional)</span></label>
                                        <input type="text" value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })}
                                            placeholder="Primary architecture source for production node."
                                            className="bauhaus-input w-full text-sm font-medium border-[#eaecf0]" />
                                    </div>
                                    <button type="submit" disabled={formLoading}
                                        className="w-full bauhaus-button py-4 justify-center text-sm">
                                        {formLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                        {formLoading ? 'Configuring Node...' : 'Commit Connection'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Repos Grid */}
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-20 gap-4">
                                <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
                                <p className="text-xs font-bold text-[#98a2b3] uppercase tracking-[0.3em]">Querying Grid Sources...</p>
                            </div>
                        ) : repos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center bauhaus-card bg-white max-w-2xl mx-auto shadow-sm border-[#eaecf0]">
                                <div className="w-20 h-20 bg-[#f9fafb] border border-[#eaecf0] flex items-center justify-center mb-6">
                                   <GitBranch className="w-10 h-10 text-[#d0d5dd]" />
                                </div>
                                <h3 className="text-2xl font-black text-[#101828] uppercase italic mb-3 tracking-tighter">Zero Sources Detected</h3>
                                <p className="text-sm font-medium text-[#667085] mb-8 max-w-sm mx-auto">Connect a primary GitHub repository to Nexora to begin automated grid deployment.</p>
                                <button onClick={() => setShowForm(true)}
                                    className="bauhaus-button px-8 py-4 text-sm">
                                    <Plus className="w-5 h-5" /> Connect Initial Source
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {repos.map(repo => (
                                    <div key={repo._id} className="bauhaus-card bg-white p-6 transition-all group hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-600/30 flex flex-col border-[#eaecf0]">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/10 group-hover:scale-105 transition-transform">
                                                    <Github className="w-6 h-6" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-[#101828] font-black text-lg uppercase leading-none tracking-tight truncate">{repo.name}</h3>
                                                    <p className="text-[#667085] text-[10px] font-bold uppercase mt-1.5 line-clamp-1 italic tracking-wider">
                                                       {repo.description || 'Global Compute Resource'}
                                                    </p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDelete(repo._id, repo.name)}
                                                disabled={deletingId === repo._id}
                                                className="text-[#d0d5dd] hover:text-red-600 transition-all p-1.5 hover:bg-red-50">
                                                {deletingId === repo._id ? <Loader2 className="animate-spin w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="mb-6 p-4 bg-[#f9fafb] border border-[#eaecf0] rounded-none group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                            <div className="flex items-center justify-between gap-3 overflow-hidden">
                                               <span className="text-[11px] font-bold text-[#101828] truncate uppercase tracking-tighter">
                                                  {repo.repoUrl.replace('https://github.com/', 'git://')}
                                               </span>
                                               <ExternalLink className="w-3 h-3 text-[#98a2b3] shrink-0" />
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#f2f4f7]">
                                            {repo.lastDeployedAt ? (
                                                <div className="flex items-center gap-2">
                                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                     <span className="text-[10px] font-bold text-[#667085] uppercase tracking-widest">
                                                       Synced {new Date(repo.lastDeployedAt).toLocaleDateString()}
                                                     </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                     <div className="w-1.5 h-1.5 rounded-full bg-[#d0d5dd]" />
                                                     <span className="text-[10px] font-bold text-[#98a2b3] uppercase tracking-widest italic">Idle Status</span>
                                                </div>
                                            )}
                                            <button onClick={() => handleDeploy(repo)}
                                                className="text-blue-600 hover:text-blue-700 font-black text-[11px] uppercase tracking-[0.1em] flex items-center gap-1.5 group/btn">
                                                Launch <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
