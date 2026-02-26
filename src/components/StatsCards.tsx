'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rocket, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Stats {
    total: number;
    success: number;
    failed: number;
    running: number;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const StatsCards: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ total: 0, success: 0, failed: 0, running: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${API}/api/stats`);
                setStats(data);
            } catch { /* silent */ } finally { setLoading(false); }
        };
        fetch();
        const interval = setInterval(fetch, 10000);
        return () => clearInterval(interval);
    }, []);

    const cards = [
        {
            label: 'Total Deployments',
            value: stats.total,
            icon: <Rocket className="w-5 h-5" />,
            color: 'indigo',
            gradient: 'from-indigo-600/20 to-violet-600/10',
            border: 'border-indigo-500/20',
            text: 'text-indigo-400',
        },
        {
            label: 'Successful',
            value: stats.success,
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: 'emerald',
            gradient: 'from-emerald-600/20 to-teal-600/10',
            border: 'border-emerald-500/20',
            text: 'text-emerald-400',
        },
        {
            label: 'Failed',
            value: stats.failed,
            icon: <XCircle className="w-5 h-5" />,
            color: 'rose',
            gradient: 'from-rose-600/20 to-pink-600/10',
            border: 'border-rose-500/20',
            text: 'text-rose-400',
        },
        {
            label: 'Running',
            value: stats.running,
            icon: <Loader2 className={`w-5 h-5 ${stats.running > 0 ? 'animate-spin' : ''}`} />,
            color: 'amber',
            gradient: 'from-amber-600/20 to-orange-600/10',
            border: 'border-amber-500/20',
            text: 'text-amber-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl p-5 backdrop-blur-xl transition-all hover:scale-[1.02]`}
                >
                    <div className={`flex items-center gap-2 ${card.text} mb-3`}>
                        {card.icon}
                        <span className="text-xs font-bold uppercase tracking-widest opacity-80">{card.label}</span>
                    </div>
                    <div className={`text-4xl font-extrabold ${card.text}`}>
                        {loading ? <Loader2 className="w-7 h-7 animate-spin opacity-50" /> : card.value}
                    </div>
                </div>
            ))}
        </div>
    );
};
