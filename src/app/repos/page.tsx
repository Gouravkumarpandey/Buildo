'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import {
    Activity, History, LayoutDashboard, GitBranch, LogOut,
    Loader2, Plus, Trash2, Rocket, Github, Clock, X
} from 'lucide-react';
import toast from 'react-hot-toast';

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
            toast.success('✅ Repository connected!');
            setShowForm(false);
            setForm({ name: '', repoUrl: '', description: '' });
            fetchRepos();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Failed to connect repo.');
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
                        <Link href="/repos" title="Repos" className="text-indigo-400 p-2.5 rounded-xl bg-indigo-500/10"><GitBranch size={22} /></Link>
                        <Link href="/history" title="History" className="text-slate-500 hover:text-slate-300 p-2.5 rounded-xl transition-colors hover:bg-white/5"><History size={22} /></Link>
                    </nav>
                    <button onClick={logout} className="text-slate-500 hover:text-rose-400 p-2.5 rounded-xl transition-colors hover:bg-rose-500/10" title="Logout"><LogOut size={22} /></button>
                </aside>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                                <GitBranch className="text-indigo-400 w-8 h-8" /> Repositories
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">Connect GitHub repos for quick deployment</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Connect Repo
                        </button>
                    </header>

                    {/* Connect Repo Modal */}
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                            <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Connect Repository</h2>
                                    <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                                </div>
                                <form onSubmit={handleConnect} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Project Name</label>
                                        <input type="text" value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="my-project" required
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">GitHub URL</label>
                                        <div className="relative">
                                            <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                            <input type="url" value={form.repoUrl}
                                                onChange={e => setForm({ ...form, repoUrl: e.target.value })}
                                                placeholder="https://github.com/user/repo" required
                                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Description <span className="text-slate-600">(optional)</span></label>
                                        <input type="text" value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })}
                                            placeholder="Brief description..."
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
                                    </div>
                                    <button type="submit" disabled={formLoading}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                        {formLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        {formLoading ? 'Connecting...' : 'Connect'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Repos Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center p-16">
                            <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
                        </div>
                    ) : repos.length === 0 ? (
                        <div className="text-center py-20">
                            <GitBranch className="w-16 h-16 mx-auto mb-4 text-slate-700" />
                            <h3 className="text-xl font-bold text-slate-400 mb-2">No repositories connected</h3>
                            <p className="text-slate-600 mb-6">Connect a GitHub repo to deploy it instantly</p>
                            <button onClick={() => setShowForm(true)}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Connect First Repo
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {repos.map(repo => (
                                <div key={repo._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-800 p-2 rounded-lg border border-white/5">
                                                <Github className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-sm">{repo.name}</h3>
                                                {repo.description && (
                                                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{repo.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(repo._id, repo.name)}
                                            disabled={deletingId === repo._id}
                                            className="text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100">
                                            {deletingId === repo._id ? <Loader2 className="animate-spin w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <p className="text-xs text-slate-600 font-mono mb-4 truncate">
                                        {repo.repoUrl.replace('https://github.com/', 'github.com/')}
                                    </p>

                                    {repo.lastDeployedAt && (
                                        <p className="text-xs text-slate-600 flex items-center gap-1 mb-4">
                                            <Clock className="w-3 h-3" />
                                            Last deployed {new Date(repo.lastDeployedAt).toLocaleDateString()}
                                        </p>
                                    )}

                                    <button onClick={() => handleDeploy(repo)}
                                        className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 font-semibold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group-hover:border-indigo-500/50">
                                        <Rocket className="w-4 h-4" /> Deploy Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
