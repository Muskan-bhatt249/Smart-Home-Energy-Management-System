import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, IndianRupee, Database, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getEnergyGraphData, getDashboardMetrics } from '../api/client';

const Energy = () => {
    const [energyData, setEnergyData] = useState([]);
    const [metrics, setMetrics] = useState({ totalUsageKwh: '0', estimatedCost: '0' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [graphRes, metricsRes] = await Promise.all([
                    getEnergyGraphData(),
                    getDashboardMetrics()
                ]);
                if (graphRes.data) setEnergyData(graphRes.data);
                if (metricsRes.data) setMetrics(metricsRes.data);
            } catch (err) {
                console.error("Failed to fetch energy data", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Energy Tracking</h1>
                    <p className="text-slate-400 text-sm mt-1">Detailed view of your power consumption.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <Zap size={24} className="text-indigo-400" />
                        <h3 className="font-semibold text-white">Total Power Usage</h3>
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">{metrics.totalUsageKwh} <span className="text-lg text-slate-500 font-medium">kWh</span></div>
                    <p className="text-sm text-emerald-400">-5.2% compared to last period</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4 text-slate-400">
                        <IndianRupee size={24} className="text-amber-400" />
                        <h3 className="font-semibold text-white">Estimated Monthly Cost</h3>
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">{metrics.estimatedCost}</div>
                    <p className="text-sm text-emerald-400">On track for 15% savings goal</p>
                </div>
            </div>

            {/* Main Graph Area */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-semibold text-white">Consumption Over Time</h3>
                    <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded bg-indigo-500 shrink-0 text-white font-medium">Daily</button>
                        <button className="text-xs px-3 py-1.5 rounded bg-transparent hover:bg-slate-800 text-slate-400">Weekly</button>
                        <button className="text-xs px-3 py-1.5 rounded bg-transparent hover:bg-slate-800 text-slate-400">Monthly</button>
                    </div>
                </div>

                <div className="h-80 w-full mb-4">
                    {isLoading ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorKwhBig" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area type="monotone" dataKey="kwh" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorKwhBig)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

        </motion.div>
    );
};

export default Energy;
