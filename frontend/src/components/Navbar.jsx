
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, BookOpen, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent-violet blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-space-dark to-slate-900 flex items-center justify-center text-white shadow-xl ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                                <Compass size={20} className="text-accent-cyan" />
                            </div>
                        </div>
                        <span className="font-poppins font-bold text-xl tracking-tight text-space-dark">
                            AI<span className="text-accent-violet">Counsellor</span>
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLink to="/" current={location.pathname} label="Home" />
                        <NavLink to="/explore" current={location.pathname} label="Explore Courses" />
                        <NavLink to="/about" current={location.pathname} label="About" />
                    </div>

                    {/* CTA */}
                    <div className="flex items-center space-x-4">
                        <Link to="/explore" className="hidden md:flex items-center px-6 py-2.5 rounded-full bg-space-dark text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-slate-700/50">
                            <BookOpen size={16} className="mr-2" />
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, current, label }) => {
    const isActive = current === to;
    return (
        <Link to={to} className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'text-space-dark' : 'text-slate-500 hover:text-accent-violet'}`}>
            {label}
            {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-violet"></span>}
        </Link>
    );
}

export default Navbar;
