import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Shield, BarChart3, Home, ArrowRight, Menu, X, Star, Mail, Send } from 'lucide-react';
import Button from '../components/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <Zap className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">SmartHome</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
                    <Link to="/about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">About</Link>
                    <a href="#contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="ghost" className="text-sm">Log in</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="primary" className="text-sm">Sign up</Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-4">
                    <a href="#features" className="block text-sm font-medium text-slate-400 hover:text-white">Features</a>
                    <Link to="/about" className="block text-sm font-medium text-slate-400 hover:text-white">About</Link>
                    <div className="pt-4 flex flex-col gap-3">
                        <Link to="/login" className="w-full">
                            <Button variant="outline" className="w-full justify-center">Log in</Button>
                        </Link>
                        <Link to="/signup" className="w-full">
                            <Button variant="primary" className="w-full justify-center">Sign up</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 group"
    >
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
            <Icon className="text-indigo-400" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const TestimonialCard = ({ name, role, text, rating, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 group flex flex-col h-full"
    >
        <div className="flex gap-1 mb-4">
            {[...Array(rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
            ))}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">"{text}"</p>
        <div className="flex items-center gap-3 mt-auto">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-semibold border border-indigo-500/20">
                {name.charAt(0)}
            </div>
            <div>
                <h4 className="text-white font-medium text-sm">{name}</h4>
                <p className="text-slate-500 text-xs">{role}</p>
            </div>
        </div>
    </motion.div>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30">
            <Navbar />

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full -z-10 opacity-50"></div>

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            Smart Energy Management v2.0
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
                            Master your home's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">energy efficiency</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Monitor usage, reduce costs, and optimize your smart devices with our advanced analytics dashboard. Real-time insights for a smarter home.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <Button className="h-12 px-8 text-base">
                                    Get Started <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" className="h-12 px-8 text-base">
                                    Live Demo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-slate-950 border-t border-slate-800/50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Everything you need</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Comprehensive tools to track, analyze, and optimize your home energy consumption in one simple interface.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={BarChart3}
                            title="Real-time Analytics"
                            description="Track energy consumption as it happens. Visualize trends with interactive charts and granular data."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Cost Estimation"
                            description="Predict your monthly bills based on current usage patterns and local energy rates (INR)."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Home}
                            title="Device Management"
                            description="Control smart devices directly from your dashboard. Automate schedules for maximum efficiency."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-slate-900/30 border-t border-slate-800/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Three simple steps to a smarter, more efficient home.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>

                        {[
                            { step: '01', title: 'Connect Devices', desc: 'Sync your smart appliances and meters seamlessly with our platform.' },
                            { step: '02', title: 'Analyze Usage', desc: 'Our algorithms identify patterns and highlight areas for potential savings.' },
                            { step: '03', title: 'Optimize & Save', desc: 'Set smart schedules to automatically reduce your energy footprint.' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10 text-center"
                            >
                                <div className="w-16 h-16 bg-slate-900 border-2 border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/10 text-xl font-bold text-indigo-400">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Clients Section */}
            <section className="py-12 border-t border-slate-800/50 bg-slate-950/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by innovative companies worldwide</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Acme Corp', 'GlobalTech', 'Nexus Systems', 'Innovate LLC', 'Smart Solutions'].map((client, i) => (
                            <div key={i} className="text-xl font-bold text-slate-400 font-serif flex items-center gap-2">
                                <Shield size={24} className="text-slate-500" />
                                {client}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-800/50 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10 opacity-30"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Loved by homeowners</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            See how our smart energy management system is transforming homes and reducing costs for users everywhere.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TestimonialCard
                            name="Sarah Jenkins"
                            role="Homeowner, California"
                            text="This dashboard completely changed how I manage my home's energy. I've reduced my monthly bill by 20% just by scheduling my smart devices correctly."
                            rating={5}
                            delay={0.1}
                        />
                        <TestimonialCard
                            name="David Chen"
                            role="Tech Enthusiast"
                            text="The real-time analytics are incredibly insightful. Being able to see exactly which appliance is drawing power helps me be much more conscious."
                            rating={5}
                            delay={0.2}
                        />
                        <TestimonialCard
                            name="Priya Patel"
                            role="Interior Designer"
                            text="Not only is it highly functional, but the interface is absolutely gorgeous. It feels like a premium product that belongs in a modern home."
                            rating={4}
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-slate-900/30 border-t border-slate-800/50 relative">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                        <p className="text-slate-400">Have questions about our SmartHome system? Drop us a message.</p>
                    </motion.div>
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" placeholder="How can we help?" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                            <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none" placeholder="Your message here..."></textarea>
                        </div>
                        <Button type="button" className="w-full justify-center h-12 text-base">
                            Send Message <Send size={18} className="ml-2" />
                        </Button>
                    </motion.form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <Zap className="text-white" size={20} />
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">SmartHome</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                                Empowering modern homes with intelligent energy management, real-time analytics, and seamless device control.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#features" className="hover:text-indigo-400 transition-colors block">Features</a></li>
                                <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors block">Dashboard</Link></li>
                                <li><Link to="/about" className="hover:text-indigo-400 transition-colors block">About Us</Link></li>
                                <li><a href="#testimonials" className="hover:text-indigo-400 transition-colors block">Reviews</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors block">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-indigo-400 transition-colors block">Terms & Conditions</Link></li>
                                <li><a href="#contact" className="hover:text-indigo-400 transition-colors block">Support</a></li>
                                <li><a href="#contact" className="hover:text-indigo-400 transition-colors block">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} SmartHome Systems. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Twitter</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">LinkedIn</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
