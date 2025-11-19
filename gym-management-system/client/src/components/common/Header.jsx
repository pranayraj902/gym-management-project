import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onLogout }) => {
    const history = useHistory();
    const location = useLocation();
    
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        history.push('/login');
    };

    // Get page title based on current route
    const getPageTitle = () => {
        const path = location.pathname;
        const titles = {
            '/': 'Dashboard',
            '/members': 'Members Management',
            '/trainers': 'Trainers Management',
            '/sessions': 'Training Sessions',
            '/payments': 'Payment Records',
            '/equipment': 'Equipment Management',
            '/attendance': 'Attendance Tracking',
            '/feedback': 'Feedback Management',
            '/reports': 'Reports & Analytics'
        };
        return titles[path] || 'Gym Management System';
    };
    
    return (
        <header className="header">
            <div className="header-title">
                <h1>{getPageTitle()}</h1>
            </div>
            <div className="header-nav">
                <button onClick={handleLogout} className="logout-btn">
                    <span className="logout-icon">🚪</span>
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Header;