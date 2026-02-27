'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Terminal, ChevronDown } from 'lucide-react';
import { LogsModal } from '../LogsModal';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Deployment { _id: string; projectName: string; status: string; createdAt: string; }

export function LogsView() {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [selected, setSelected] = useState<Deployment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API}/api/deployments?limit=50`)
            .then(r => { const d = r.data.deployments || r.data; setDeployments(d); if (d[0]) setSelected(d[0]); })
            .catch(() => { }).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-zinc-500 w-6 h-6" /></div>;

    return (
        <div className="flex-1 p-6 min-w-0 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-white">Logs</h1>
                        <p className="text-sm text-zinc-500 mt-0.5">Select a deployment to view its build & runtime logs</p>
                    </div>
                    {deployments.length > 0 && (
                        <div className="relative">
                            <select
                                value={selected?._id || ''}
                                onChange={e => setSelected(deployments.find(d => d._id === e.target.value) || null)}
                                className="appearance-none bg-zinc-900 border border-zinc-700 text-white text-sm rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:border-zinc-500 cursor-pointer"
                            >
                                {deployments.map(d => (
                                    <option key={d._id} value={d._id}>{d.projectName} — {new Date(d.createdAt).toLocaleString()}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                    )}
                </div>

                {deployments.length === 0 ? (
                    <div className="text-center py-20">
                        <Terminal className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                        <p className="text-white font-medium mb-1">No deployments yet</p>
                        <p className="text-sm text-zinc-500">Deploy a project to see logs here.</p>
                    </div>
                ) : selected ? (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                            <Terminal className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm font-medium text-white">{selected.projectName}</span>
                            <span className="text-xs text-zinc-500 ml-auto">{new Date(selected.createdAt).toLocaleString()}</span>
                        </div>
                        <LogsInline deploymentId={selected._id} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function LogsInline({ deploymentId }: { deploymentId: string }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setLogs([]);
        const es = new EventSource(`${API}/api/deployments/${deploymentId}/logs/stream`);
        es.onmessage = e => {
            try { const d = JSON.parse(e.data); if (d.log) setLogs(prev => [...prev, d.log]); } catch { setLogs(prev => [...prev, e.data]); }
        };
        es.onerror = () => { es.close(); setLoading(false); };
        es.onopen = () => setLoading(false);
        return () => es.close();
    }, [deploymentId]);

    return (
        <div className="p-4 font-mono text-xs text-green-400 min-h-[300px] max-h-[500px] overflow-y-auto">
            {loading && <Loader2 className="animate-spin text-zinc-600 w-5 h-5" />}
            {logs.length === 0 && !loading && <span className="text-zinc-600">No logs yet for this deployment.</span>}
            {logs.map((line, i) => <div key={i} className="leading-5 whitespace-pre-wrap break-all">{line}</div>)}
        </div>
    );
}
