import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, ArrowRight, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../api/client';
import Input from '../components/Input';
import Button from '../components/Button';

const UserProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        primaryRequirement: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setFormData({
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    address: response.data.address || '',
                    primaryRequirement: response.data.primaryRequirement || 'Energy Efficiency'
                });
            } catch (err) {
                setError('Failed to load user profile. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setMessage('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        setError('');

        try {
            // We pass the updatable fields as expected by UpdateProfileRequest
            await updateUserProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                address: formData.address,
                primaryRequirement: formData.primaryRequirement
            });
            setMessage('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
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
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Profile</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your personal information.</p>
                </div>
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="First Name"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            icon={User}
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            icon={User}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="opacity-70 cursor-not-allowed transition-opacity group">
                            <Input
                                label="Email Address (cannot be changed)"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={() => { }}
                                icon={Mail}
                                disabled={true}
                            />
                        </div>
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            placeholder="9876543210"
                            maxLength={10}
                            value={formData.phone}
                            onChange={handleChange}
                            icon={Phone}
                        />
                    </div>

                    <Input
                        label="Address"
                        name="address"
                        placeholder="1234 Main St, City, Country"
                        value={formData.address}
                        onChange={handleChange}
                        icon={MapPin}
                    />

                    <div>
                        <label className="saas-label mb-2">Primary Usage Requirement</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['Energy Efficiency', 'Security', 'Comfort', 'Convenience'].map((req) => (
                                <div
                                    key={req}
                                    onClick={() => setFormData({ ...formData, primaryRequirement: req })}
                                    className={`cursor-pointer border rounded-lg p-3 text-sm text-center font-medium transition-all ${formData.primaryRequirement === req
                                        ? 'bg-indigo-600 text-white border-indigo-500'
                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                >
                                    {req}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className={`px-6 py-2 ${isSaving ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default UserProfile;
