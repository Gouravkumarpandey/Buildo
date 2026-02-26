'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DeployForm } from '@/components/DeployForm';
import { LogConsole } from '@/components/LogConsole';
import { DeploymentHistory } from '@/components/DeploymentHistory';
import { StatsCards } from '@/components/StatsCards';
import {
  Activity, LayoutDashboard, History, LogOut, GitBranch, ExternalLink, Loader2
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

function DashboardContent() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeDeployment, setActiveDeployment] = useState<{ id: string; name: string } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Read query params from repos page "Deploy Now" button
  const initialRepoUrl = searchParams.get('repoUrl') || '';
  const initialProjectName = searchParams.get('name') || '';

  useEffect(() => {
    if (!loading && !user) {
      router.push('/landing');
    }
  }, [user, loading, router]);

  // Show toast if pre-filled from repos
  useEffect(() => {
    if (initialRepoUrl && initialProjectName) {
      toast('📋 Repo pre-filled! Hit Deploy Now to start.', { icon: '💡' });
    }
  }, [initialRepoUrl, initialProjectName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
      </div>
    );
  }

  if (!user) return null;

  const handleDeployStarted = (id: string, name: string) => {
    setActiveDeployment({ id, name });
    setRefreshKey(k => k + 1);
    // Clear query params after deploy starts
    router.replace('/');
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_55%)] pointer-events-none" />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 flex flex-col items-center py-8 bg-black/25 border-r border-white/5 backdrop-blur-3xl z-10 shrink-0">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/40 mb-10">
            <Activity className="text-white w-6 h-6" />
          </div>
          <nav className="flex flex-col gap-6 flex-1">
            <Link href="/" title="Dashboard"
              className="text-indigo-400 p-2.5 rounded-xl bg-indigo-500/10 transition-colors hover:bg-indigo-500/20">
              <LayoutDashboard size={22} />
            </Link>
            <Link href="/repos" title="Repositories"
              className="text-slate-500 hover:text-slate-300 p-2.5 rounded-xl transition-colors hover:bg-white/5">
              <GitBranch size={22} />
            </Link>
            <Link href="/history" title="History"
              className="text-slate-500 hover:text-slate-300 p-2.5 rounded-xl transition-colors hover:bg-white/5">
              <History size={22} />
            </Link>
          </nav>
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="text-slate-500 hover:text-rose-400 p-2.5 rounded-xl transition-colors hover:bg-rose-500/10"
            title={`Logout (${user.name})`}
          >
            <LogOut size={22} />
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto z-10 p-6 lg:p-10 relative">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                AutoDeploy <span className="text-indigo-400">v1</span>
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">GitHub-to-Live CI/CD Pipeline</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 capitalize">{user.role}</p>
                </div>
              </div>
              <Link href="/history"
                className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                History <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </header>

          {/* Stats */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-1">
            <div className="space-y-6">
              <DeployForm
                onDeployStarted={handleDeployStarted}
                initialRepoUrl={initialRepoUrl}
                initialProjectName={initialProjectName}
              />
              <DeploymentHistory refreshKey={refreshKey} />
            </div>

            <div className="flex flex-col min-h-[500px]">
              <LogConsole
                deploymentId={activeDeployment?.id || null}
                projectName={activeDeployment?.name || null}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Wrap with Suspense because useSearchParams requires it in Next.js 14
export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
