import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMembers } from '../services/memberService';
import { getTrainers } from '../services/trainerService';
import { getSessions } from '../services/sessionService';
import { getPayments } from '../services/paymentService';
import '../styles/Home.css';

const Home = () => {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalTrainers: 0,
        totalSessions: 0,
        totalRevenue: 0,
        activeMembers: 0,
        upcomingSessions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [members, trainers, sessions, payments] = await Promise.all([
                getMembers().catch(() => []),
                getTrainers().catch(() => []),
                getSessions().catch(() => []),
                getPayments().catch(() => [])
            ]);

            const activeMembers = members.filter(m => m.status === 'Active').length;
            const totalRevenue = payments.reduce((sum, p) => sum + (parseFloat(p.Amount) || 0), 0);

            setStats({
                totalMembers: members.length,
                totalTrainers: trainers.length,
                totalSessions: sessions.length,
                totalRevenue: totalRevenue,
                activeMembers: activeMembers,
                upcomingSessions: sessions.length
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <div className="welcome-section">
                <h1>Welcome to Gym Management System</h1>
                <p>Manage your gym operations efficiently</p>
            </div>

            {loading ? (
                <div className="loading">Loading dashboard...</div>
            ) : (
                <>
                    <div className="stats-grid">
                        <div className="stat-card members">
                            <div className="stat-icon">👥</div>
                            <div className="stat-details">
                                <h3>{stats.totalMembers}</h3>
                                <p>Total Members</p>
                                <small>{stats.activeMembers} Active</small>
                            </div>
                            <Link to="/members" className="stat-link">View All →</Link>
                        </div>

                        <div className="stat-card trainers">
                            <div className="stat-icon">💪</div>
                            <div className="stat-details">
                                <h3>{stats.totalTrainers}</h3>
                                <p>Total Trainers</p>
                            </div>
                            <Link to="/trainers" className="stat-link">View All →</Link>
                        </div>

                        <div className="stat-card sessions">
                            <div className="stat-icon">📅</div>
                            <div className="stat-details">
                                <h3>{stats.totalSessions}</h3>
                                <p>Total Sessions</p>
                                <small>{stats.upcomingSessions} Upcoming</small>
                            </div>
                            <Link to="/sessions" className="stat-link">View All →</Link>
                        </div>

                        <div className="stat-card revenue">
                            <div className="stat-icon">💰</div>
                            <div className="stat-details">
                                <h3>${stats.totalRevenue.toFixed(2)}</h3>
                                <p>Total Revenue</p>
                            </div>
                            <Link to="/payments" className="stat-link">View Details →</Link>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="actions-grid">
                            <Link to="/members" className="action-card">
                                <span className="action-icon">➕</span>
                                <span>Add New Member</span>
                            </Link>
                            <Link to="/sessions" className="action-card">
                                <span className="action-icon">📝</span>
                                <span>Schedule Session</span>
                            </Link>
                            <Link to="/payments" className="action-card">
                                <span className="action-icon">💳</span>
                                <span>Record Payment</span>
                            </Link>
                            <Link to="/attendance" className="action-card">
                                <span className="action-icon">✓</span>
                                <span>Mark Attendance</span>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;