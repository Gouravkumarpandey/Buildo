'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DeployForm } from '@/components/DeployForm';
import { LogConsole } from '@/components/LogConsole';
import { LogsModal } from '@/components/LogsModal';
import { DeploymentsView } from '@/components/views/DeploymentsView';
import { LogsView } from '@/components/views/LogsView';
import { AnalyticsView } from '@/components/views/AnalyticsView';
import {
  SpeedInsightsView, ObservabilityView, FirewallView, DomainsView,
  IntegrationsView, StorageView, FlagsView, AgentView, AIGatewayView,
  SandboxesView, UsageView,
} from '@/components/views/PlaceholderViews';
import toast from 'react-hot-toast';
import {
  LayoutGrid, Rocket, FileText, BarChart2, Zap, Eye, Shield,
  Globe, Puzzle, Database, Flag, Bot, Cpu, Box, TrendingUp,
  Search, MoreHorizontal, ChevronDown, Plus, Grid, List,
  Loader2, RotateCcw, ExternalLink, Terminal, GitBranch,
  Clock, Bell, ChevronRight, LogOut, Settings,
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/* ─── Types ── */
interface Deployment {
  _id: string; projectName: string; repoUrl: string;
  status: string; liveUrl?: string; createdAt: string; timeTaken?: number;
}
interface Stats { total: number; success: number; failed: number; running: number; }

/* ─── Nav Items ── */
const NAV_ITEMS = [
  { icon: LayoutGrid, label: 'Projects', id: 'projects' },
  { icon: Rocket, label: 'Deployments', id: 'deployments' },
  { icon: FileText, label: 'Logs', id: 'logs' },
  { icon: BarChart2, label: 'Analytics', id: 'analytics' },
  { icon: Zap, label: 'Speed Insights', id: 'speed' },
  { icon: Eye, label: 'Observability', id: 'observability', hasArrow: true },
  { icon: Shield, label: 'Firewall', id: 'firewall' },
  null,
  { icon: Globe, label: 'Domains', id: 'domains' },
  { icon: Puzzle, label: 'Integrations', id: 'integrations' },
  { icon: Database, label: 'Storage', id: 'storage' },
  { icon: Flag, label: 'Flags', id: 'flags' },
  { icon: Bot, label: 'Agent', id: 'agent', hasArrow: true },
  { icon: Cpu, label: 'AI Gateway', id: 'aigateway', hasArrow: true },
  { icon: Box, label: 'Sandboxes', id: 'sandboxes' },
  null,
  { icon: TrendingUp, label: 'Usage', id: 'usage' },
];

/* ─── Helpers ── */
function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    success: 'bg-emerald-500', failed: 'bg-rose-500', building: 'bg-amber-500',
    running: 'bg-violet-500', deploying: 'bg-indigo-500', cloning: 'bg-blue-500', pending: 'bg-zinc-500',
  };
  const active = ['pending', 'cloning', 'building', 'running', 'deploying'].includes(status);
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status] || 'bg-zinc-500'} ${active ? 'animate-pulse' : ''}`} />;
}

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

/* ─── Project Card ── */
function ProjectCard({ deployment, onLogs, onRollback, rolling }: {
  deployment: Deployment; onLogs: () => void; onRollback: () => void; rolling: boolean;
}) {
  const repoName = deployment.repoUrl.replace(/\.git$/, '').split('/').slice(-2).join('/');
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all group">
      <div className="h-28 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #6366f1 0%, transparent 60%), radial-gradient(circle at 70% 40%, #8b5cf6 0%, transparent 60%)' }} />
        <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">{deployment.projectName.charAt(0).toUpperCase()}</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          <StatusDot status={deployment.status} />
          <span className="text-zinc-300 capitalize">{deployment.status}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm truncate">{deployment.projectName}</h3>
            {deployment.liveUrl && (
              <a href={deployment.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-indigo-400 transition-colors truncate block mt-0.5">
                {deployment.liveUrl.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onLogs} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"><Terminal className="w-3.5 h-3.5" /></button>
            {deployment.liveUrl && (
              <a href={deployment.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"><ExternalLink className="w-3.5 h-3.5" /></a>
            )}
            <button onClick={onRollback} disabled={rolling || deployment.status !== 'success'} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all disabled:opacity-30">
              {rolling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2 text-xs text-zinc-500">
          <GitBranch className="w-3 h-3 shrink-0" />
          <span className="truncate">{repoName}</span>
          <span className="ml-auto shrink-0 flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(deployment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Usage + Alerts panels (sidebar) ── */
function UsagePanel({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Total Deployments', value: stats.total, max: 100 },
    { label: 'Successful', value: stats.success, max: stats.total || 1 },
    { label: 'Failed', value: stats.failed, max: stats.total || 1 },
    { label: 'Running Now', value: stats.running, max: 10 },
  ];
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Last 30 days</p>
        <button className="text-xs text-white bg-zinc-700 hover:bg-zinc-600 px-2.5 py-1 rounded-full transition-colors font-medium">Upgrade</button>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{item.label}</span>
              <span className="text-zinc-300 font-mono">{item.value}</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsPanel() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white flex items-center gap-2"><Bell className="w-4 h-4 text-zinc-500" /> Alerts</h3>
      <div className="mt-4 text-center py-4">
        <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3"><Bell className="w-5 h-5 text-zinc-600" /></div>
        <p className="text-sm font-medium text-white mb-1">Get alerted for anomalies</p>
        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">Automatically monitor your projects for anomalies and get notified.</p>
        <button className="text-xs border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 px-4 py-2 rounded-lg transition-all">Upgrade to Observability Plus</button>
      </div>
    </div>
  );
}

/* ─── Deploy Modal ── */
function DeployPanel({ onDeployStarted, initialRepoUrl, initialProjectName, activeDeployment }: {
  onDeployStarted: (id: string, name: string) => void;
  initialRepoUrl: string; initialProjectName: string;
  activeDeployment: { id: string; name: string } | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-100 transition-all">
        <Plus className="w-4 h-4" /> Add New…
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h2 className="text-white font-semibold text-lg">New Deployment</h2>
              <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition-colors text-2xl leading-none">×</button>
            </div>
            <div className="p-5 space-y-4">
              <DeployForm onDeployStarted={(id, name) => { onDeployStarted(id, name); setOpen(false); }} initialRepoUrl={initialRepoUrl} initialProjectName={initialProjectName} />
              {activeDeployment && <LogConsole deploymentId={activeDeployment.id} projectName={activeDeployment.name} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Projects content (Main overview) ── */
function ProjectsContent({ deployments, stats, search, setSearch, viewMode, setViewMode, onLogs, onRollback, rollbackId, onDeployStarted, initialRepoUrl, initialProjectName, activeDeployment, router }: {
  deployments: Deployment[]; stats: Stats; search: string; setSearch: (s: string) => void;
  viewMode: 'grid' | 'list'; setViewMode: (v: 'grid' | 'list') => void;
  onLogs: (id: string, name: string) => void; onRollback: (id: string, name: string) => void;
  rollbackId: string | null; onDeployStarted: (id: string, name: string) => void;
  initialRepoUrl: string; initialProjectName: string;
  activeDeployment: { id: string; name: string } | null; router: any;
}) {
  const filtered = deployments.filter(d => d.projectName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex gap-6 p-6 min-h-0 overflow-y-auto">
      {/* Left sidebar panel */}
      <div className="w-64 xl:w-72 shrink-0 space-y-4">
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">Usage</p>
        <UsagePanel stats={stats} />
        <AlertsPanel />
        <div className="bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white flex items-center gap-2"><Rocket className="w-3.5 h-3.5 text-indigo-400" /> Recent Previews</h3>
          <p className="text-xs text-zinc-500 mt-2">No preview deployments yet.</p>
        </div>
      </div>

      {/* Right: projects panel */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Projects…"
              className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-zinc-600 placeholder-zinc-600 transition-colors" />
          </div>
          <div className="flex items-center border border-zinc-800 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}><Grid className="w-3.5 h-3.5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}><List className="w-3.5 h-3.5" /></button>
          </div>
          <DeployPanel onDeployStarted={(id, name) => { onDeployStarted(id, name); router.replace('/'); }} initialRepoUrl={initialRepoUrl} initialProjectName={initialProjectName} activeDeployment={activeDeployment} />
        </div>

        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-4">Projects</p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-4"><Rocket className="w-8 h-8 text-zinc-700" /></div>
            <p className="text-white font-semibold mb-2">No projects yet</p>
            <p className="text-sm text-zinc-500 mb-6">Deploy your first GitHub repo to get started.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(d => (
              <ProjectCard key={d._id} deployment={d} onLogs={() => onLogs(d._id, d.projectName)} onRollback={() => onRollback(d._id, d.projectName)} rolling={rollbackId === d._id} />
            ))}
          </div>
        ) : (
          <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
            {filtered.map(d => (
              <div key={d._id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-zinc-900/60 transition-colors group">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0">{d.projectName.charAt(0).toUpperCase()}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">{d.projectName}</p>
                  <p className="text-xs text-zinc-500 truncate">{d.repoUrl.replace(/\.git$/, '').split('/').slice(-2).join('/')}</p>
                </div>
                <div className="flex items-center gap-1.5"><StatusDot status={d.status} /><span className="text-xs text-zinc-400 capitalize">{d.status}</span></div>
                <span className="text-xs text-zinc-500 shrink-0">{timeAgo(d.createdAt)}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onLogs(d._id, d.projectName)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"><Terminal className="w-3.5 h-3.5" /></button>
                  {d.liveUrl && <a href={d.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"><ExternalLink className="w-3.5 h-3.5" /></a>}
                  <button onClick={() => onRollback(d._id, d.projectName)} disabled={rollbackId === d._id || d.status !== 'success'} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all disabled:opacity-30">
                    {rollbackId === d._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Dashboard ── */
function DashboardContent() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRepoUrl = searchParams.get('repoUrl') || '';
  const initialProjectName = searchParams.get('name') || '';

  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, success: 0, failed: 0, running: 0 });
  const [activeDeployment, setActiveDeployment] = useState<{ id: string; name: string } | null>(null);
  const [rollbackId, setRollbackId] = useState<string | null>(null);
  const [logsDeployment, setLogsDeployment] = useState<{ id: string; name: string } | null>(null);
  const [activeNav, setActiveNav] = useState('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => { if (!loading && !user) router.push('/landing'); }, [user, loading, router]);

  const fetchData = async () => {
    try {
      const [depRes, statsRes] = await Promise.all([
        axios.get(`${API}/api/deployments?limit=20`),
        axios.get(`${API}/api/stats`),
      ]);
      setDeployments(depRes.data.deployments || depRes.data);
      setStats(statsRes.data);
    } catch { /* silent */ }
  };

  useEffect(() => { fetchData(); const t = setInterval(fetchData, 6000); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (initialRepoUrl && initialProjectName) toast('📋 Repo pre-filled! Click "Add New…" to deploy.', { icon: '💡' });
  }, [initialRepoUrl, initialProjectName]);

  const handleRollback = async (id: string, name: string) => {
    if (!confirm(`Rollback "${name}"?`)) return;
    setRollbackId(id);
    try { await axios.post(`${API}/api/rollback`, { deploymentId: id }); toast.success('♻️ Rollback done!'); fetchData(); }
    catch (e: any) { toast.error(e?.response?.data?.error || 'Rollback failed.'); }
    finally { setRollbackId(null); }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-white w-8 h-8" /></div>;
  if (!user) return null;

  const navLabel = activeNav === 'projects' ? 'Overview' : NAV_ITEMS.find(n => n && n.id === activeNav)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} transition-all duration-300 shrink-0 h-screen sticky top-0 flex flex-col bg-zinc-950 border-r border-zinc-800/70 overflow-y-auto overflow-x-hidden`}>
        {/* Team selector */}
        <div className="px-3 pt-4 pb-3 border-b border-zinc-800/70">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 text-xs font-bold text-white">{user.name.charAt(0).toUpperCase()}</div>
            {sidebarOpen && (
              <>
                <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-white truncate">{user.name}</p></div>
                <span className="text-[10px] bg-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded font-medium shrink-0">{user.role === 'admin' ? 'Pro' : 'Hobby'}</span>
                <ChevronDown className="w-3 h-3 text-zinc-500 shrink-0" />
              </>
            )}
          </div>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="px-3 py-2 border-b border-zinc-800/70">
            <div className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-3 py-2">
              <Search className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-xs text-zinc-500 flex-1">Find…</span>
              <kbd className="text-[10px] bg-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded font-mono">F</kbd>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-2 px-2">
          {NAV_ITEMS.map((item, idx) => {
            if (item === null) return <div key={`div-${idx}`} className="my-2 border-t border-zinc-800/60" />;
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all mb-0.5 ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}>
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && (<><span className="flex-1 text-left">{item.label}</span>{item.hasArrow && <ChevronRight className="w-3 h-3 text-zinc-600" />}</>)}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-2 py-3 border-t border-zinc-800/70">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">{user.name.charAt(0).toUpperCase()}</div>
            {sidebarOpen && (
              <>
                <span className="text-xs text-zinc-400 truncate flex-1">{user.email}</span>
                <button onClick={() => { logout(); router.push('/landing'); }} className="text-zinc-600 hover:text-zinc-300 transition-colors" title="Logout"><LogOut className="w-3.5 h-3.5" /></button>
              </>
            )}
          </div>
          {sidebarOpen && (
            <div className="flex items-center justify-between px-2.5 mt-1">
              <ThemeToggle />
              <button className="text-zinc-600 hover:text-zinc-300 transition-colors"><Settings className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 h-14 border-b border-zinc-800/70 bg-black/90 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(v => !v)} className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800"><LayoutGrid className="w-4 h-4" /></button>
            <button className="hover:text-white transition-colors flex items-center gap-1 text-sm text-zinc-400">All Projects <ChevronDown className="w-3.5 h-3.5" /></button>
          </div>
          <span className="text-sm font-semibold text-white absolute left-1/2 -translate-x-1/2">{navLabel}</span>
          <button className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800"><MoreHorizontal className="w-4 h-4" /></button>
        </header>

        {/* Routed content */}
        <div className="flex-1 flex min-h-0">
          {activeNav === 'projects' && (
            <ProjectsContent
              deployments={deployments} stats={stats} search={search} setSearch={setSearch}
              viewMode={viewMode} setViewMode={setViewMode}
              onLogs={(id, name) => setLogsDeployment({ id, name })}
              onRollback={handleRollback} rollbackId={rollbackId}
              onDeployStarted={(id, name) => { setActiveDeployment({ id, name }); fetchData(); }}
              initialRepoUrl={initialRepoUrl} initialProjectName={initialProjectName}
              activeDeployment={activeDeployment} router={router}
            />
          )}
          {activeNav === 'deployments' && <DeploymentsView />}
          {activeNav === 'logs' && <LogsView />}
          {activeNav === 'analytics' && <AnalyticsView />}
          {activeNav === 'speed' && <SpeedInsightsView />}
          {activeNav === 'observability' && <ObservabilityView />}
          {activeNav === 'firewall' && <FirewallView />}
          {activeNav === 'domains' && <DomainsView />}
          {activeNav === 'integrations' && <IntegrationsView />}
          {activeNav === 'storage' && <StorageView />}
          {activeNav === 'flags' && <FlagsView />}
          {activeNav === 'agent' && <AgentView />}
          {activeNav === 'aigateway' && <AIGatewayView />}
          {activeNav === 'sandboxes' && <SandboxesView />}
          {activeNav === 'usage' && <UsageView />}
        </div>
      </div>

      {/* Logs modal */}
      {logsDeployment && (
        <LogsModal deploymentId={logsDeployment.id} projectName={logsDeployment.name} onClose={() => setLogsDeployment(null)} />
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-white w-8 h-8" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
