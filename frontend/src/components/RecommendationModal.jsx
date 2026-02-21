
import React, { useState } from 'react';
import { X, Sparkles, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { chatWithAI, createStudent } from '../services/api';

const RecommendationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        name: '',
        email: '',
        education: '',
        background: '',   // IT / Non-IT
        degree_status: '', // Pursuing / Completed
        interests: '',
        budget: ''
    });
    const [recommendations, setRecommendations] = useState([]);
    const [aiMessage, setAiMessage] = useState('');

    const handleGetRecommendations = async () => {
        setLoading(true);
        try {
            // 1. Save/Update Student Profile
            const studentPayload = {
                name: details.name || 'Anonymous Finder',
                email: details.email,
                education: details.education,
                background: details.background,
                degree_status: details.degree_status,
                interests: details.interests,
                budget: details.budget ? parseInt(details.budget) : 0
            };

            let studentId = null;
            try {
                const student = await createStudent(studentPayload);
                studentId = student.id;
            } catch (err) {
                console.warn("Could not save student, proceeding with chat anyway", err);
            }

            // 2. Get AI Recommendations (Pass student_id for smart filtering)
            const query = `I am a ${details.education} student with a ${details.background} background. I am ${details.degree_status} my degree. I'm looking for a course in ${details.interests} with budget less than ${details.budget}. What do you recommend?`;

            const response = await chatWithAI(query, 'session-' + Date.now(), studentId);
            setAiMessage(response.response);
            setRecommendations(response.recommended_courses || []);
            setStep(2);
        } catch (error) {
            console.error("AI Error", error);
            setAiMessage("Sorry, I couldn't connect to the AI right now.");
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-white/50">

                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors">
                    <X size={24} className="text-slate-500" />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-violet to-accent-blue flex items-center justify-center text-white shadow-lg shadow-accent-violet/30">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-space-dark">AI Course Finder</h2>
                            <p className="text-slate-500 text-sm">Personalized recommendations in seconds</p>
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={details.name}
                                        onChange={e => setDetails({ ...details, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        value={details.email}
                                        onChange={e => setDetails({ ...details, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Education Level</label>
                                    <select
                                        value={details.education}
                                        onChange={e => setDetails({ ...details, education: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none"
                                    >
                                        <option value="">Select Level</option>
                                        <option value="10th">10th Grade</option>
                                        <option value="12th">12th Grade</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Working Professional">Working Professional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Status</label>
                                    <select
                                        value={details.degree_status}
                                        onChange={e => setDetails({ ...details, degree_status: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none"
                                    >
                                        <option value="">Status</option>
                                        <option value="Pursuing">Currently Pursuing</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Technical Background</label>
                                <div className="flex gap-4">
                                    {["IT", "Non-IT"].map(bg => (
                                        <button
                                            key={bg}
                                            onClick={() => setDetails({ ...details, background: bg })}
                                            className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${details.background === bg ? 'border-accent-violet bg-accent-violet/10 text-accent-violet' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            {bg}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Learning Interests (e.g. AI, Web, Design)</label>
                                <input
                                    type="text"
                                    value={details.interests}
                                    onChange={e => setDetails({ ...details, interests: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none"
                                    placeholder="What do you want to learn?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Max Budget (INR)</label>
                                <input
                                    type="number"
                                    value={details.budget}
                                    onChange={e => setDetails({ ...details, budget: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none"
                                    placeholder="e.g. 50000"
                                />
                            </div>

                            <button
                                onClick={handleGetRecommendations}
                                disabled={!details.email || !details.background || !details.interests || !details.budget || loading}
                                className="w-full py-4 rounded-xl bg-space-dark text-white font-bold hover:bg-space-light transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <>Get Recommendations <Sparkles size={18} /></>}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-slide-up">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">AI Analysis</h3>
                                <p className="text-space-dark leading-relaxed whitespace-pre-line">{aiMessage}</p>
                            </div>

                            {recommendations.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-space-dark mb-4">Recommended for You</h3>
                                    <div className="space-y-4">
                                        {recommendations.map(course => (
                                            <div key={course.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-accent-violet/30 hover:shadow-lg transition-all bg-white group cursor-pointer" onClick={() => window.location.href = `/booking/${course.id}`}>
                                                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-accent-violet group-hover:text-white transition-colors">
                                                    <BookOpen size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-space-dark">{course.title}</h4>
                                                    <p className="text-xs text-slate-500">{course.duration} • ₹{course.fees.toLocaleString()}</p>
                                                </div>
                                                <ChevronRight className="text-slate-300 group-hover:text-accent-violet" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="flex-1 py-3 bg-slate-100 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors">
                                    Search Again
                                </button>
                                <button onClick={onClose} className="flex-1 py-3 bg-space-dark text-white rounded-xl font-medium hover:bg-space-light transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default RecommendationModal;
