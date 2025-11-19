import React, { useEffect, useState } from 'react';
import { getAttendanceLog, checkIn, checkOut } from '../services/attendanceService';
import { getMembers } from '../services/memberService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';
import '../styles/Attendance.css';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [memberId, setMemberId] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [attendanceResponse, membersResponse] = await Promise.all([
                getAttendanceLog(),
                getMembers()
            ]);
            setAttendanceData(Array.isArray(attendanceResponse) ? attendanceResponse : []);
            setMembers(Array.isArray(membersResponse) ? membersResponse : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ text: 'Error loading data: ' + (error.message || 'Unknown error'), type: 'error' });
            setAttendanceData([]);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        if (!memberId) {
            setMessage({ text: 'Please select a member', type: 'error' });
            return;
        }

        // Check if member is already checked in
        const alreadyCheckedIn = attendanceData.find(
            record => record.Member_id === parseInt(memberId) && !record.check_out_time
        );

        if (alreadyCheckedIn) {
            setMessage({ text: 'This member is already checked in!', type: 'error' });
            return;
        }

        try {
            await checkIn(memberId);
            setMessage({ text: 'Check-in successful!', type: 'success' });
            setMemberId('');
            fetchData();
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error checking in:', error);
            setMessage({ text: error.response?.data?.message || 'Error checking in', type: 'error' });
        }
    };

    const handleCheckOut = async (logId, memberId) => {
        try {
            await checkOut(memberId, logId);
            setMessage({ text: 'Check-out successful!', type: 'success' });
            fetchData();
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error checking out:', error);
            setMessage({ text: 'Error checking out', type: 'error' });
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString();
    };

    const calculateDuration = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return '-';
        const diff = new Date(checkOut) - new Date(checkIn);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Attendance Management</h1>
            </div>

            {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="checkin-section">
                    <h2>Quick Check-In</h2>
                    <div className="checkin-form">
                        <select
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            className="member-select"
                        >
                            <option value="">Select Member</option>
                            {members.map(member => {
                                const isCheckedIn = attendanceData.some(
                                    record => record.Member_id === member.Member_id && !record.check_out_time
                                );
                                return (
                                    <option 
                                        key={member.Member_id} 
                                        value={member.Member_id}
                                        style={{ color: isCheckedIn ? '#ff6b6b' : 'inherit' }}
                                    >
                                        {member.Name} {isCheckedIn ? '(Already Checked In)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            className="btn-checkin"
                            onClick={handleCheckIn}
                            disabled={!memberId}
                        >
                            ✓ Check In
                        </button>
                    </div>
                </div>

                <div className="members-table">
                    <h2>Today's Attendance Log</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Log ID</th>
                                <th>Member</th>
                                <th>Check-In Time</th>
                                <th>Check-Out Time</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        No attendance records found.
                                    </td>
                                </tr>
                            ) : (
                                attendanceData.map(record => {
                                    const member = members.find(m => m.Member_id === record.Member_id);
                                    return (
                                        <tr key={record.log_id}>
                                            <td>{record.log_id}</td>
                                            <td>
                                                {member ? member.Name : `Member #${record.Member_id}`}
                                            </td>
                                            <td>{formatTime(record.check_in_time)}</td>
                                            <td>{formatTime(record.check_out_time)}</td>
                                            <td>{calculateDuration(record.check_in_time, record.check_out_time)}</td>
                                            <td>
                                                {!record.check_out_time && (
                                                    <button
                                                        className="btn-checkout"
                                                        onClick={() => handleCheckOut(record.log_id, record.Member_id)}
                                                    >
                                                        Check Out
                                                    </button>
                                                )}
                                                {record.check_out_time && (
                                                    <span className="status-badge paid">Completed</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default Attendance;