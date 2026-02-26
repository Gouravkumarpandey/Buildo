'use client';

import React, { useState, useEffect } from 'react';
import { Rocket, Github, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface DeployFormProps {
    onDeployStarted: (deploymentId: string, projectName: string) => void;
    initialRepoUrl?: string;
    initialProjectName?: string;
}

export const DeployForm: React.FC<DeployFormProps> = ({ onDeployStarted, initialRepoUrl = '', initialProjectName = '' }) => {
    const [repoUrl, setRepoUrl] = useState(initialRepoUrl);
    const [projectName, setProjectName] = useState(initialProjectName);
    const [isLoading, setIsLoading] = useState(false);

    // Update fields if parent passes new initial values (e.g., from repos page)
    useEffect(() => {
        if (initialRepoUrl) setRepoUrl(initialRepoUrl);
        if (initialProjectName) setProjectName(initialProjectName);
    }, [initialRepoUrl, initialProjectName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!repoUrl || !projectName) return;

        setIsLoading(true);
        try {
            const response = await axios.post(`${API}/api/deploy`, {
                projectName,
                repoUrl,
                deployTarget: 'docker',
            });
            onDeployStarted(response.data.deploymentId, projectName);
            toast.success(`🚀 Deployment started for "${projectName}"`);
            setRepoUrl('');
            setProjectName('');
        } catch (error: any) {
            const msg = error?.response?.data?.error || 'Failed to start deployment.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
                    <Rocket className="text-white w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">New Deployment</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Clone → Build → Deploy in seconds</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Project Name</label>
                    <input
                        type="text"
                        placeholder="e.g. my-awesome-app"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all placeholder-slate-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">GitHub Repository URL</label>
                    <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                            type="url"
                            placeholder="https://github.com/user/repo"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            className="w-full bg-slate-900/60 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all placeholder-slate-600"
                            required
                        />
                    </div>
                </div>

                {/* Pipeline Steps Indicator */}
                <div className="flex items-center gap-2 py-3 px-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    {['Clone', 'Build', 'Deploy', 'Live'].map((step, i, arr) => (
                        <React.Fragment key={step}>
                            <span className={`text-xs font-semibold ${i === 0 && isLoading ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`}>{step}</span>
                            {i < arr.length - 1 && <span className="text-slate-700 text-xs flex-1 text-center">──→</span>}
                        </React.Fragment>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transform transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Rocket className="w-5 h-5" />}
                    {isLoading ? 'Starting Pipeline...' : 'Deploy Now →'}
                </button>
            </form>
        </div>
    );
};
