import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Thermometer, Droplets, Wifi, ArrowUp, ArrowDown, MoreHorizontal, Activity, Home, IndianRupee, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getDashboardMetrics, getEnergyGraphData, getDevices } from '../api/client';

// Helper to map string icon names from API to Lucide components
const getIconComponent = (iconName) => {
    switch (iconName) {
        case 'Thermometer': return Thermometer;
        case 'Zap': return Zap;
        case 'Droplets': return Droplets;
        case 'Wifi': return Wifi;
        case 'Monitor': return Monitor;
        default: return Activity;
    }
};

const QuickControlCard = ({ name, room, isActive, icon: Icon }) => (
    <div className={`p-5 rounded-xl border transition-all cursor-pointer ${isActive ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl flex items-center justify-center ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                <Icon size={20} />
            </div>
            <div className={`w-11 h-6 rounded-full p-1 transition-colors flex items-center ${isActive ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </div>
        <h4 className="text-white font-medium text-sm mb-1">{name}</h4>
        <p className="text-slate-500 text-xs">{room}</p>
    </div>
);

const StatCard = ({ title, value, unit, icon: Icon, trend }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <Icon size={20} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {Math.abs(trend)}%
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

const DeviceRow = ({ name, room, status, icon: Icon }) => (
    <div className="flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-lg transition-colors border-b border-slate-800/50 last:border-0">
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${status === 'On' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                <Icon size={18} />
            </div>
            <div>
                <h4 className="text-sm font-medium text-slate-200">{name}</h4>
                <p className="text-xs text-slate-500">{room}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${status === 'On' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                {status}
            </span>
            <button className="text-slate-500 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
            </button>
        </div>
    </div>
);

const DashboardHome = () => {
    const [metrics, setMetrics] = useState({
        totalUsageKwh: "0.0",
        estimatedCost: "₹0",
        averageTemp: "0",
        efficiencyScore: "0",
        activeDevices: 0,
        totalDevices: 0
    });
    const [energyData, setEnergyData] = useState([]);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [metricsRes, energyRes, devicesRes] = await Promise.all([
                    getDashboardMetrics(),
                    getEnergyGraphData(),
                    getDevices()
                ]);

                if (metricsRes.data) setMetrics(metricsRes.data);
                if (energyRes.data) setEnergyData(energyRes.data);
                if (devicesRes.data) setDevices(devicesRes.data.slice(0, 6)); // Top 6 for quick controls/list
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            }
        };

        fetchDashboardData();
    }, []);

    // Determine greeting based on time
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">{greeting}</h1>
                    <p className="text-slate-400 text-sm mt-1">Here's your home's energy overview today.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Usage" value={metrics.totalUsageKwh} unit="kWh" icon={Zap} trend={-5.5} />
                <StatCard title="Est. Cost" value={metrics.estimatedCost} unit="" icon={IndianRupee} trend={-2.4} />
                <StatCard title="Avg Temp" value={metrics.averageTemp} unit="°C" icon={Thermometer} trend={0.5} />
                <StatCard title="Efficiency" value={metrics.efficiencyScore} unit="%" icon={Activity} trend={1.2} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Device Controls Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-white">Quick Controls</h3>
                        <Link to="/dashboard/devices" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">View All Devices</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {devices.map((device) => (
                            <QuickControlCard
                                key={device.id}
                                name={device.name}
                                room={device.room}
                                isActive={device.status === 'On'}
                                icon={getIconComponent(device.iconName)}
                            />
                        ))}
                        {devices.length === 0 && (
                            <div className="col-span-full py-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
                                No devices found. Add a device to see quick controls.
                            </div>
                        )}
                    </div>

                    {/* Energy Consumption Graph */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-white">Energy Consumption Layout</h3>
                            <button className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors">
                                Export Data
                            </button>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
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
                                    <Area type="monotone" dataKey="kwh" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorKwh)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Active Devices */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-white">Device Status</h3>
                            <Link to="/dashboard/devices" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View All</Link>
                        </div>
                        <div className="p-2">
                            {devices.slice(0, 4).map(d => (
                                <DeviceRow
                                    key={`list-${d.id}`}
                                    name={d.name}
                                    room={d.room}
                                    status={d.status}
                                    icon={getIconComponent(d.iconName)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Cost Alert */}
                    <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                <IndianRupee size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Bill Projection</h3>
                                <p className="text-slate-400 text-xs mt-1 mb-3">
                                    Projected to range between <span className="text-white font-medium">₹2,400 - ₹2,800</span> this month.
                                </p>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full w-[70%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardHome;
