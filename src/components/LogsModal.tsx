'use client';

import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { X } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface LogsModalProps {
    deploymentId: string;
    projectName: string;
    onClose: () => void;
}

export const LogsModal: React.FC<LogsModalProps> = ({ deploymentId, projectName, onClose }) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const termInstanceRef = useRef<any>(null);

    useEffect(() => {
        let term: any;
        let socket: any;

        const init = async () => {
            // Inject xterm CSS once
            if (!document.getElementById('xterm-css')) {
                const link = document.createElement('link');
                link.id = 'xterm-css';
                link.rel = 'stylesheet';
                link.href = 'https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.min.css';
                document.head.appendChild(link);
            }

            const { Terminal } = await import('xterm');
            const { FitAddon } = await import('xterm-addon-fit');
            if (!terminalRef.current) return;

            term = new Terminal({
                cursorBlink: false,
                theme: {
                    background: '#0f172a',
                    foreground: '#cbd5e1',
                    cursor: '#6366f1',
                },
                fontSize: 13,
                fontFamily: '"JetBrains Mono", "Fira Code", Menlo, monospace',
                lineHeight: 1.5,
                scrollback: 5000,
            });

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            term.open(terminalRef.current);
            requestAnimationFrame(() => { try { fitAddon.fit(); } catch (e) { } });

            term.writeln('\x1b[1;34m═══ Deployment Logs ═══\x1b[0m');
            term.writeln('');

            // Load existing logs
            try {
                const token = localStorage.getItem('buildo_token');
                const res = await fetch(`${API}/api/deployments/${deploymentId}/logs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.logs?.length > 0) {
                        data.logs.forEach((l: string) => term.writeln(l));
                    } else {
                        term.writeln('\x1b[90m[No logs stored yet]\x1b[0m');
                    }
                }
            } catch { term.writeln('\x1b[31m[Failed to load logs]\x1b[0m'); }

            // Connect live socket
            socket = io(API, { transports: ['websocket'] });
            socket.on('connect', () => {
                term.writeln('');
                term.writeln('\x1b[1;32m[LIVE]\x1b[0m Streaming live logs...');
                socket.emit('join-logs', deploymentId);
            });
            socket.on('log', (message: string) => term.writeln(message.replace(/\n$/, '')));

            termInstanceRef.current = { term, fitAddon };
        };

        init();
        return () => {
            if (socket) socket.disconnect();
            if (termInstanceRef.current) { termInstanceRef.current.term.dispose(); }
        };
    }, [deploymentId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
                className="relative w-full max-w-4xl h-[70vh] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-slate-800 px-6 py-3 flex items-center justify-between border-b border-slate-700/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                            logs://{projectName.toLowerCase().replace(/\s+/g, '-')}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div ref={terminalRef} className="flex-1 overflow-hidden" style={{ minHeight: 0 }} />
            </div>
        </div>
    );
};
