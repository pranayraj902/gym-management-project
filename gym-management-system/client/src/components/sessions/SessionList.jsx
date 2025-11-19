import React, { useEffect, useState } from 'react';
import { getSessions } from '../../services/sessionService';
import './SessionList.css';

const SessionList = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await getSessions();
                setSessions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (loading) {
        return <div>Loading sessions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="session-list">
            <h2>Workout Sessions</h2>
            <ul>
                {sessions.map(session => (
                    <li key={session.session_id}>
                        <h3>{session.type}</h3>
                        <p>Date: {new Date(session.date).toLocaleDateString()}</p>
                        <p>Duration: {session.duration} minutes</p>
                        <p>Trainer ID: {session.trainer_id}</p>
                        <p>Max Capacity: {session.max_capacity}</p>
                        <p>Current Participants: {session.current_participants}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SessionList;