import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

useEffect(() => {
    const fetchProtectedData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No token found. Redirecting to login...');
            navigate('/login', { replace: true }); // Redirect properly
            return;
        }

        try {
            await axios.get('https://client-soo-backend.onrender.com/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            });

        } catch (err) {
            console.error('Error fetching protected data:', err);
            setError('Failed to fetch protected data');
            localStorage.removeItem('token');
            navigate('/login', { replace: true }); // Redirect properly
        }
    };

    fetchProtectedData();
}, []);


   const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login', { replace: true }); // Redirect to login page immediately
};
    
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="#">MyApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="#">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="#features">Features</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="#contact">Contact</Link></li>
                            <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="vh-100 ps-4 pe-4">
                {/* Header */}
                <header className="bg-primary text-white text-center py-5">
                    <div className="container">
                        <h1>Welcome to MyApp</h1>
                        <p className="lead">Your one-stop solution for modern business intelligence</p>
                    </div>
                </header>

                {/* Embedded Sisense Dashboard */}
                <div>
                    <iframe 
                        width="100%" 
                        height="550px"  
                        src="https://atomicworks.sisensepoc.com/app/main/dashboards/679a09313c91a80033087cc6?embed=true" 
                        title="Sisense Dashboard"
                    ></iframe>
                </div>

                {/* Features Section */}
                <section id="features" className="py-5">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-4">
                                <h3>Powerful Analytics</h3>
                                <p>Gain insights with cutting-edge analytics tools.</p>
                            </div>
                            <div className="col-md-4">
                                <h3>Easy Integration</h3>
                                <p>Seamlessly integrate with your existing ecosystem.</p>
                            </div>
                            <div className="col-md-4">
                                <h3>Secure & Reliable</h3>
                                <p>Ensuring data security and reliability at all times.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-light py-5 text-center">
                    <div className="container">
                        <h2>Get in Touch</h2>
                        <p>Have questions? Contact us anytime.</p>
                        <button className="btn btn-primary">Contact Us</button>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                {error ? <p className="text-danger">{error}</p> : <p>&copy; 2025 MyApp. All Rights Reserved.</p>}
            </footer>
        </>
    );
};

export default Home;
