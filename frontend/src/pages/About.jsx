
import React from 'react';
import { Target, Shield, Zap, Award, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
            <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-bold text-space-dark mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
);

const About = () => {
    return (
        <div className="min-h-screen pt-24 bg-slate-50">
            {/* Hero Section */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[120px] -mr-20 -mt-20 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] -ml-20 -mb-20 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="inline-block py-2 px-6 rounded-full bg-accent-violet/10 text-accent-violet font-bold text-sm tracking-wider uppercase mb-6">
                        About AI Counsellor
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-space-dark mb-8 leading-tight">
                        Empowering Careers with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan">
                            Intelligent Guidance
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
                        We're on a mission to bridge the gap between education and industry using generative AI to provide personalized career paths for every student.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/explore" className="px-10 py-5 rounded-2xl bg-space-dark text-white font-bold text-lg hover:bg-space-light transition-all shadow-xl shadow-space-dark/20 flex items-center gap-3">
                            Start Your Journey <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-4 bg-white relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden shadow-inner relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                                alt="Team Working"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-space-dark p-8 rounded-[2rem] shadow-2xl animate-float">
                            <div className="text-4xl font-black text-white mb-1">10k+</div>
                            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Students Guided</div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-space-dark tracking-tight leading-tight">
                            Personalized Guidance <br />
                            <span className="text-accent-violet">Scalable for Everyone</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            Traditional career counseling is expensive and limited. AI Counsellor democratizes premium guidance by leveraging advanced AI models to understand your profile, interests, and aspirations instantly.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Zap, label: "Instant Analysis", text: "Get career recommendations in seconds using our AI engine." },
                                { icon: Shield, label: "Future Proof", text: "We analyze industry trends to suggest courses with longevity." },
                                { icon: Target, label: "Precision Matching", text: "Career paths tailored to your specific background and budget." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <item.icon className="text-accent-violet" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-space-dark mb-1">{item.label}</h4>
                                        <p className="text-slate-500 font-medium">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-32 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-space-dark mb-6">Our Core Principles</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                            Everything we build is centered around providing the most value to our community of learners.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Award}
                            title="Excellence"
                            description="We partner with industry leaders to ensure our course recommendations meet top-tier standards."
                            color="bg-gradient-to-tr from-amber-400 to-orange-500"
                        />
                        <FeatureCard
                            icon={BookOpen}
                            title="Accessibility"
                            description="Making premium education accessible to students of all backgrounds and financial statuses."
                            color="bg-gradient-to-tr from-emerald-400 to-teal-600"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Individual Focus"
                            description="No generic advice. Every recommendation is generated specifically for your unique profile."
                            color="bg-gradient-to-tr from-accent-violet to-purple-600"
                        />
                    </div>
                </div>
            </section>

            {/* Tech Stack Banner */}
            <section className="py-24 px-4 bg-space-dark text-white text-center overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-violet via-transparent to-transparent"></div>
                </div>

                <h3 className="text-2xl font-bold mb-12 relative z-10 opacity-70 tracking-widest uppercase">Built with Modern Tech</h3>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 relative z-10">
                    {['FastAPI', 'React', 'Tailwind CSS', 'Stripe', 'SQLite', 'OpenAI'].map((tech, i) => (
                        <div key={i} className="text-3xl font-black italic tracking-tighter opacity-30 hover:opacity-100 transition-opacity cursor-default uppercase">
                            {tech}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
