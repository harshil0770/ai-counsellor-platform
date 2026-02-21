
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Award, CheckCircle, Play } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen pt-16 overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-4 pt-20 pb-32">
                {/* Anti-gravity animated background blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-violet/30 rounded-full blur-[100px] animate-float opacity-70"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-blue/20 rounded-full blur-[120px] animate-float-delayed opacity-60"></div>
                    <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-accent-cyan/20 rounded-full blur-[80px] animate-float opacity-50"></div>
                </div>

                <div className="relative max-w-7xl mx-auto text-center z-10 flex flex-col items-center">

                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass-panel mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0s' }}>
                        <Sparkles size={16} className="text-accent-violet mr-2 fill-accent-violet/20" />
                        <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent-violet to-accent-blue tracking-wide">
                            AI-POWERED COUNSELLING V1.0
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-space-dark mb-6 leading-[1.1] tracking-tight animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
                        Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan">Guidance</span> <br />
                        is Here.
                    </h1>

                    {/* Subheadline */}
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10 leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                        Navigate your career path with our intelligent Agentic AI.
                        Get personalized course recommendations, check eligibility, and book sessions — all in seconds.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
                        <Link to="/explore" className="group px-8 py-4 rounded-full bg-space-dark text-white font-semibold shadow-lg shadow-space-dark/25 hover:shadow-2xl hover:shadow-accent-violet/20 hover:-translate-y-1 transition-all duration-300 flex items-center relative overflow-hidden">
                            <span className="relative z-10 flex items-center">Explore Courses <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-violet to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>

                        <button className="group px-8 py-4 rounded-full bg-white text-space-dark font-semibold shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/60 flex items-center backdrop-blur-sm">
                            <Play size={18} className="mr-2 fill-space-dark" />
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats / Trust Markers */}
                    <div className="mt-20 pt-10 border-t border-slate-200/60 grid grid-cols-3 gap-8 md:gap-20 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-space-dark">500+</h4>
                            <p className="text-slate-500 text-sm mt-1">Premium Courses</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-space-dark">24/7</h4>
                            <p className="text-slate-500 text-sm mt-1">AI Support</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-space-dark">10k+</h4>
                            <p className="text-slate-500 text-sm mt-1">Students Guided</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-4 py-24 bg-white relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-space-dark mb-4">Why Choose Us?</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">We combine advanced AI technology with human-centric design to provide the best counseling experience.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Target className="text-white" size={32} />}
                            title="Hyper-Personalized"
                            description="Our AI analyzes your unique profile, interests, and financial goals to recommend the perfect career path."
                            color="bg-accent-violet"
                            delay="0s"
                        />
                        <FeatureCard
                            icon={<Award className="text-white" size={32} />}
                            title="Industry Certified"
                            description="Access a curated library of over 500+ courses that meet global industry standards."
                            color="bg-accent-blue"
                            delay="0.2s"
                        />
                        <FeatureCard
                            icon={<CheckCircle className="text-white" size={32} />}
                            title="Instant Booking"
                            description="Seamlessly book counselling sessions and secure your spot with our integrated payment system."
                            color="bg-accent-cyan"
                            delay="0.4s"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, color, delay }) => (
    <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 hover:from-accent-violet/20 hover:to-accent-blue/20 transition-all duration-500 group drop-shadow-xl hover:drop-shadow-2xl hover:-translate-y-2" style={{ transitionDelay: '0s' }}>
        <div className="bg-white rounded-[2.3rem] p-8 h-full flex flex-col items-start border border-slate-100 relative overflow-hidden">
            <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-space-dark mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-violet group-hover:to-accent-blue transition-all">{title}</h3>
            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">{description}</p>

            {/* Decoration */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>
        </div>
    </div>
);

export default Home;
