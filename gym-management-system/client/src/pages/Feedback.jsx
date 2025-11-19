import React, { useEffect, useState } from 'react';
import { getFeedback, createFeedback, deleteFeedback } from '../services/feedbackService';
import { getMembers } from '../services/memberService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';
import '../styles/Feedback.css';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        comments: '',
        rating: 5,
        Member_id: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [feedbackResponse, membersResponse] = await Promise.all([
                getFeedback(),
                getMembers()
            ]);
            setFeedbacks(Array.isArray(feedbackResponse) ? feedbackResponse : []);
            setMembers(Array.isArray(membersResponse) ? membersResponse : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage({ text: 'Error loading data: ' + (error.message || 'Unknown error'), type: 'error' });
            setFeedbacks([]);
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

    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createFeedback(formData);
            setMessage({ text: 'Feedback submitted successfully!', type: 'success' });
            
            fetchData();
            handleCancel();
            
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setMessage({ text: 'Error submitting feedback', type: 'error' });
        }
    };

    const handleDelete = async (feedbackId) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                await deleteFeedback(feedbackId);
                setMessage({ text: 'Feedback deleted successfully!', type: 'success' });
                fetchData();
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } catch (error) {
                console.error('Error deleting feedback:', error);
                setMessage({ text: 'Error deleting feedback', type: 'error' });
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormData({
            comments: '',
            rating: 5,
            Member_id: ''
        });
        setMessage({ text: '', type: '' });
    };

    const renderStars = (rating, interactive = false) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
                        onClick={interactive ? () => handleRatingClick(star) : undefined}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Member Feedback</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        Submit Feedback
                    </button>
                )}
            </div>

            {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {showForm && (
                    <div className="member-form feedback-form">
                        <h2>Submit Your Feedback</h2>
                        <form onSubmit={handleSubmit}>
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
                                <label>Rating *</label>
                                {renderStars(formData.rating, true)}
                                <p className="rating-text">{formData.rating} out of 5 stars</p>
                            </div>

                            <div className="form-group">
                                <label>Comments *</label>
                                <textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleInputChange}
                                    placeholder="Share your experience with us..."
                                    rows="5"
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-submit">
                                    Submit Feedback
                                </button>
                                <button type="button" className="btn-cancel" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="feedback-list">
                    <h2>All Feedback</h2>
                    {feedbacks.length === 0 ? (
                        <div className="no-feedback">
                            <p>No feedback yet. Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="feedback-grid">
                            {feedbacks.map(feedback => {
                                const member = members.find(m => m.Member_id === feedback.M);
                                return (
                                    <div key={feedback.feedback_id} className="feedback-card">
                                        <div className="feedback-header">
                                            <div className="feedback-member">
                                                <strong>
                                                    {member ? member.Name : 'Anonymous'}
                                                </strong>
                                                <span className="feedback-date">
                                                    {new Date(feedback.feedback_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <button
                                                className="btn-delete-small"
                                                onClick={() => handleDelete(feedback.feedback_id)}
                                                title="Delete feedback"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="feedback-rating">
                                            {renderStars(feedback.rating)}
                                        </div>
                                        <p className="feedback-comments">{feedback.comments}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
        </div>
    );
};

export default Feedback;