import api from './api';

export const getAllSessions = async () => {
    try {
        const response = await api.get('/sessions');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSessions = async () => {
    try {
        const response = await api.get('/sessions');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSessionById = async (sessionId) => {
    try {
        const response = await api.get(`/sessions/${sessionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createSession = async (sessionData) => {
    try {
        const response = await api.post('/sessions', sessionData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSession = async (sessionId, sessionData) => {
    try {
        const response = await api.put(`/sessions/${sessionId}`, sessionData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSession = async (sessionId) => {
    try {
        const response = await api.delete(`/sessions/${sessionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bookSession = async (memberId, sessionId) => {
    try {
        const response = await api.post(`/sessions/${sessionId}/book`, { memberId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const sessionService = {
    getAllSessions,
    getSessions,
    getSessionById,
    createSession,
    updateSession,
    deleteSession,
    bookSession
};

export default sessionService;