import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserPreferences, updateUserPreferences } from '../api/client';
import { Bell, Shield, Palette, CheckCircle, AlertCircle } from 'lucide-react';

const Settings = () => {
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        securityAlerts: true,
        theme: 'dark'
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await getUserPreferences();
                if (response.data) {
                    setPreferences({
                        emailNotifications: response.data.emailNotifications,
                        securityAlerts: response.data.securityAlerts,
                        theme: response.data.theme || 'dark'
                    });
                }
            } catch (err) {
                setError('Failed to load preferences.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPreferences();
    }, []);

    const handleToggle = async (key) => {
        const newPrefs = { ...preferences, [key]: !preferences[key] };
        setPreferences(newPrefs);

        // Auto-save on toggle
        setIsSaving(true);
        setMessage('');
        setError('');
        try {
            await updateUserPreferences(newPrefs);
            setMessage('Preferences updated!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError('Failed to save preferences.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-6"
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">System Settings</h1>
                <p className="text-slate-400 text-sm mt-1">Manage app appearance, notifications, and security alerts.</p>
            </div>

            {message && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-lg flex items-center gap-2 mb-6">
                    <CheckCircle size={18} />
                    {message}
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-lg flex items-center gap-2 mb-6">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm p-6">
                <h3 className="text-lg font-semibold text-white mb-6 border-b border-slate-800 pb-4">Application Preferences</h3>
                <div className="space-y-6">

                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                                <p className="text-xs text-slate-500 mt-1">Receive weekly efficiency metric summaries.</p>
                            </div>
                        </div>
                        <div
                            onClick={() => handleToggle('emailNotifications')}
                            className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${preferences.emailNotifications ? 'bg-indigo-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${preferences.emailNotifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                    {/* Security Alerts */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-white">Security Alerts</h4>
                                <p className="text-xs text-slate-500 mt-1">Get immediate emails for unusual account activity.</p>
                            </div>
                        </div>
                        <div
                            onClick={() => handleToggle('securityAlerts')}
                            className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${preferences.securityAlerts ? 'bg-indigo-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${preferences.securityAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
