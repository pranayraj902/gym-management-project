import React, { useEffect, useState } from 'react';
import { getTrainers, createTrainer, updateTrainer, deleteTrainer } from '../services/trainerService';
import '../styles/Members.css'; // Reuse the same styles

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Salary: '',
        hire_date: '',
        status: 'Active'
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            setLoading(true);
            const data = await getTrainers();
            setTrainers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching trainers:', error);
            setMessage({ type: 'error', text: 'Failed to fetch trainers: ' + (error.message || 'Unknown error') });
            setTrainers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (trainer) => {
        setSelectedTrainer(trainer);
        setFormData({
            Name: trainer.Name || '',
            Email: trainer.Email || '',
            Phone: trainer.Phone || '',
            Salary: trainer.Salary || '',
            hire_date: trainer.hire_date ? trainer.hire_date.split('T')[0] : '',
            status: trainer.status || 'Active'
        });
        setShowForm(true);
    };

    const handleDelete = async (trainerId) => {
        if (window.confirm('Are you sure you want to delete this trainer?')) {
            try {
                await deleteTrainer(trainerId);
                setMessage({ type: 'success', text: 'Trainer deleted successfully' });
                fetchTrainers();
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to delete trainer' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedTrainer) {
                await updateTrainer(selectedTrainer.Trainer_ID, formData);
                setMessage({ type: 'success', text: 'Trainer updated successfully' });
            } else {
                await createTrainer(formData);
                setMessage({ type: 'success', text: 'Trainer created successfully' });
            }
            fetchTrainers();
            handleCancel();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save trainer' });
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedTrainer(null);
        setFormData({
            Name: '',
            Email: '',
            Phone: '',
            Salary: '',
            hire_date: '',
            status: 'Active'
        });
    };

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Trainers Management</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        ➕ Add New Trainer
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
                    <h2>{selectedTrainer ? 'Edit Trainer' : 'Add New Trainer'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="Phone"
                                    value={formData.Phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Salary</label>
                                <input
                                    type="number"
                                    name="Salary"
                                    value={formData.Salary}
                                    onChange={handleInputChange}
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Hire Date</label>
                                <input
                                    type="date"
                                    name="hire_date"
                                    value={formData.hire_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit">
                                {selectedTrainer ? 'Update Trainer' : 'Create Trainer'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="loading">Loading trainers...</div>
            ) : (
                <div className="members-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Salary</th>
                                <th>Hire Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '50px 20px' }}>
                                        <div style={{ color: '#95a5a6' }}>
                                            <p style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '600' }}>👨‍🏫 No trainers found</p>
                                            <p style={{ fontSize: '15px' }}>Add your first trainer!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                trainers.map((trainer) => (
                                    <tr key={trainer.Trainer_ID}>
                                        <td><strong style={{ color: '#667eea' }}>#{trainer.Trainer_ID}</strong></td>
                                        <td><strong style={{ color: '#2c3e50' }}>{trainer.Name}</strong></td>
                                        <td>{trainer.Email || '-'}</td>
                                        <td>{trainer.Phone || '-'}</td>
                                        <td>${parseFloat(trainer.Salary || 0).toFixed(2)}</td>
                                        <td>{trainer.hire_date ? new Date(trainer.hire_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</td>
                                        <td>
                                            <span className={`status-badge ${trainer.status?.toLowerCase() === 'active' ? 'paid' : 'pending'}`}>
                                                {trainer.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(trainer)}
                                                title="Edit Trainer"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(trainer.Trainer_ID)}
                                                title="Delete Trainer"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Trainers;