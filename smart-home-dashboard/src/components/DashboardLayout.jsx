import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Zap, Settings, Bell, Search, LogOut, Home, Shield, Activity, Menu, User as UserIcon } from 'lucide-react';
import { getUserProfile } from '../api/client';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({ firstName: 'User', lastName: '', email: 'Loading...' });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Zap, label: 'Energy', path: '/dashboard/energy' },
        { icon: Home, label: 'Devices', path: '/dashboard/devices' },
        { icon: Shield, label: 'Security', path: '/dashboard/security' },
        { icon: Activity, label: 'Analytics', path: '/dashboard/analytics' },
        { icon: UserIcon, label: 'Profile', path: '/dashboard/profile' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-30">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Zap className="text-white" size={18} />
                    </div>
                    <span className="text-lg font-bold text-slate-100 tracking-tight">
                        SmartHome
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                <div className="px-3 mb-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</p>
                </div>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-indigo-500/10 text-indigo-400'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                                }`}
                        >
                            <item.icon size={18} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-800">
                <Link to="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-semibold text-sm border border-slate-700">
                        {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || ''}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-200 truncate">{user.firstName} {user.lastName}</h4>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); handleLogout(); }} className="focus:outline-none">
                        <LogOut size={16} className="text-slate-500 hover:text-red-400 transition-colors" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

const DashboardFooter = () => (
    <footer className="py-6 border-t border-slate-800 bg-slate-950 px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} SmartHome Systems. Version 2.0.1</p>
        <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
        </div>
    </footer>
);

const Header = () => {
    return (
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
            {/* Search */}
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-600 transition-all"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
                </button>
                <div className="h-6 w-px bg-slate-800 mx-2"></div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
                    Add Device
                </button>
            </div>
        </header>
    );
};

const DashboardLayout = () => {
    return (
        <div className="bg-slate-950 min-h-screen text-slate-200 font-sans flex">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8 pb-8">
                        <Outlet />
                    </div>
                </main>
                <DashboardFooter />
            </div>
        </div>
    );
};

export default DashboardLayout;
