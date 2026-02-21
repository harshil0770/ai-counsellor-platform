
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { getCourses, createStudent, api } from '../services/api';
import { CheckCircle, ArrowLeft, ArrowRight, User, BookOpen, Target, CreditCard, Loader2 } from 'lucide-react';

// Replace with your Stripe Public Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Booking = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success

    // Enhanced Student State
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        interests: '',
        budget: ''
    });
    const [studentId, setStudentId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStudentCreation = async () => {
        setLoading(true);
        try {
            // Convert budget to int if present
            const payload = {
                ...studentDetails,
                budget: studentDetails.budget ? parseInt(studentDetails.budget) : 0
            };
            const student = await createStudent(payload);
            setStudentId(student.id);
            setStep(2);
        } catch (error) {
            console.error("Failed to create student", error);
            alert("Could not save profile. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Better approach: fetch specifically by ID
                const response = await api.get(`/courses/${courseId}`);
                setCourse(response.data);
            } catch (err) {
                console.error("Course fetch error", err);
                setError("Course not found or server error.");
            }
        };
        fetchCourse();
    }, [courseId]);

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
            <div className="bg-red-50 text-red-600 p-6 rounded-3xl mb-6 max-w-md">
                <p className="font-bold text-lg mb-2">Oops!</p>
                <p>{error}</p>
            </div>
            <button onClick={() => navigate('/explore')} className="px-8 py-3 bg-space-dark text-white rounded-2xl">
                Go Back to Explore
            </button>
        </div>
    );

    if (!course) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="animate-spin text-accent-violet" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen pt-24 px-4 bg-slate-50 flex items-center justify-center pb-20">
            <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white/60 relative overflow-hidden">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-accent-violet to-accent-blue transition-all duration-500 ease-out"
                        style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                    ></div>
                </div>

                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-space-dark mb-2">
                        {step === 1 ? "Student Profile" : step === 2 ? "Secure Payment" : "Welcome Aboard!"}
                    </h2>
                    <p className="text-slate-500 flex items-center justify-center gap-2">
                        <BookOpen size={16} className="text-accent-violet" />
                        {course.title}
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-space-dark font-semibold">₹{course.fees.toLocaleString()}</span>
                    </p>
                </div>

                {/* Step 1: Profile & Details */}
                {step === 1 && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-space-dark flex items-center"><User size={18} className="mr-2 text-accent-cyan" /> Personal Info</h3>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={studentDetails.name}
                                    onChange={e => setStudentDetails({ ...studentDetails, name: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none transition-all"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={studentDetails.email}
                                    onChange={e => setStudentDetails({ ...studentDetails, email: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none transition-all"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={studentDetails.phone}
                                    onChange={e => setStudentDetails({ ...studentDetails, phone: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none transition-all"
                                />
                            </div>

                            {/* Academic Profile */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-space-dark flex items-center"><Target size={18} className="mr-2 text-accent-violet" /> Academic Profile</h3>
                                <select
                                    value={studentDetails.education}
                                    onChange={e => setStudentDetails({ ...studentDetails, education: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none text-slate-600 appearance-none cursor-pointer"
                                >
                                    <option value="">Current Education Level</option>
                                    <option value="10th">10th Grade</option>
                                    <option value="12th">12th Grade</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Graduate">Graduate</option>
                                    <option value="Working Professional">Working Professional</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Interests (e.g. AI, Design)"
                                    value={studentDetails.interests}
                                    onChange={e => setStudentDetails({ ...studentDetails, interests: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none transition-all"
                                />
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Max Budget for Courses"
                                        value={studentDetails.budget}
                                        onChange={e => setStudentDetails({ ...studentDetails, budget: e.target.value })}
                                        className="w-full pl-10 pr-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-accent-violet/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleStudentCreation}
                            disabled={!studentDetails.name || !studentDetails.email || loading}
                            className="w-full py-5 rounded-2xl bg-space-dark text-white font-bold text-lg hover:bg-space-light hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-space-dark/20 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Continue to Payment <ArrowRight size={20} /></>}
                        </button>
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <div className="animate-slide-up max-w-md mx-auto">
                        <div className="bg-slate-50 p-6 rounded-2xl mb-8 flex items-center justify-between border border-slate-100">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Amount</p>
                                <p className="text-3xl font-bold text-space-dark">₹{course.fees.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <CreditCard className="text-accent-blue" size={24} />
                            </div>
                        </div>

                        <Elements stripe={stripePromise}>
                            <PaymentForm
                                course={course}
                                studentDetails={studentDetails}
                                studentId={studentId}
                                onSuccess={() => setStep(3)}
                            />
                        </Elements>

                        <button onClick={() => setStep(1)} className="mt-6 flex items-center justify-center w-full text-slate-400 hover:text-space-dark transition-colors py-2">
                            <ArrowLeft size={16} className="mr-2" /> Back to Profile
                        </button>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="text-center py-10 animate-fade-in flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/30 animate-float">
                            <CheckCircle className="text-white" size={48} />
                        </div>
                        <h3 className="text-3xl font-bold text-space-dark mb-4">You're All Set!</h3>
                        <p className="text-slate-500 mb-2 max-w-md">
                            Congratulations <strong>{studentDetails.name}</strong>! You have successfully enrolled in <strong>{course.title}</strong>.
                        </p>
                        <p className="text-sm text-slate-400 mb-10">A confirmation email has been sent to {studentDetails.email}.</p>

                        <a href="/explore" className="px-10 py-4 rounded-full bg-space-dark text-white font-bold hover:bg-space-light transition-all shadow-lg hover:-translate-y-1">
                            Explore More Courses
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Booking;
