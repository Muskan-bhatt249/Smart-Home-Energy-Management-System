import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Zap, Droplets, Wifi, Activity, Edit2, Trash2, Plus, Monitor } from 'lucide-react';
import { getDevices, addDevice, deleteDevice } from '../api/client';
import Button from '../components/Button';
import Input from '../components/Input';

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

const DeviceManagement = () => {
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDevice, setNewDevice] = useState({ name: '', type: '', room: '', status: 'Off', powerRating: '0 W', iconName: 'Activity' });

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const res = await getDevices();
            setDevices(res.data);
        } catch (error) {
            console.error("Failed to fetch devices", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDevice(newDevice);
            setShowAddModal(false);
            setNewDevice({ name: '', type: '', room: '', status: 'Off', powerRating: '0 W', iconName: 'Activity' });
            fetchDevices();
        } catch (error) {
            console.error("Failed to add device", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            try {
                await deleteDevice(id);
                fetchDevices();
            } catch (error) {
                console.error("Failed to delete device", error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 relative"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Device Management</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage and monitor all connected smart devices.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                    <Plus size={16} /> Add Device
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-medium tracking-wider">Device</th>
                                    <th className="px-6 py-4 font-medium tracking-wider">Room</th>
                                    <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                                    <th className="px-6 py-4 font-medium tracking-wider">Current Power</th>
                                    <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50 text-slate-300">
                                {devices.map((device) => {
                                    const Icon = getIconComponent(device.iconName);
                                    return (
                                        <tr key={device.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                                        <Icon size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{device.name}</p>
                                                        <p className="text-xs text-slate-500">{device.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{device.room}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${device.status === 'On' ? 'bg-emerald-500/10 text-emerald-400' :
                                                    device.status === 'Standby' ? 'bg-amber-500/10 text-amber-400' :
                                                        'bg-slate-800 text-slate-400'
                                                    }`}>
                                                    {device.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{device.powerRating || '0 W'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleDelete(device.id)} className="p-2 text-slate-500 hover:text-rose-400 transition-colors border border-transparent hover:border-rose-500/30 rounded-lg bg-slate-950 hover:bg-slate-900">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {devices.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-slate-500">
                                            No devices found. Click "Add Device" to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Device Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-xl"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Add New Device</h2>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <Input label="Device Name" name="name" value={newDevice.name} onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })} required placeholder="e.g. Living Room AC" />
                            <Input label="Device Type" name="type" value={newDevice.type} onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })} required placeholder="e.g. Climate, Lighting" />
                            <Input label="Room" name="room" value={newDevice.room} onChange={(e) => setNewDevice({ ...newDevice, room: e.target.value })} required placeholder="e.g. Living Room, Bedroom" />
                            <Input label="Power Rating" name="powerRating" value={newDevice.powerRating} onChange={(e) => setNewDevice({ ...newDevice, powerRating: e.target.value })} placeholder="e.g. 45 W, 1.2 kW" />

                            <div>
                                <label className="saas-label mb-1">State</label>
                                <select value={newDevice.status} onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })} className="saas-input w-full">
                                    <option value="On">On</option>
                                    <option value="Off">Off</option>
                                    <option value="Standby">Standby</option>
                                </select>
                            </div>
                            <div>
                                <label className="saas-label mb-1">Icon</label>
                                <select value={newDevice.iconName} onChange={(e) => setNewDevice({ ...newDevice, iconName: e.target.value })} className="saas-input w-full">
                                    <option value="Activity">Default (Activity)</option>
                                    <option value="Thermometer">Thermometer (AC/Heater)</option>
                                    <option value="Zap">Zap (Lights/Power)</option>
                                    <option value="Droplets">Droplets (Water)</option>
                                    <option value="Wifi">WiFi (Smart TV/Router)</option>
                                    <option value="Monitor">Monitor (Displays)</option>
                                </select>
                            </div>

                            <div className="flex gap-3 justify-end pt-4 mt-6 border-t border-slate-800">
                                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                                <Button type="submit">Save Device</Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default DeviceManagement;
