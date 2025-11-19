import React, { useEffect, useState } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../services/memberService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [formData, setFormData] = useState({
        Name: '',
        Gender: '',
        Phone_Num: '',
        Address: '',
        Join_Date: '',
        status: 'Active',
        membership_expiry: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const data = await getMembers();
            setMembers(data || []);
        } catch (error) {
            console.error('Error fetching members:', error);
            setMessage({ type: 'error', text: 'Failed to fetch members. Please try again.' });
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (member) => {
        setSelectedMember(member);
        setFormData({
            Name: member.Name || '',
            Gender: member.Gender || '',
            Phone_Num: member.Phone_Num || '',
            Address: member.Address || '',
            Join_Date: member.Join_Date ? member.Join_Date.split('T')[0] : '',
            status: member.status || 'Active',
            membership_expiry: member.membership_expiry ? member.membership_expiry.split('T')[0] : ''
        });
        setShowForm(true);
    };

    const handleDelete = async (memberId) => {
        console.log('Delete clicked for member ID:', memberId);
        if (window.confirm('Are you sure you want to delete this member? This will also delete all related attendance logs, payments, and session bookings. This action cannot be undone.')) {
            try {
                console.log('Calling deleteMember API for ID:', memberId);
                await deleteMember(memberId);
                setMessage({ type: 'success', text: 'Member and all related records deleted successfully!' });
                fetchMembers();
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } catch (error) {
                console.error('Error deleting member:', error);
                console.error('Error details:', error.response?.data);
                const errorMsg = error.response?.data?.message || 'Failed to delete member. Please try again.';
                setMessage({ type: 'error', text: errorMsg });
                setTimeout(() => setMessage({ type: '', text: '' }), 5000);
            }
        } else {
            console.log('Delete cancelled by user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedMember) {
                await updateMember(selectedMember.Member_id, formData);
                setMessage({ type: 'success', text: 'Member updated successfully!' });
            } else {
                await createMember(formData);
                setMessage({ type: 'success', text: 'Member created successfully!' });
            }
            fetchMembers();
            handleCancel();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error saving member:', error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save member. Please check all fields.' });
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedMember(null);
        setFormData({
            Name: '',
            Gender: '',
            Phone_Num: '',
            Address: '',
            Join_Date: '',
            status: 'Active',
            membership_expiry: ''
        });
    };

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Members Management</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        ➕ Add New Member
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
                        <h2>{selectedMember ? 'Edit Member' : 'Add New Member'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="Gender" value={formData.Gender} onChange={handleInputChange}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="Phone_Num"
                                        value={formData.Phone_Num}
                                        onChange={handleInputChange}
                                        placeholder="+91 98765 43210"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Membership Status *</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange} required>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Join Date *</label>
                                    <input
                                        type="date"
                                        name="Join_Date"
                                        value={formData.Join_Date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Membership Expiry</label>
                                    <input
                                        type="date"
                                        name="membership_expiry"
                                        value={formData.membership_expiry}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleInputChange}
                                    placeholder="Full address..."
                                    rows="3"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-submit">
                                    {selectedMember ? '✓ Update Member' : '✓ Create Member'}
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
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Join Date</th>
                                <th>Expiry</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', padding: '50px 20px' }}>
                                        <div style={{ color: '#95a5a6' }}>
                                            <p style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '600' }}>👥 No members found</p>
                                            <p style={{ fontSize: '15px' }}>Click "Add New Member" to get started!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member.Member_id}>
                                        <td><strong style={{ color: '#667eea' }}>#{member.Member_id}</strong></td>
                                        <td><strong style={{ color: '#2c3e50' }}>{member.Name || 'N/A'}</strong></td>
                                        <td>{member.Gender || '-'}</td>
                                        <td>{member.Phone_Num || '-'}</td>
                                        <td style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={member.Address}>
                                            {member.Address || '-'}
                                        </td>
                                        <td>{member.Join_Date ? new Date(member.Join_Date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</td>
                                        <td>{member.membership_expiry ? new Date(member.membership_expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}</td>
                                        <td>
                                            <span className={`status-badge ${member.status?.toLowerCase() === 'active' ? 'paid' : 'pending'}`}>
                                                {member.status || 'Active'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(member)}
                                                title="Edit Member"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(member.Member_id)}
                                                title="Delete Member"
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

export default Members;