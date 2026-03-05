import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-24 font-sans text-slate-300">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Home className="text-indigo-400" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">About SmartHome Systems</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">Revolutionizing the way you interact with your home, one smart device at a time.</p>
                </motion.div>

                <div className="space-y-8 bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-2xl">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                        <p className="mb-4 leading-relaxed">At SmartHome Systems, our mission is to empower homeowners with intelligent, intuitive tools to manage their energy consumption, enhance their security, and improve their overall living experience while contributing to a sustainable future.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Journey</h2>
                        <p className="mb-4 leading-relaxed">Founded in 2024, what started as a small project to monitor personal energy usage quickly evolved into a comprehensive platform. Today, we serve thousands of households, integrating seamlessly with cutting-edge IoT devices to bring true automation and insight directly to your fingertips.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-400 font-bold mt-1">•</span>
                                <div><strong className="text-white block">Real-time Analytics</strong> Immediate insights into your consumption.</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-400 font-bold mt-1">•</span>
                                <div><strong className="text-white block">Data Privacy</strong> State-of-the-art security protecting your personal data.</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-400 font-bold mt-1">•</span>
                                <div><strong className="text-white block">Seamless Integration</strong> Works with your existing devices.</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-400 font-bold mt-1">•</span>
                                <div><strong className="text-white block">24/7 Support</strong> We are always here to help you get the most out of your home.</div>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
