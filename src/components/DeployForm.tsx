'use client';

import React, { useState, useEffect } from 'react';
import { Rocket, Github, Loader2, ArrowRight, Zap, Layers, Globe } from 'lucide-react';
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
            toast.success(`Deployment initialized for "${projectName}"`);
            setRepoUrl('');
            setProjectName('');
        } catch (error: any) {
            const msg = error?.response?.data?.error || 'Initialization failed.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
                    <Rocket className="text-white w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-[#101828] uppercase tracking-tighter italic leading-none">Initialize Engine</h2>
                    <p className="text-[10px] font-bold text-[#667085] uppercase mt-1 tracking-widest bg-[#f9fafb] px-2 py-0.5 border border-[#eaecf0] inline-block font-sans">
                       Clone • Build • Propagate
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] ml-1">Grid Target Name</label>
                    <input
                        type="text"
                        placeholder="E.G. PRODUCTION-CLUSTER-01"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bauhaus-input bg-white h-12 text-sm font-bold placeholder-[#d0d5dd]"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-[#98a2b3] uppercase tracking-[0.2em] ml-1">Source Endpoint (GitHub)</label>
                    <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98a2b3] w-4.5 h-4.5" />
                        <input
                            type="url"
                            placeholder="https://github.com/org/repository"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            className="w-full bauhaus-input pl-12 bg-white h-12 text-sm font-bold placeholder-[#d0d5dd]"
                            required
                        />
                    </div>
                </div>

                <div className="p-5 bg-[#f9fafb] border border-[#eaecf0] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-center px-4 relative z-10">
                        {[
                            { label: 'Source', icon: Github },
                            { label: 'Optimize', icon: Zap },
                            { label: 'Bundle', icon: Layers },
                            { label: 'Live', icon: Globe }
                        ].map((step, i, arr) => (
                            <React.Fragment key={step.label}>
                                <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                                    <step.icon className={`w-4 h-4 ${i === 0 && isLoading ? 'text-blue-600 animate-pulse' : 'text-[#98a2b3]'}`} />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#667085]">{step.label}</span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="flex-1 h-px bg-[#eaecf0] mx-2" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bauhaus-button py-5 text-sm font-black justify-center shadow-xl shadow-blue-500/10 group active:scale-[0.98] transition-transform"
                >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-3" /> : <Rocket className="w-5 h-5 mr-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                    {isLoading ? 'INITIATING ENGINE...' : 'INITIALIZE PRODUCTION LAUNCH'}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />}
                </button>
            </form>
        </div>
    );
};
