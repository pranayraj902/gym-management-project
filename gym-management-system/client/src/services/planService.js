import api from './api';

export const getAllPlans = async () => {
    const response = await api.get('/plans');
    return response.data;
};

export const getPlanById = async (id) => {
    const response = await api.get(`/plans/${id}`);
    return response.data;
};

export const createPlan = async (planData) => {
    const response = await api.post('/plans', planData);
    return response.data;
};

export const updatePlan = async (id, planData) => {
    const response = await api.put(`/plans/${id}`, planData);
    return response.data;
};

export const deletePlan = async (id) => {
    const response = await api.delete(`/plans/${id}`);
    return response.data;
};

const planService = {
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};

export default planService;
