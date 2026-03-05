import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Zap, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { login, verifyOTP, forgotPassword } from '../api/client';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        const { type, name, value } = e.target;
        const fieldName = name || type; // Fallback to type if name is not provided
        setFormData({ ...formData, [fieldName]: value });
        if (errors[fieldName]) {
            setErrors({ ...errors, [fieldName]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password Validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        setApiSuccess('');
        if (showOTP) {
            handleVerifyOTP();
            return;
        }

        if (validate()) {
            setIsLoading(true);
            try {
                const response = await login(formData.email, formData.password);
                setApiSuccess(response.data.message);
                setShowOTP(true);
            } catch (err) {
                setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            setErrors({ ...errors, otp: 'OTP is required' });
            return;
        }
        setIsLoading(true);
        try {
            const response = await verifyOTP(formData.email, otp);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            setApiError(err.response?.data?.message || 'OTP Verification failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setErrors({ ...errors, email: 'Please enter your email to reset password.' });
            return;
        }
        setApiError('');
        setApiSuccess('');
        setIsLoading(true);
        try {
            const response = await forgotPassword(formData.email);
            setApiSuccess(response.data.message);
        } catch (err) {
            setApiError('Failed to send reset link.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-indigo-600/10 blur-[100px] rounded-full -translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-8 relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/20">
                        <Zap className="text-indigo-400" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-slate-400 mt-2 text-sm">Sign in to your dashboard</p>
                </div>

                {apiError && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                        {apiError}
                    </div>
                )}
                {apiSuccess && (
                    <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-lg text-center">
                        {apiSuccess}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!showOTP ? (
                        <>
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                icon={Mail}
                            />

                            <div>
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
                                <div className="flex justify-end mt-1">
                                    <button type="button" onClick={handleForgotPassword} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-none cursor-pointer">
                                        Forgot password?
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <Input
                                label="Enter OTP"
                                name="otp"
                                type="text"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                    if (errors.otp) setErrors({ ...errors, otp: '' });
                                }}
                                error={errors.otp}
                                icon={Lock}
                            />
                            <div className="flex justify-between mt-1 items-center">
                                <button type="button" onClick={() => setShowOTP(false)} className="text-xs font-medium text-slate-400 hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer">
                                    Back to Login
                                </button>
                                <p className="text-xs text-slate-500">Hint: use 123456</p>
                            </div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full justify-center text-white mt-2 ${isLoading ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                    >
                        {isLoading ? 'Processing...' : <><span className="mr-2">{showOTP ? 'Verify OTP' : 'Sign in'}</span> <ArrowRight size={16} /></>}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account?
                        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>

            <div className="absolute bottom-6 text-center w-full">
                <p className="text-xs text-slate-600">
                    &copy; 2026 Smart Energy Systems. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
