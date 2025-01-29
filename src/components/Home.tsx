import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (err) {
                setError('Failed to fetch protected data');
            }
        };

        fetchProtectedData();
    }, []);

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <>
            < nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                <div className="container">
                    <a className="navbar-brand" href="#">MyApp</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                            <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav >

            <div className='vh-100 ps-4 pe-4' >
                < header className="bg-primary text-white text-center py-5" >
                    <div className="container">
                        <h1>Welcome to MyApp</h1>
                        <p className="lead">Your one-stop solution for modern business intelligence</p>
                    </div>
                </header >

                <div>
                    <iframe width="100%" height="550px"  src="https://atomicworks.sisensepoc.com/app/main/dashboards/679a09313c91a80033087cc6?embed=true" ></iframe>
                </div>
                < section id="features" className="py-5" >
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
                </section >


                < section id="contact" className="bg-light py-5 text-center" >
                    <div className="container">
                        <h2>Get in Touch</h2>
                        <p>Have questions? Contact us anytime.</p>
                        <button className="btn btn-primary">Contact Us</button>
                    </div>
                </section >
            </div>

            < footer className="bg-dark text-white text-center py-3" >
                {error ? <p>{error}</p> : <p>&copy; 2025 MyApp. All Rights Reserved.</p>}

            </footer >
        </>
    );
};

export default Home;