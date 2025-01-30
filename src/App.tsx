import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <Router>
            <Routes>
                               
                {/* Redirect to login if not authenticated */}
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />

                {/* Redirect to home if authenticated */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            </Routes>
        </Router>
    );
};

export default App;
