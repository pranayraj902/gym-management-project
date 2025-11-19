import React, { useEffect, useState } from 'react';
import { getAttendanceLog } from '../../services/attendanceService';

const AttendanceLog = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendanceLog = async () => {
            try {
                const data = await getAttendanceLog();
                setAttendanceData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceLog();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Attendance Log</h2>
            <table>
                <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((log) => (
                        <tr key={log.log_id}>
                            <td>{log.Member_id}</td>
                            <td>{new Date(log.check_in_time).toLocaleString()}</td>
                            <td>{log.check_out_time ? new Date(log.check_out_time).toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceLog;