import React, { useState } from 'react';
import { submitFeedback } from '../../services/feedbackService';

const FeedbackForm = () => {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await submitFeedback({ comments, rating });
            setMessage(response.data.message);
            setComments('');
            setRating(1);
        } catch (error) {
            setMessage('Error submitting feedback. Please try again.');
        }
    };

    return (
        <div className="feedback-form">
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="comments">Comments:</label>
                    <textarea
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FeedbackForm;