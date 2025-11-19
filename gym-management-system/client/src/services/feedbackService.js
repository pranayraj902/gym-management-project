import api from './api';

export const getFeedbacks = async () => {
    const response = await api.get('/feedback');
    return response.data;
};

export const getFeedback = async () => {
    const response = await api.get('/feedback');
    return response.data;
};

export const submitFeedback = async (feedbackData) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
};

export const createFeedback = async (feedbackData) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
};

export const deleteFeedback = async (feedbackId) => {
    const response = await api.delete(`/feedback/${feedbackId}`);
    return response.data;
};

export const updateFeedback = async (feedbackId, feedbackData) => {
    const response = await api.put(`/feedback/${feedbackId}`, feedbackData);
    return response.data;
};

const feedbackService = {
    getFeedbacks,
    getFeedback,
    submitFeedback,
    createFeedback,
    deleteFeedback,
    updateFeedback
};

export default feedbackService;