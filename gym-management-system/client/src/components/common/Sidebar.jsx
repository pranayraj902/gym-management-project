import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Gym Management</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/members">Members</Link></li>
                <li><Link to="/trainers">Trainers</Link></li>
                <li><Link to="/sessions">Sessions</Link></li>
                <li><Link to="/plans">Plans</Link></li>
                <li><Link to="/payments">Payments</Link></li>
                <li><Link to="/equipment">Equipment</Link></li>
                <li><Link to="/attendance">Attendance</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/reports">Reports</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;