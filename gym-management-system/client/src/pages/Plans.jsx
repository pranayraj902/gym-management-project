import React, { useEffect, useState } from 'react';
import { getAllPlans, createPlan, updatePlan, deletePlan } from '../services/planService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';

const Plans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [formData, setFormData] = useState({
        Plan_Name: '',
        duration_months: '',
        price: '',
        max_sessions_per_week: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const data = await getAllPlans();
            setPlans(data || []);
        } catch (error) {
            console.error('Error fetching plans:', error);
            setMessage({ type: 'error', text: 'Failed to fetch plans. Please try again.' });
            setPlans([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (plan) => {
        setSelectedPlan(plan);
        setFormData({
            Plan_Name: plan.Plan_Name || '',
            duration_months: plan.duration_months || '',
            price: plan.price || '',
            max_sessions_per_week: plan.max_sessions_per_week || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (planId) => {
        if (window.confirm('Are you sure you want to delete this plan?')) {
            try {
                await deletePlan(planId);
                setMessage({ type: 'success', text: 'Plan deleted successfully!' });
                fetchPlans();
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } catch (error) {
                console.error('Error deleting plan:', error);
                setMessage({ type: 'error', text: 'Failed to delete plan. Please try again.' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedPlan) {
                await updatePlan(selectedPlan.Plan_id, formData);
                setMessage({ type: 'success', text: 'Plan updated successfully!' });
            } else {
                await createPlan(formData);
                setMessage({ type: 'success', text: 'Plan created successfully!' });
            }
            fetchPlans();
            handleCancel();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error saving plan:', error);
            setMessage({ type: 'error', text: 'Failed to save plan. Please try again.' });
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedPlan(null);
        setFormData({
            Plan_Name: '',
            duration_months: '',
            price: '',
            max_sessions_per_week: ''
        });
    };

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Membership Plans</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        ➕ Add New Plan
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
                    <h2>{selectedPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Plan Name *</label>
                                <input
                                    type="text"
                                    name="Plan_Name"
                                    value={formData.Plan_Name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Basic Monthly"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Duration (Months) *</label>
                                <input
                                    type="number"
                                    name="duration_months"
                                    value={formData.duration_months}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 1, 3, 6, 12"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price (₹) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 999.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Max Sessions Per Week *</label>
                                <input
                                    type="number"
                                    name="max_sessions_per_week"
                                    value={formData.max_sessions_per_week}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 3, 5, 7"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit">
                                {selectedPlan ? '✓ Update Plan' : '✓ Create Plan'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={handleCancel}>
                                ✕ Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <Loader />
            ) : (
                <div className="members-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Plan Name</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Max Sessions/Week</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '50px 20px' }}>
                                        <div style={{ color: '#95a5a6' }}>
                                            <p style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '600' }}>📋 No plans found</p>
                                            <p style={{ fontSize: '15px' }}>Click "Add New Plan" to get started!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                plans.map((plan) => (
                                    <tr key={plan.Plan_id}>
                                        <td><strong style={{ color: '#667eea' }}>#{plan.Plan_id}</strong></td>
                                        <td><strong style={{ color: '#2c3e50' }}>{plan.Plan_Name}</strong></td>
                                        <td>{plan.duration_months} {plan.duration_months === 1 ? 'Month' : 'Months'}</td>
                                        <td>₹{parseFloat(plan.price).toFixed(2)}</td>
                                        <td>{plan.max_sessions_per_week} sessions</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(plan)}
                                                title="Edit Plan"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(plan.Plan_id)}
                                                title="Delete Plan"
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

export default Plans;
