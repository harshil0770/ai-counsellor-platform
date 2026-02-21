
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Hash, MousePointer2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatWithAI } from '../services/api';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
        // Hydrate from localStorage
        const saved = localStorage.getItem('chat_history');
        return saved ? JSON.parse(saved) : [
            { sender: 'bot', text: "Hi there! 👋 I'm your **AI Career Assistant**.\n\nI can help you find courses, check eligibility, or plan your career. \n\nWhat would you like to explore today?" }
        ];
    });

    const [input, setInput] = useState('');
    const [sessionId, setSessionId] = useState(() => localStorage.getItem('chat_session_id'));
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const quickActions = [
        { label: "Python courses", icon: <Hash size={14} /> },
        { label: "Check eligibility", icon: <MousePointer2 size={14} /> },
        { label: "Courses under ₹10k", icon: <Sparkles size={14} /> },
    ];

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Save history to localStorage
    useEffect(() => {
        localStorage.setItem('chat_history', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (sessionId) localStorage.setItem('chat_session_id', sessionId);
    }, [sessionId]);

    useEffect(scrollToBottom, [messages, loading, isOpen]);

    const handleSend = async (textOverride) => {
        const query = typeof textOverride === 'string' ? textOverride : input;
        if (!query.trim()) return;

        const userMsg = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const data = await chatWithAI(query, sessionId);
            if (data.session_id) setSessionId(data.session_id);

            const botMsg = { sender: 'bot', text: data.response };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat Error", error);
            setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Sorry, I am having trouble connecting right now. Please check your internet or try again later.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-inter">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-6 w-[360px] md:w-[420px] h-[580px] md:h-[650px] max-h-[85vh] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/40 flex flex-col animate-slide-up origin-bottom-right transition-all">

                    {/* Premium Header */}
                    <div className="bg-gradient-to-br from-space-dark via-slate-900 to-accent-violet p-6 flex justify-between items-center text-white relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="flex items-center space-x-4 relative z-10">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                    <Bot size={28} className="text-accent-cyan" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 shadow-lg"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl tracking-tight">AI Counsellor</h3>
                                <p className="text-xs text-blue-200/80 font-medium">Always here to help</p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="hover:bg-white/10 rounded-2xl p-2.5 transition-all text-blue-100/60 hover:text-white border border-transparent hover:border-white/10">
                            <X size={22} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                {msg.sender === 'bot' && (
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-violet to-accent-blue flex items-center justify-center text-white mr-3 shrink-0 shadow-lg shadow-accent-violet/10 mt-1">
                                        <Bot size={18} />
                                    </div>
                                )}
                                <div className={`max-w-[88%] p-5 rounded-[1.8rem] text-[15px] leading-relaxed shadow-sm transition-all ${msg.sender === 'user'
                                    ? 'bg-accent-violet text-white rounded-br-none shadow-accent-violet/30'
                                    : 'bg-white text-slate-700 border border-slate-200/50 rounded-bl-none prose prose-sm prose-slate prose-strong:text-accent-violet prose-headings:text-space-dark prose-a:text-accent-blue hover:prose-a:underline'
                                    }`}>
                                    {msg.sender === 'bot' ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    ) : (
                                        <p>{msg.text}</p>
                                    )}
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 ml-3 shrink-0 shadow-sm mt-1">
                                        <User size={18} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Animation */}
                        {loading && (
                            <div className="flex justify-start animate-fade-in group">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-violet to-accent-blue flex items-center justify-center text-white mr-3 shrink-0 shadow-xl opacity-80 mt-1">
                                    <Bot size={18} />
                                </div>
                                <div className="bg-white px-5 py-4 rounded-[1.5rem] rounded-bl-none shadow-sm border border-slate-100">
                                    <div className="flex space-x-1.5 items-center h-6">
                                        <div className="w-2.5 h-2.5 bg-accent-violet/30 rounded-full animate-bounce"></div>
                                        <div className="w-2.5 h-2.5 bg-accent-violet/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2.5 h-2.5 bg-accent-violet/70 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Action Chips */}
                    {!loading && (
                        <div className="flex overflow-x-auto p-4 gap-2 bg-white/60 backdrop-blur-sm no-scrollbar border-t border-slate-100 shrink-0">
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(action.label)}
                                    className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:border-accent-violet hover:text-accent-violet hover:bg-accent-violet/5 transition-all shadow-sm active:scale-95"
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Premium Input Bar */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="p-5 bg-white border-t border-slate-100 flex items-center space-x-4 shrink-0"
                    >
                        <div className="flex-1 bg-slate-100/80 rounded-3xl px-6 py-4 flex items-center focus-within:ring-2 focus-within:ring-accent-violet/30 transition-all border border-transparent focus-within:bg-white shadow-inner">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask your AI counsellor..."
                                className="flex-1 bg-transparent border-none text-[15px] outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="w-14 h-14 bg-gradient-to-br from-accent-violet to-accent-blue text-white rounded-[1.2rem] hover:shadow-2xl hover:shadow-accent-violet/30 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center shrink-0 shadow-lg shadow-accent-violet/20"
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                        </button>
                    </form>
                </div>
            )}

            {/* Premium Floating Toggle */}
            <button
                onClick={toggleChat}
                className="w-20 h-20 rounded-[2.2rem] bg-gradient-to-br from-space-dark to-slate-900 border border-white/10 text-white shadow-[0_15px_40px_-12px_rgba(139,92,246,0.3)] flex items-center justify-center hover:scale-110 hover:-translate-y-2 transition-all duration-500 group ring-4 ring-white/10 backdrop-blur-md relative"
            >
                {isOpen ? (
                    <X size={36} className="transition-transform duration-500 rotate-90 group-hover:rotate-0" />
                ) : (
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent-cyan/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Sparkles size={42} className="text-accent-cyan animate-pulse absolute -top-2 -right-2 opacity-50 z-0" />
                        <Bot size={42} className="relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-violet rounded-full border-[3px] border-space-dark animate-bounce"></span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
