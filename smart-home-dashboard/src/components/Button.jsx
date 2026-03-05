import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm hover:shadow-indigo-500/20 focus:ring-indigo-500",
        secondary: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 focus:ring-slate-200", // For light contexts
        outline: "bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 focus:ring-slate-500",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800 focus:ring-slate-500",
        danger: "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
