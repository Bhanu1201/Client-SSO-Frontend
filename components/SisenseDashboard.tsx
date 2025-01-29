import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SisenseDashboard: React.FC = () => {
    const [dashboardUrl, setDashboardUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardUrl = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/sisense-dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDashboardUrl(response.data.url);
            } catch (err) {
                setError('Failed to fetch Sisense dashboard URL');
            }
        };

        fetchDashboardUrl();
    }, []);

    return (
        <div>
            <h2>Sisense Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {dashboardUrl && (
                <iframe
                    src={dashboardUrl}
                    title="Sisense Dashboard"
                    width="100%"
                    height="800px"
                    frameBorder="0"
                />
            )}
        </div>
    );
};

export default SisenseDashboard;