import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-content">
                <Sidebar />
                <main>
                    <h1>Dashboard</h1>
                    <p>Welcome to the Gym Management System Dashboard!</p>
                    {/* Additional dashboard components can be added here */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;