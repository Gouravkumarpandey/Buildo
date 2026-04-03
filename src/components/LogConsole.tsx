"use client";

import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

interface LogConsoleProps {
    deploymentId: string | null;
    projectName: string | null;
}

export const LogConsole: React.FC<LogConsoleProps> = ({ deploymentId, projectName }) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const termInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        // Dynamically import xterm to avoid SSR issues in Next.js
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
                cursorBlink: true,
                theme: {
                    background: '#0f172a',
                    foreground: '#cbd5e1',
                    cursor: '#6366f1',
                    selectionBackground: '#6366f1',
                },
                fontSize: 13,
                fontFamily: '"JetBrains Mono", "Fira Code", Menlo, monospace',
                letterSpacing: 0,
                lineHeight: 1.5,
                scrollback: 5000,
            });

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            term.open(terminalRef.current);

            // Key fix: defer fit() so the DOM has valid dimensions
            requestAnimationFrame(() => {
                try {
                    fitAddon.fit();
                } catch (e) {
                    // Dimensions not ready yet, will fit on resize
                }
            });

            // Also re-fit on window resize
            const handleResize = () => {
                try { fitAddon.fit(); } catch (e) { }
            };
            window.addEventListener('resize', handleResize);

            term.writeln('\x1b[1;34m╔══════════════════════════════════════╗\x1b[0m');
            term.writeln('\x1b[1;34m║   Buildo CI/CD Pipeline Console   ║\x1b[0m');
            term.writeln('\x1b[1;34m╚══════════════════════════════════════╝\x1b[0m');
            term.writeln('');

            termInstanceRef.current = { term, fitAddon, handleResize };

            if (deploymentId) {
                term.writeln('\x1b[33m[INFO]\x1b[0m Connecting to log stream...');

                // Fetch persisted logs first
                try {
                    const res = await fetch(`http://localhost:5000/api/deployments/${deploymentId}/logs`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.logs && data.logs.length > 0) {
                            term.writeln('\x1b[33m[INFO]\x1b[0m Loaded previous logs:');
                            data.logs.forEach((l: string) => term.writeln(l));
                            term.writeln('');
                        }
                    }
                } catch (e) {
                    // Server not ready yet or no logs, that's fine
                }

                // Connect WebSocket for live logs
                socket = io('http://localhost:5000', { transports: ['websocket'] });

                socket.on('connect', () => {
                    term.writeln('\x1b[1;32m[CONNECTED]\x1b[0m Live log stream established.');
                    term.writeln('');
                    socket.emit('join-logs', deploymentId);
                });

                socket.on('log', (message: string) => {
                    // Strip trailing newlines since xterm.writeln adds one
                    term.writeln(message.replace(/\n$/, ''));
                });

                socket.on('disconnect', () => {
                    term.writeln('');
                    term.writeln('\x1b[31m[DISCONNECTED]\x1b[0m Log stream closed.');
                });
            } else {
                term.writeln('\x1b[90m[IDLE]\x1b[0m Start a deployment to see live logs here.');
            }
        };

        init();

        return () => {
            if (socket) socket.disconnect();
            if (termInstanceRef.current) {
                window.removeEventListener('resize', termInstanceRef.current.handleResize);
                termInstanceRef.current.term.dispose();
                termInstanceRef.current = null;
            }
        };
    }, [deploymentId]);

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="bg-slate-800 px-6 py-3 flex items-center justify-between border-b border-slate-700/50 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                        {projectName ? `buildo://${projectName.toLowerCase().replace(/\s+/g, '-')}` : 'buildo://idle'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {deploymentId && (
                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                        </span>
                    )}
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Pipeline Logs</span>
                </div>
            </div>
            <div ref={terminalRef} className="flex-1 overflow-hidden" style={{ minHeight: 0 }} />
        </div>
    );
};
