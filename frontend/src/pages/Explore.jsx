
import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';
import { Search, Clock, Zap, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecommendationModal from '../components/RecommendationModal';

const Explore = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: '', max_fees: '', duration: '' });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [showRecommendation, setShowRecommendation] = useState(false);

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500); // 500ms delay
        return () => clearTimeout(timer);
    }, [filters]);

    // Fetch on debounced changes
    useEffect(() => {
        fetchCourses();
    }, [debouncedFilters]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await getCourses(debouncedFilters);
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const categories = ["Python", "Web Development", "Data Science", "AI", "Cloud"];

    return (
        <div className="min-h-screen pt-24 px-4 pb-20 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-accent-violet/5 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[60px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-space-dark mb-4">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-blue">Courses</span></h1>
                    <p className="text-slate-500 text-lg">Browse our premium selection of industry-ready courses.</p>
                    <button
                        onClick={() => setShowRecommendation(true)}
                        className="px-8 py-4 rounded-full bg-space-dark text-white font-bold hover:bg-space-light transition-all shadow-xl shadow-space-dark/20 flex items-center gap-2 mx-auto mt-8"
                    >
                        <Sparkles size={20} className="text-accent-cyan" />
                        Find My Perfect Course
                    </button>
                </div>

                {/* Search & Filters Panel */}
                <div className="mb-12 p-6 rounded-[2rem] glass-panel flex flex-col gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {/* Top Row: Search */}
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-violet" size={24} />
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            placeholder="Find your next skill (e.g. Machine Learning)..."
                            className="w-full pl-14 pr-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 focus:ring-4 focus:ring-accent-violet/10 focus:border-accent-violet outline-none transition-all text-lg"
                            onChange={handleFilterChange}
                        />
                    </div>

                    {/* Bottom Row: Filters & Quick Tags */}
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilters({ ...filters, search: cat })}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filters.search === cat ? 'bg-accent-violet text-white shadow-lg shadow-accent-violet/30' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative group">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-blue" size={18} />
                                <select
                                    name="duration"
                                    className="pl-12 pr-8 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue/20 outline-none text-slate-600 appearance-none cursor-pointer"
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Any Duration</option>
                                    <option value="weeks">Short (Weeks)</option>
                                    <option value="months">Long (Months)</option>
                                </select>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-accent-blue">₹</span>
                                <input
                                    type="number"
                                    name="max_fees"
                                    placeholder="Max Budget"
                                    className="pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue/20 outline-none w-40"
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[400px] bg-white rounded-[2rem] animate-pulse border border-slate-100"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.length > 0 ? (
                            courses.map((course, idx) => (
                                <CourseCard key={course.id} course={course} index={idx} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="inline-flex justify-center items-center w-20 h-20 bg-slate-100 rounded-full mb-4">
                                    <Search size={32} className="text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700">No courses found</h3>
                                <p className="text-slate-500">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <RecommendationModal
                isOpen={showRecommendation}
                onClose={() => setShowRecommendation(false)}
            />
        </div>
    );
};

const CourseCard = ({ course, index }) => (
    <div
        className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-accent-violet/10 hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
    >
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-violet to-accent-blue transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        <div className="flex justify-between items-start mb-6">
            <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider group-hover:bg-accent-violet group-hover:text-white transition-colors duration-300">
                {course.duration}
            </span>
            <div className="flex items-center text-space-dark font-bold text-xl">
                ₹{course.fees.toLocaleString()}
            </div>
        </div>

        <div className="mb-4">
            <h3 className="text-2xl font-bold text-space-dark mb-3 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-violet group-hover:to-accent-blue transition-all duration-300">
                {course.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                {course.description || "Master this skill with our comprehensive curriculum designed by industry experts."}
            </p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                <span className="flex items-center"><Zap size={14} className="mr-1 text-yellow-500" /> Beginner Friendly</span>
                <span className="flex items-center"><BookOpen size={14} className="mr-1 text-accent-blue" /> Certified</span>
            </div>
            <Link to={`/book/${course.id}`} className="block w-full text-center py-4 rounded-xl bg-space-dark text-white font-bold tracking-wide hover:bg-gradient-to-r hover:from-accent-violet hover:to-accent-blue transition-all duration-300 shadow-lg shadow-space-dark/20 hover:shadow-accent-violet/30">
                View & Book
            </Link>
        </div>
    </div>
);

export default Explore;
