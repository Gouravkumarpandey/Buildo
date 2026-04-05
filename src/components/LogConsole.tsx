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
                    background: '#000000',
                    foreground: '#ffffff',
                    cursor: '#FFD60A',
                    selectionBackground: '#8338EC',
                    black: '#000000',
                    red: '#FF006E',
                    green: '#3A86FF',
                    yellow: '#FFD60A',
                    blue: '#3A86FF',
                    magenta: '#8338EC',
                    cyan: '#3A86FF',
                    white: '#ffffff',
                },
                fontSize: 14,
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 0,
                lineHeight: 1.4,
                scrollback: 10000,
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
            term.writeln('\x1b[1;34m║   Nexora CI/CD Pipeline Console  ║\x1b[0m');
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
        <div className="flex flex-col h-full bg-black brutalist-card shadow-[6px_6px_0px_0px_#000] overflow-hidden">
            <div className="bg-[#8338EC] px-6 py-4 flex items-center justify-between border-b-2 border-black shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-black bg-[#FF006E]" />
                        <div className="w-3.5 h-3.5 border-2 border-black bg-[#FFD60A]" />
                        <div className="w-3.5 h-3.5 border-2 border-black bg-[#3A86FF]" />
                    </div>
                    <span className="text-[10px] font-black font-mono text-white tracking-widest uppercase">
                        {projectName ? `NEXORA://${projectName.toUpperCase().replace(/\s+/g, '-')}` : 'NEXORA://IDLE'}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {deploymentId && (
                        <div className="bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_#000]">
                             <span className="flex items-center gap-1.5 text-[9px] text-black font-black uppercase tracking-tighter">
                                <span className="inline-block w-2 h-2 border border-black bg-[#FF006E] animate-pulse" />
                                LIVE_STREAM
                            </span>
                        </div>
                    )}
                    <span className="text-[10px] uppercase font-black tracking-widest text-white italic">PIPELINE_OUTPUT</span>
                </div>
            </div>
            <div ref={terminalRef} className="flex-1 overflow-hidden" style={{ minHeight: 0 }} />
        </div>
    );
};
