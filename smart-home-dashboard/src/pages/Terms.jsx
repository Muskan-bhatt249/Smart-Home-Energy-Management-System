import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-24 font-sans text-slate-300">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>

                <div className="space-y-8 bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-2xl leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using SmartHome Systems, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Provision of Services</h2>
                        <p>You agree and acknowledge that SmartHome Systems is entitled to modify, improve or discontinue any of its services at its sole discretion and without notice to you even if it may result in you being prevented from accessing any information contained in it.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                        <p>You are responsible for maintaining the confidentiality of any login information associated with any account you use to access our Resources. Accordingly, you are responsible for all activities that occur under your account/s.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
