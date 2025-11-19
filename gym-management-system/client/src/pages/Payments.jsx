import React, { useEffect, useState } from 'react';
import { getPayments, createPayment, updatePayment, deletePayment } from '../services/paymentService';
import { getMembers } from '../services/memberService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';
import '../styles/Payments.css';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        Amount: '',
        Payment_Date: '',
        Mode: '',
        Status: 'Pending',
        Member_id: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [paymentsData, membersData] = await Promise.all([
                getPayments(),
                getMembers()
            ]);
            setPayments(Array.isArray(paymentsData) ? paymentsData : []);
            setMembers(Array.isArray(membersData) ? membersData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ text: 'Error loading data: ' + (error.message || 'Unknown error'), type: 'error' });
            setPayments([]);
            setMembers([]);
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

    const handleStatusToggle = () => {
        setFormData(prev => ({
            ...prev,
            Status: prev.Status === 'Paid' ? 'Pending' : 'Paid'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPayment) {
                await updatePayment(editingPayment.Payment_ID, formData);
                setMessage({ text: 'Payment updated successfully!', type: 'success' });
            } else {
                await createPayment(formData);
                setMessage({ text: 'Payment created successfully!', type: 'success' });
            }
            
            fetchData();
            handleCancel();
            
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error saving payment:', error);
            setMessage({ text: 'Error saving payment', type: 'error' });
        }
    };

    const handleEdit = (payment) => {
        setEditingPayment(payment);
        setFormData({
            Amount: payment.Amount || '',
            Payment_Date: payment.Payment_Date ? payment.Payment_Date.split('T')[0] : '',
            Mode: payment.Mode || '',
            Status: payment.Status || 'Pending',
            Member_id: payment.Member_id || ''
        });
        setShowForm(true);
        setMessage({ text: '', type: '' });
    };

    const handleDelete = async (paymentId) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                await deletePayment(paymentId);
                setMessage({ text: 'Payment deleted successfully!', type: 'success' });
                fetchData();
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } catch (error) {
                console.error('Error deleting payment:', error);
                setMessage({ text: 'Error deleting payment', type: 'error' });
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingPayment(null);
        setFormData({
            Amount: '',
            Payment_Date: '',
            Mode: '',
            Status: 'Pending',
            Member_id: ''
        });
        setMessage({ text: '', type: '' });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Payments</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        Add New Payment
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
                        <h2>{editingPayment ? 'Edit Payment' : 'Add New Payment'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Member *</label>
                                    <select
                                        name="Member_id"
                                        value={formData.Member_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Member</option>
                                        {members.map(member => (
                                            <option key={member.Member_id} value={member.Member_id}>
                                                {member.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Amount *</label>
                                    <input
                                        type="number"
                                        name="Amount"
                                        value={formData.Amount}
                                        onChange={handleInputChange}
                                        placeholder="1000"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Payment Date *</label>
                                    <input
                                        type="date"
                                        name="Payment_Date"
                                        value={formData.Payment_Date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Payment Mode *</label>
                                    <select
                                        name="Mode"
                                        value={formData.Mode}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Mode</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Net Banking">Net Banking</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group payment-status-toggle">
                                    <label>Payment Status</label>
                                    <div className="toggle-container">
                                        <button
                                            type="button"
                                            className={`toggle-button ${formData.Status === 'Paid' ? 'paid' : 'pending'}`}
                                            onClick={handleStatusToggle}
                                        >
                                            <span className="toggle-slider"></span>
                                            <span className="toggle-label">
                                                {formData.Status === 'Paid' ? '✓ Paid' : '⏳ Pending'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-submit">
                                    {editingPayment ? 'Update Payment' : 'Add Payment'}
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
                                <th>Member</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Mode</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                        No payments found. Add your first payment!
                                    </td>
                                </tr>
                            ) : (
                                payments.map(payment => {
                                    const member = members.find(m => m.Member_id === payment.Member_id);
                                    return (
                                        <tr key={payment.Payment_ID}>
                                            <td>{payment.Payment_ID}</td>
                                            <td>
                                                {member ? member.Name : `Member #${payment.Member_id}`}
                                            </td>
                                            <td>₹{parseFloat(payment.Amount).toFixed(2)}</td>
                                            <td>{new Date(payment.Payment_Date).toLocaleDateString()}</td>
                                            <td>{payment.Mode}</td>
                                            <td>
                                                <span className={`status-badge ${payment.Status === 'Paid' ? 'paid' : 'pending'}`}>
                                                    {payment.Status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleEdit(payment)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(payment.Payment_ID)}
                                                >
                                                    Delete
                                                </button>
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

export default Payments;