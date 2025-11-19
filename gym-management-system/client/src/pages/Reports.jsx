import React, { useEffect, useState } from 'react';
import { getMonthlyRevenue, getTrainerPerformance } from '../services/reportService';
import { getMembers } from '../services/memberService';
import { getPayments } from '../services/paymentService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';
import '../styles/Reports.css';

const Reports = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [trainerPerformanceData, setTrainerPerformanceData] = useState([]);
    const [members, setMembers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        paidPayments: 0,
        pendingPayments: 0,
        activeMembers: 0,
        inactiveMembers: 0
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [membersRes, paymentsRes, revenueRes, trainerRes] = await Promise.all([
                getMembers(),
                getPayments(),
                getMonthlyRevenue().catch(() => []),
                getTrainerPerformance().catch(() => [])
            ]);

            setMembers(Array.isArray(membersRes) ? membersRes : []);
            setPayments(Array.isArray(paymentsRes) ? paymentsRes : []);
            setRevenueData(Array.isArray(revenueRes) ? revenueRes : []);
            setTrainerPerformanceData(Array.isArray(trainerRes) ? trainerRes : []);

            // Calculate stats
            const totalRevenue = (Array.isArray(paymentsRes) ? paymentsRes : [])
                .filter(p => p.Status === 'Paid')
                .reduce((sum, p) => sum + parseFloat(p.Amount || 0), 0);

            const paidCount = (Array.isArray(paymentsRes) ? paymentsRes : []).filter(p => p.Status === 'Paid').length;
            const pendingCount = (Array.isArray(paymentsRes) ? paymentsRes : []).filter(p => p.Status === 'Pending').length;
            
            const activeCount = (Array.isArray(membersRes) ? membersRes : []).filter(m => m.status === 'Active').length;
            const inactiveCount = (Array.isArray(membersRes) ? membersRes : []).filter(m => m.status !== 'Active').length;

            setStats({
                totalRevenue,
                paidPayments: paidCount,
                pendingPayments: pendingCount,
                activeMembers: activeCount,
                inactiveMembers: inactiveCount
            });
        } catch (error) {
            console.error('Error fetching reports data:', error);
            setMembers([]);
            setPayments([]);
            setRevenueData([]);
            setTrainerPerformanceData([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="members-container">
            <h1>Reports & Analytics</h1>

            {/* Summary Stats */}
            <div className="stats-grid">
                    <div className="stat-card revenue">
                        <div className="stat-icon">₹</div>
                        <div className="stat-details">
                            <h3>Total Revenue</h3>
                            <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
                            <span className="stat-label">From paid payments</span>
                        </div>
                    </div>

                    <div className="stat-card payments">
                        <div className="stat-icon">💳</div>
                        <div className="stat-details">
                            <h3>Payments</h3>
                            <p className="stat-value">{stats.paidPayments} / {stats.paidPayments + stats.pendingPayments}</p>
                            <span className="stat-label">{stats.pendingPayments} pending</span>
                        </div>
                    </div>

                    <div className="stat-card members">
                        <div className="stat-icon">👥</div>
                        <div className="stat-details">
                            <h3>Members</h3>
                            <p className="stat-value">{stats.activeMembers}</p>
                            <span className="stat-label">{stats.inactiveMembers} inactive</span>
                        </div>
                    </div>

                    <div className="stat-card percentage">
                        <div className="stat-icon">📊</div>
                        <div className="stat-details">
                            <h3>Activity Rate</h3>
                            <p className="stat-value">
                                {members.length > 0 ? ((stats.activeMembers / members.length) * 100).toFixed(1) : 0}%
                            </p>
                            <span className="stat-label">Active members</span>
                        </div>
                    </div>
                </div>

                {/* Monthly Revenue Section */}
                <div className="report-section">
                    <h2>Monthly Revenue Report</h2>
                    <div className="members-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Total Payments</th>
                                    <th>Total Revenue</th>
                                    <th>Average Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueData.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>
                                            No revenue data available
                                        </td>
                                    </tr>
                                ) : (
                                    revenueData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Month}</td>
                                            <td>{item.Total_Payments}</td>
                                            <td>₹{parseFloat(item.Total_Revenue || 0).toFixed(2)}</td>
                                            <td>₹{parseFloat(item.Average_Payment || 0).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Membership Status Distribution */}
                <div className="report-section">
                    <h2>Membership Status Distribution</h2>
                    <div className="chart-container">
                        <div className="chart-bars">
                            <div className="bar-group">
                                <div className="bar-label">Active</div>
                                <div className="bar-wrapper">
                                    <div 
                                        className="bar active-bar" 
                                        style={{ 
                                            width: members.length > 0 
                                                ? `${(stats.activeMembers / members.length) * 100}%` 
                                                : '0%' 
                                        }}
                                    >
                                        <span className="bar-value">{stats.activeMembers}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-group">
                                <div className="bar-label">Inactive</div>
                                <div className="bar-wrapper">
                                    <div 
                                        className="bar inactive-bar" 
                                        style={{ 
                                            width: members.length > 0 
                                                ? `${(stats.inactiveMembers / members.length) * 100}%` 
                                                : '0%' 
                                        }}
                                    >
                                        <span className="bar-value">{stats.inactiveMembers}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trainer Performance Section */}
                <div className="report-section">
                    <h2>Trainer Performance</h2>
                    <div className="members-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Trainer Name</th>
                                    <th>Total Members</th>
                                    <th>Total Sessions</th>
                                    <th>Avg Participants</th>
                                    <th>Total Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainerPerformanceData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            No trainer performance data available
                                        </td>
                                    </tr>
                                ) : (
                                    trainerPerformanceData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Trainer_Name}</td>
                                            <td>{item.Total_Members || 0}</td>
                                            <td>{item.Total_Sessions || 0}</td>
                                            <td>{parseFloat(item.Avg_Participants_Per_Session || 0).toFixed(1)}</td>
                                            <td>{parseFloat(item.Total_Training_Hours || 0).toFixed(1)}h</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};

export default Reports;