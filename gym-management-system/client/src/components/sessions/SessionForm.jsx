import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createSession, updateSession, getSessionById } from '../../services/sessionService';

const SessionForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const [sessionData, setSessionData] = useState({
        date: '',
        duration: '',
        type: '',
        calories_burned: '',
        trainer_id: '',
        max_capacity: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const fetchSession = async () => {
                const data = await getSessionById(id);
                setSessionData(data);
            };
            fetchSession();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionData({ ...sessionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateSession(id, sessionData);
        } else {
            await createSession(sessionData);
        }
        history.push('/sessions');
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Session' : 'Add Session'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={sessionData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input type="number" name="duration" value={sessionData.duration} onChange={handleChange} required />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" name="type" value={sessionData.type} onChange={handleChange} required />
                </div>
                <div>
                    <label>Calories Burned:</label>
                    <input type="number" name="calories_burned" value={sessionData.calories_burned} onChange={handleChange} required />
                </div>
                <div>
                    <label>Trainer ID:</label>
                    <input type="number" name="trainer_id" value={sessionData.trainer_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>Max Capacity:</label>
                    <input type="number" name="max_capacity" value={sessionData.max_capacity} onChange={handleChange} required />
                </div>
                <button type="submit">{isEditing ? 'Update Session' : 'Create Session'}</button>
            </form>
        </div>
    );
};

export default SessionForm;