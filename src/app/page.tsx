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
    success: 'bg-[#0052FF]', failed: 'bg-[#E02020]', building: 'bg-[#FFC400]',
    running: 'bg-[#8338EC]', deploying: 'bg-blue-400', cloning: 'bg-amber-400', pending: 'bg-slate-300',
  };
  const active = ['pending', 'cloning', 'building', 'running', 'deploying'].includes(status);
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block w-2 h-2 rounded-full ${colors[status] || 'bg-slate-300'} ${active ? 'animate-pulse' : ''}`} />
    </div>
  );
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
    <div className="bauhaus-card group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white border border-[#eaecf0] flex items-center justify-center rounded-md shadow-sm">
                <Box className="w-5 h-5 text-blue-600" />
             </div>
             <div>
                <h3 className="font-extrabold text-sm text-[#101828]">{deployment.projectName}</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-[#667085]">
                  <StatusDot status={deployment.status} />
                  <span className="uppercase tracking-tight">{deployment.status}</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onLogs} className="p-2 border border-[#eaecf0] bg-white hover:border-blue-600 transition-colors" title="Logs">
              <Terminal className="w-4 h-4 text-[#667085]" />
            </button>
            <button onClick={onRollback} disabled={rolling || deployment.status !== 'success'} className="p-2 border border-[#eaecf0] bg-white hover:border-blue-600 transition-colors disabled:opacity-30">
              {rolling ? <Loader2 className="w-4 h-4 animate-spin text-[#667085]" /> : <RotateCcw className="w-4 h-4 text-[#667085]" />}
            </button>
          </div>
        </div>
        
        {deployment.liveUrl && (
          <div className="mb-6 flex items-center gap-2 p-2 bg-[#f9fafb] border border-[#eaecf0] rounded">
             <Globe className="w-3.5 h-3.5 text-[#98a2b3]" />
             <a href={deployment.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline truncate">
                {deployment.liveUrl.replace(/^https?:\/\//, '')}
             </a>
             <ExternalLink className="w-3 h-3 text-[#98a2b3] ml-auto" />
          </div>
        )}

        <div className="pt-4 border-t border-[#eaecf0] flex items-center justify-between text-[11px] font-semibold text-[#98a2b3]">
          <div className="flex items-center gap-1.5 min-w-0">
            <GitBranch className="w-3.5 h-3.5" />
            <span className="truncate uppercase tracking-tight">{repoName}</span>
          </div>
          <span className="shrink-0 uppercase tracking-tighter">{timeAgo(deployment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Usage + Alerts panels (sidebar) ── */
function UsagePanel({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Deploys', value: stats.total, max: 100, color: 'bg-blue-600' },
    { label: 'Success', value: stats.success, max: stats.total || 1, color: 'bg-emerald-600' },
    { label: 'Failed', value: stats.failed, max: stats.total || 1, color: 'bg-red-600' },
    { label: 'Active', value: stats.running, max: 10, color: 'bg-blue-400' },
  ];
  return (
    <div className="bauhaus-card p-5">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] font-extrabold text-[#101828] uppercase tracking-wider">Metrics Overview</p>
        <span className="text-[10px] text-blue-600 font-bold uppercase py-0.5 px-2 bg-blue-50 border border-blue-100">Live</span>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-[11px] mb-1.5 font-bold uppercase tracking-tight">
              <span className="text-[#667085]">{item.label}</span>
              <span className="text-[#101828]">{item.value}</span>
            </div>
            <div className="h-1.5 bg-[#f2f4f7] overflow-hidden">
              <div className={`h-full ${item.color} transition-all duration-700`} style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsPanel() {
  return (
    <div className="bauhaus-card p-5 border-dashed border-2">
      <div className="text-center py-4">
        <div className="w-10 h-10 bg-[#f9fafb] border border-[#eaecf0] flex items-center justify-center mx-auto mb-4">
          <Bell className="w-5 h-5 text-[#667085]" />
        </div>
        <p className="text-xs font-extrabold text-[#101828] uppercase mb-1 tracking-tight">Observer Unit</p>
        <p className="text-[11px] font-medium text-[#667085] leading-relaxed px-2">Monitor active. No critical incidents detected on the grid.</p>
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
      <button onClick={() => setOpen(true)} className="bauhaus-button px-6 py-2.5 text-sm">
        <Plus className="w-4 h-4" /> New Deployment
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101828]/20 backdrop-blur-sm">
          <div className="bauhaus-card w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#eaecf0]">
              <h2 className="text-[#101828] font-black text-xl tracking-tighter">INITIALIZE_ENGINE</h2>
              <button onClick={() => setOpen(false)} className="text-[#667085] hover:text-[#101828] transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="p-8">
              <DeployForm onDeployStarted={(id, name) => { onDeployStarted(id, name); setOpen(false); }} initialRepoUrl={initialRepoUrl} initialProjectName={initialProjectName} />
              {activeDeployment && <div className="mt-8"><LogConsole deploymentId={activeDeployment.id} projectName={activeDeployment.name} /></div>}
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
    <div className="flex-1 flex gap-8 p-8 min-h-0 overflow-y-auto bauhaus-pattern">
      {/* Left sidebar panel */}
      <div className="w-72 shrink-0 space-y-6">
        <h4 className="text-[11px] font-bold text-[#98a2b3] uppercase tracking-[0.2em]">Operational Health</h4>
        <UsagePanel stats={stats} />
        <AlertsPanel />
      </div>

      {/* Right: projects panel */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects by name..."
              className="w-full h-11 bauhaus-input pl-11 pr-4 bg-white border-[#eaecf0]" />
          </div>
          <div className="flex items-center border border-[#eaecf0] bg-white overflow-hidden shadow-sm">
            <button onClick={() => setViewMode('grid')} className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#f9fafb] text-blue-600' : 'text-[#98a2b3] hover:text-[#101828]'}`}><Grid className="w-5 h-5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-[#f9fafb] text-blue-600' : 'text-[#98a2b3] hover:text-[#101828]'}`}><List className="w-5 h-5" /></button>
          </div>
          <DeployPanel onDeployStarted={(id, name) => { onDeployStarted(id, name); router.replace('/'); }} initialRepoUrl={initialRepoUrl} initialProjectName={initialProjectName} activeDeployment={activeDeployment} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#101828] tracking-tight">Active Deployments</h2>
          <span className="text-[11px] font-bold text-[#98a2b3] uppercase tracking-widest">{filtered.length} Projects</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bauhaus-card border-dashed">
            <div className="w-16 h-16 bg-[#f9fafb] border border-[#eaecf0] flex items-center justify-center mb-6"><Rocket className="w-8 h-8 text-[#98a2b3]" /></div>
            <p className="text-[#101828] font-black text-xl uppercase mb-2">No active distribution</p>
            <p className="text-sm font-medium text-[#667085] mb-8 max-w-xs">Initialize your first compute engine on the Nexora global grid.</p>
            <button onClick={() => toast("Click DEPLOY NEW to start!")} className="bauhaus-button">Initialize Process</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map(d => (
              <ProjectCard key={d._id} deployment={d} onLogs={() => onLogs(d._id, d.projectName)} onRollback={() => onRollback(d._id, d.projectName)} rolling={rollbackId === d._id} />
            ))}
          </div>
        ) : (
          <div className="bauhaus-card overflow-hidden divide-y divide-[#eaecf0]">
            {filtered.map(d => (
              <div key={d._id} className="flex items-center gap-6 px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
                <div className="w-10 h-10 bg-white border border-[#eaecf0] flex items-center justify-center rounded shadow-sm text-sm font-bold text-blue-600">{d.projectName.charAt(0).toUpperCase()}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-[#101828] truncate leading-tight uppercase tracking-tight">{d.projectName}</p>
                  <p className="text-[11px] font-semibold text-[#98a2b3] uppercase tracking-tighter">{d.repoUrl.replace(/\.git$/, '').split('/').slice(-2).join('/')}</p>
                </div>
                <div className="flex items-center gap-2"><StatusDot status={d.status} /><span className="text-[10px] font-bold text-[#101828] uppercase tracking-tight">{d.status}</span></div>
                <span className="text-[11px] font-bold text-[#98a2b3] uppercase tracking-tighter shrink-0">{timeAgo(d.createdAt)}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => onLogs(d._id, d.projectName)} className="p-2 border border-[#eaecf0] bg-white hover:border-blue-600 transition-colors"><Terminal className="w-4 h-4 text-[#667085]" /></button>
                  <button onClick={() => onRollback(d._id, d.projectName)} disabled={rollbackId === d._id || d.status !== 'success'} className="p-2 border border-[#eaecf0] bg-white hover:border-blue-600 transition-colors">
                    {rollbackId === d._id ? <Loader2 className="w-4 h-4 animate-spin text-[#667085]" /> : <RotateCcw className="w-4 h-4 text-[#667085]" />}
                  </button>
                  <ExternalLink className="w-4 h-4 text-[#eaecf0] group-hover:text-blue-600 transition-colors" />
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

  const handleRollback = async (id: string, name: string) => {
    if (!confirm(`Rollback "${name}"?`)) return;
    setRollbackId(id);
    try { await axios.post(`${API}/api/rollback`, { deploymentId: id }); toast.success('♻️ Rollback initiated'); fetchData(); }
    catch (e: any) { toast.error(e?.response?.data?.error || 'Rollback failed'); }
    finally { setRollbackId(null); }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold tracking-tighter uppercase text-blue-600"><Loader2 className="animate-spin mr-3" /> VERIFYING_STATE</div>;
  if (!user) return null;

  const navLabel = activeNav === 'projects' ? 'Overview' : NAV_ITEMS.find(n => n && n.id === activeNav)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-white text-[#101828] flex overflow-hidden">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 shrink-0 h-screen sticky top-0 flex flex-col border-r border-[#eaecf0] bg-white gap-2 p-3`}>
        {/* User context */}
        <div className="mb-4">
          <div className="flex items-center gap-3 p-2.5 hover:bg-[#f9fafb] cursor-pointer transition-all border border-transparent hover:border-[#eaecf0]">
             <div className="w-8 h-8 bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-black text-sm">{user.name.charAt(0).toUpperCase()}</span>
             </div>
             {sidebarOpen && (
               <div className="min-w-0 flex-1">
                 <p className="text-xs font-extrabold text-[#101828] truncate tracking-tight">{user.name.toUpperCase()}</p>
                 <p className="text-[10px] text-[#667085] font-bold uppercase tracking-tighter tracking-wider">Enterprise v4</p>
               </div>
             )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5">
          {NAV_ITEMS.map((item, idx) => {
            if (item === null) return <div key={`div-${idx}`} className="my-4 h-px bg-[#eaecf0]" />;
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 transition-all text-sm font-bold border-l-2 ${isActive ? 'bg-blue-50 text-blue-700 border-blue-600 shadow-sm shadow-blue-500/5' : 'text-[#667085] border-transparent hover:bg-[#f9fafb] hover:text-[#101828]'}`}>
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-[#98a2b3]'}`} />
                {sidebarOpen && (<span className="flex-1 text-left tracking-tight">{item.label}</span>)}
              </button>
            );
          })}
        </nav>

        {/* Action center */}
        <div className="mt-auto border-t border-[#eaecf0] pt-4 px-1 pb-2">
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3.5 px-2 py-2 text-xs font-bold text-[#667085] hover:text-[#101828] hover:bg-[#f9fafb] transition-all">
                  <Settings className="w-4 h-4" /> {sidebarOpen && 'System Settings'}
              </button>
              <button onClick={() => { logout(); router.push('/landing'); }} className="w-full flex items-center gap-3.5 px-2 py-2 text-xs font-bold text-[#667085] hover:text-red-600 hover:bg-red-50 transition-all">
                  <LogOut className="w-4 h-4" /> {sidebarOpen && 'Terminate Session'}
              </button>
            </div>
            {sidebarOpen && (
              <div className="mt-6">
                 <ThemeToggle />
              </div>
            )}
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Universal Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 h-16 border-b border-[#eaecf0] bg-white shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(v => !v)} className="p-2 text-[#98a2b3] hover:text-[#101828] hover:bg-[#f9fafb] transition-all"><LayoutGrid className="w-5 h-5" /></button>
            <div className="h-4 w-px bg-[#eaecf0]" />
            <button className="flex items-center gap-2 text-xs font-extrabold text-[#101828] uppercase tracking-widest hover:text-blue-600 transition-colors">
              Operational Domain: <span className="text-blue-600">Primary_Cluster</span> <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98a2b3]" />
                <input placeholder="Command Search..." className="h-9 w-48 text-xs font-bold bauhaus-input pl-9 pr-4 bg-[#f9fafb] hover:bg-[#f2f4f7] focus:bg-white transition-all border-[#eaecf0]" />
             </div>
             <button title="Notifications" className="p-2 text-[#98a2b3] hover:text-blue-600 transition-all"><Bell className="w-5 h-5" /></button>
             <button title="New Project" className="p-2 text-[#98a2b3] hover:text-blue-600 transition-all border-r border-[#eaecf0] pr-4"><Plus className="w-5 h-5" /></button>
             
             <div className="flex items-center gap-3 pl-2 group/user cursor-pointer relative" onClick={() => { logout(); router.push('/landing'); }}>
                <div className="text-right hidden sm:block">
                   <p className="text-[10px] font-black text-[#101828] uppercase leading-none">{user.name}</p>
                   <p className="text-[9px] font-bold text-red-600 uppercase tracking-tighter hover:underline">Logout</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                   <span className="text-white font-black text-xs">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-8 right-0 bg-[#101828] text-white text-[9px] px-2 py-1 font-bold uppercase tracking-widest opacity-0 group-hover:user:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                   Terminate Session
                </div>
             </div>
          </div>
        </header>

        {/* Viewport content */}
        <div className="flex-1 flex min-h-0 bg-white">
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

      {/* Persistence Interface (Logs) */}
      {logsDeployment && (
        <LogsModal deploymentId={logsDeployment.id} projectName={logsDeployment.name} onClose={() => setLogsDeployment(null)} />
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-bold tracking-tighter uppercase text-blue-600"><Loader2 className="animate-spin mr-3" /> VERIFYING_STATE</div>}>
      <DashboardContent />
    </Suspense>
  );
}
