
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Booking from './pages/Booking';
import About from './pages/About';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50 font-inter text-slate-800">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/book/:courseId" element={<Booking />} />
                </Routes>
                <ChatWidget />
            </div>
        </Router>
    );
}

export default App;
