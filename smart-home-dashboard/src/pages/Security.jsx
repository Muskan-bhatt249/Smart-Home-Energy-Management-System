import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Camera, Lock } from 'lucide-react';
import { getSecurityLogs } from '../api/client';

const InsightCard = ({ title, status, icon: Icon, isWarning = false }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-lg ${!isWarning ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-500'}`}>
            <Icon size={24} />
        </div>
        <div>
            <h4 className="text-white font-medium text-sm">{title}</h4>
            <p className={`text-xs mt-1 ${!isWarning ? 'text-emerald-500' : 'text-amber-500'}`}>{status}</p>
        </div>
    </div>
);

// Helper to map event types to Icons
const getLogIcon = (type) => {
    if (type.includes('LOGIN')) return Lock;
    if (type.includes('CAMERA')) return Camera;
    if (type.includes('ALERT')) return Activity;
    return Shield;
};

const Security = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await getSecurityLogs();
                setLogs(res.data || []);
            } catch (err) {
                console.error("Failed to load security logs", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Security Monitoring</h1>
                <p className="text-slate-400 text-sm mt-1">Real-time status of your home's security systems.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <InsightCard title="System Status" status="Secure" icon={Shield} />
                <InsightCard title="Front Door" status="Locked" icon={Lock} />
                <InsightCard title="Cameras" status="Recording" icon={Camera} />
                <InsightCard title="Motion Sensors" status="Armed" icon={Activity} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-8 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                        <Shield size={40} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No active threats detected</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">Your home is currently secure. All automated systems are functioning within normal parameters.</p>
                </div>

                <div className="border-t border-slate-800 bg-slate-950/50 p-4">
                    <h4 className="text-sm font-semibold text-white mb-4 ml-2">Recent Activity Log</h4>

                    {isLoading ? (
                        <div className="text-center py-4 text-slate-500 text-sm">Loading logs...</div>
                    ) : (
                        <div className="space-y-3">
                            {logs.map((log) => {
                                const Icon = getLogIcon(log.eventType);
                                return (
                                    <div key={log.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Icon size={16} className="text-slate-500" />
                                            <div>
                                                <span className="text-sm text-slate-300 block">{log.details}</span>
                                                <span className="text-xs text-slate-600 uppercase tracking-widest">{log.eventType}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{log.timestamp}</span>
                                    </div>
                                );
                            })}

                            {logs.length === 0 && (
                                <div className="text-center py-6 text-slate-500 border border-dashed border-slate-800 rounded-lg text-sm">
                                    No security events recorded yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Security;
