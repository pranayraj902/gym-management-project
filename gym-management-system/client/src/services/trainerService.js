import api from './api';

export const getAllTrainers = async () => {
    try {
        const response = await api.get('/trainers');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTrainers = async () => {
    try {
        const response = await api.get('/trainers');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTrainerById = async (trainerId) => {
    try {
        const response = await api.get(`/trainers/${trainerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createTrainer = async (trainerData) => {
    try {
        const response = await api.post('/trainers', trainerData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTrainer = async (trainerId, trainerData) => {
    try {
        const response = await api.put(`/trainers/${trainerId}`, trainerData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTrainer = async (trainerId) => {
    try {
        const response = await api.delete(`/trainers/${trainerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const trainerService = {
    getAllTrainers,
    getTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
};

export default trainerService;