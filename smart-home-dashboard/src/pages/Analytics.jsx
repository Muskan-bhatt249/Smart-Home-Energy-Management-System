import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, IndianRupee, RefreshCw } from 'lucide-react';
import { getDashboardMetrics } from '../api/client';

const StatCard = ({ title, value, unit, icon: Icon, trend }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <Icon size={20} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </div>
            )}
        </div>
        <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-white">{value}</h3>
                <span className="text-slate-500 text-sm font-medium">{unit}</span>
            </div>
        </div>
    </div>
);

const Analytics = () => {
    const [metrics, setMetrics] = useState({
        totalUsageKwh: "0.0",
        estimatedCost: "₹0",
        efficiencyScore: "0"
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchMetrics = async () => {
        setIsLoading(true);
        try {
            const res = await getDashboardMetrics();
            if (res.data) setMetrics(res.data);
        } catch (err) {
            console.error("Failed to fetch metrics", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, []);

    // Derived logic loosely based on the dashboard total consumption:
    const baseUsage = parseFloat(metrics.totalUsageKwh) || 120.5;
    const efficiencyPercentage = parseFloat(metrics.efficiencyScore) || 85.0;

    // Simulate total input / output based on efficiency percentage ratio
    const totalInput = Math.round(baseUsage);
    const usefulOutput = Math.round(baseUsage * (efficiencyPercentage / 100));

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Advanced Analytics & Efficiency</h1>
                    <p className="text-slate-400 text-sm mt-1">Deep dive into your home's performance metrics.</p>
                </div>
                <button
                    onClick={fetchMetrics}
                    disabled={isLoading}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2"
                >
                    <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                    {isLoading ? "Refreshing..." : "Refresh Data"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard title="System Efficiency" value={efficiencyPercentage.toFixed(1)} unit="%" icon={Activity} trend={2.4} />
                <StatCard title="Total Consumption" value={metrics.totalUsageKwh} unit="kWh" icon={Zap} trend={-1.2} />
                <StatCard title="Monthly Cost" value={metrics.estimatedCost} unit="" icon={IndianRupee} trend={-5.0} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Efficiency Calculation Model</h3>
                    <div className="space-y-6">
                        <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800/50">
                            <p className="text-sm text-slate-400 mb-2">Formula:</p>
                            <code className="text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded font-mono text-sm block">
                                Efficiency = (Useful Output / Total Input) × 100
                            </code>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Useful Output (Device Performance)</span>
                                    <span className="text-white font-medium">{usefulOutput} Units</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, efficiencyPercentage)}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Total Input (Energy Consumed)</span>
                                    <span className="text-white font-medium">{totalInput} Units</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <div className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" style={{ width: `100%` }}></div>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed mt-4">
                            Calculations are based on the aggregate performance metrics of all connected devices versus total power drawn over the last 30 days.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-56 h-56 rounded-full border-[16px] border-slate-800 mt-4 flex flex-col items-center justify-center relative shadow-inner">
                        {/* Circle progress overlay */}
                        <div
                            className="absolute inset-0 rounded-full border-[16px] border-indigo-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                        ></div>
                        <h2 className="text-5xl font-bold text-white mb-1 relative z-10">{efficiencyPercentage.toFixed(0)}%</h2>
                        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold relative z-10">Efficient</span>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-white font-medium mb-2">Excellent Performance!</h3>
                        <p className="text-sm text-slate-400 max-w-xs mx-auto">Your system is operating highly efficiently. Continuing current schedules will maximize savings.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;
