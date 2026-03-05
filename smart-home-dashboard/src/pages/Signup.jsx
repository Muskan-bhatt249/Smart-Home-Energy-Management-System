import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Zap, ArrowRight, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../api/client';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        primaryRequirement: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        // Name Validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';

        // Phone Validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

        // Address Validation
        if (formData.address.length < 5) newErrors.address = 'Address is too short';

        // Password Validation
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 8+ chars, with number & special char';
        }

        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Requirement
        if (!formData.primaryRequirement) newErrors.primaryRequirement = 'Please select a primary goal';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        if (validate()) {
            setIsLoading(true);
            try {
                await register(formData);
                navigate('/login', { state: { message: 'Registration successful! Please login.' } });
            } catch (err) {
                setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 relative overflow-y-auto pt-20 pb-20">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-96 bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -z-0"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8 relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 border border-indigo-500/20">
                        <Zap className="text-indigo-400" size={20} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Create an account</h1>
                    <p className="text-slate-400 mt-2 text-sm text-center">
                        Join SmartHome to optimize your energy usage today.
                    </p>
                </div>

                {apiError && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-lg text-center flex items-center justify-center gap-2">
                        <AlertCircle size={18} />
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            icon={User}
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            icon={User}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            icon={Mail}
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            placeholder="9876543210"
                            maxLength={10}
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            icon={Phone}
                        />
                    </div>

                    <Input
                        label="Address"
                        name="address"
                        placeholder="1234 Main St, City, Country"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                        icon={MapPin}
                    />

                    {/* Security */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={Lock}
                        />
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            icon={Lock}
                        />
                    </div>

                    {/* Password Requirements Hint */}
                    <div className="text-xs text-slate-500 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                        Password must be at least 8 characters long and include a number, uppercase letter, and special character.
                    </div>

                    {/* Requirement Selection */}
                    <div>
                        <label className="saas-label mb-2">Primary Usage Requirement</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Energy Efficiency', 'Security', 'Comfort', 'Convenience'].map((req) => (
                                <div
                                    key={req}
                                    onClick={() => {
                                        setFormData({ ...formData, primaryRequirement: req });
                                        if (errors.primaryRequirement) setErrors({ ...errors, primaryRequirement: '' });
                                    }}
                                    className={`cursor-pointer border rounded-lg p-3 text-sm text-center font-medium transition-all ${formData.primaryRequirement === req
                                        ? 'bg-indigo-600 text-white border-indigo-500'
                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                >
                                    {req}
                                </div>
                            ))}
                        </div>
                        {errors.primaryRequirement && (
                            <p className="mt-1 text-xs text-red-500">{errors.primaryRequirement}</p>
                        )}
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full justify-center text-white py-3 ${isLoading ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                        >
                            {isLoading ? 'Creating Account...' : <><span className="mr-2">Create Account</span> <ArrowRight size={16} /></>}
                        </Button>
                    </div>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
