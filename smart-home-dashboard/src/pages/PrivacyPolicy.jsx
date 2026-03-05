import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-24 font-sans text-slate-300">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-indigo-400" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
                </motion.div>

                <div className="space-y-8 bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-2xl">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p className="mb-4">We collect information that you provide directly to us, including when you create an account, update your profile, use our interactive features, or communicate with us.</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400">
                            <li>Account information (name, email, phone number)</li>
                            <li>Energy usage data from connected smart devices</li>
                            <li>Interaction data with our dashboard</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="mb-4">We use the information we collect to operate, maintain, and improve our services, including to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400">
                            <li>Provide personalized energy-saving recommendations</li>
                            <li>Process transactions and send related information</li>
                            <li>Send technical notices, updates, and security alerts</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
                        <p>We implement robust security measures designed to protect your information from unauthorized access, disclosure, or destruction. We use industry-standard encryption protocols and regularly review our security practices.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at privacy@smarthomesystems.com or use the contact form on our homepage.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
