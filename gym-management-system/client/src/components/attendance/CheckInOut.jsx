import React, { useState } from 'react';
import attendanceService from '../../services/attendanceService';

const CheckInOut = () => {
    const [memberId, setMemberId] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckIn = async () => {
        try {
            const response = await attendanceService.checkIn(memberId);
            setMessage(response.message || 'Check-in successful');
        } catch (error) {
            setMessage(error.message || 'Error checking in');
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await attendanceService.checkOut(memberId);
            setMessage(response.message || 'Check-out successful');
        } catch (error) {
            setMessage(error.message || 'Error checking out');
        }
    };

    return (
        <div className="check-in-out">
            <h2>Check In / Check Out</h2>
            <input
                type="text"
                placeholder="Enter Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
            />
            <button onClick={handleCheckIn}>Check In</button>
            <button onClick={handleCheckOut}>Check Out</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CheckInOut;