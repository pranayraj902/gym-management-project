import api from './api';

export const getPayments = async () => {
    const response = await api.get('/payments');
    return response.data;
};

export const getPaymentById = async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
};

export const createPayment = async (paymentData) => {
    const response = await api.post('/payments', paymentData);
    return response.data;
};

export const updatePayment = async (paymentId, paymentData) => {
    const response = await api.put(`/payments/${paymentId}`, paymentData);
    return response.data;
};

export const deletePayment = async (paymentId) => {
    const response = await api.delete(`/payments/${paymentId}`);
    return response.data;
};

export const getPaymentHistory = async (memberId) => {
    const response = await api.get(`/payments/history/${memberId}`);
    return response.data;
};

const paymentService = {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentHistory
};

export default paymentService;