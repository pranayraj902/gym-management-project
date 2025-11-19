import React, { useEffect, useState } from 'react';
import { getFeedback } from '../../services/feedbackService';

const FeedbackList = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const data = await getFeedback();
                setFeedbackList(data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Feedback List</h2>
            <ul>
                {feedbackList.map(feedback => (
                    <li key={feedback.feedback_id}>
                        <p><strong>Comments:</strong> {feedback.comments}</p>
                        <p><strong>Rating:</strong> {feedback.rating}</p>
                        <p><strong>Date:</strong> {new Date(feedback.feedback_date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackList;