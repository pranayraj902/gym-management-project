import React, { useEffect, useState } from 'react';
import { getSessions, createSession, updateSession, deleteSession } from '../services/sessionService';
import { getTrainers } from '../services/trainerService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        date: '',
        duration: '',
        type: '',
        calories_burned: '',
        trainer_id: '',
        max_capacity: '',
        current_participants: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sessionsData, trainersData] = await Promise.all([
                getSessions(),
                getTrainers()
            ]);
            setSessions(Array.isArray(sessionsData) ? sessionsData : []);
            setTrainers(Array.isArray(trainersData) ? trainersData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ text: 'Error loading data: ' + (error.message || 'Unknown error'), type: 'error' });
            setSessions([]);
            setTrainers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSession) {
                await updateSession(editingSession.session_id, formData);
                setMessage({ text: 'Session updated successfully!', type: 'success' });
            } else {
                await createSession(formData);
                setMessage({ text: 'Session created successfully!', type: 'success' });
            }
            
            fetchData();
            handleCancel();
            
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error saving session:', error);
            setMessage({ text: 'Error saving session', type: 'error' });
        }
    };

    const handleEdit = (session) => {
        setEditingSession(session);
        setFormData({
            date: session.date ? session.date.split('T')[0] : '',
            duration: session.duration || '',
            type: session.type || '',
            calories_burned: session.calories_burned || '',
            trainer_id: session.trainer_id || '',
            max_capacity: session.max_capacity || '',
            current_participants: session.current_participants || 0
        });
        setShowForm(true);
        setMessage({ text: '', type: '' });
    };

    const handleDelete = async (sessionId) => {
        if (window.confirm('Are you sure you want to delete this session?')) {
            try {
                await deleteSession(sessionId);
                setMessage({ text: 'Session deleted successfully!', type: 'success' });
                fetchData();
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } catch (error) {
                console.error('Error deleting session:', error);
                setMessage({ text: 'Error deleting session', type: 'error' });
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingSession(null);
        setFormData({
            date: '',
            duration: '',
            type: '',
            calories_burned: '',
            trainer_id: '',
            max_capacity: '',
            current_participants: 0
        });
        setMessage({ text: '', type: '' });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Workout Sessions</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        Add New Session
                    </button>
                )}
            </div>

            {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {showForm && (
                    <div className="member-form">
                        <h2>{editingSession ? 'Edit Session' : 'Add New Session'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Duration (minutes) *</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="60"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Strength">Strength</option>
                                        <option value="Yoga">Yoga</option>
                                        <option value="CrossFit">CrossFit</option>
                                        <option value="HIIT">HIIT</option>
                                        <option value="Pilates">Pilates</option>
                                        <option value="Zumba">Zumba</option>
                                        <option value="Boxing">Boxing</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Calories Burned</label>
                                    <input
                                        type="number"
                                        name="calories_burned"
                                        value={formData.calories_burned}
                                        onChange={handleInputChange}
                                        placeholder="300"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Trainer *</label>
                                    <select
                                        name="trainer_id"
                                        value={formData.trainer_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Trainer</option>
                                        {trainers.map(trainer => (
                                            <option key={trainer.Trainer_ID} value={trainer.Trainer_ID}>
                                                {trainer.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Max Capacity *</label>
                                    <input
                                        type="number"
                                        name="max_capacity"
                                        value={formData.max_capacity}
                                        onChange={handleInputChange}
                                        placeholder="20"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Current Participants</label>
                                    <input
                                        type="number"
                                        name="current_participants"
                                        value={formData.current_participants}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-submit">
                                    {editingSession ? 'Update Session' : 'Add Session'}
                                </button>
                                <button type="button" className="btn-cancel" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="members-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Duration</th>
                                <th>Type</th>
                                <th>Calories</th>
                                <th>Trainer</th>
                                <th>Capacity</th>
                                <th>Participants</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center' }}>
                                        No sessions found. Add your first session!
                                    </td>
                                </tr>
                            ) : (
                                sessions.map(session => (
                                    <tr key={session.session_id}>
                                        <td>{session.session_id}</td>
                                        <td>{new Date(session.date).toLocaleDateString()}</td>
                                        <td>{session.duration} mins</td>
                                        <td>{session.type}</td>
                                        <td>{session.calories_burned || '-'}</td>
                                        <td>
                                            {trainers.find(t => t.Trainer_ID === session.trainer_id)?.Name || 'N/A'}
                                        </td>
                                        <td>{session.max_capacity}</td>
                                        <td>{session.current_participants || 0}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(session)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(session.session_id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default Sessions;