import api from './api';

export const getMonthlyRevenue = async (month = null, year = null) => {
    try {
        const params = new URLSearchParams();
        if (month) params.append('month', month);
        if (year) params.append('year', year);
        const queryString = params.toString();
        const response = await api.get(`/reports/revenue${queryString ? '?' + queryString : ''}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        throw error;
    }
};

export const getMembershipReport = async () => {
    try {
        const response = await api.get('/reports/membership');
        return response.data;
    } catch (error) {
        console.error('Error fetching membership report:', error);
        throw error;
    }
};

export const getTrainerPerformance = async (trainerId = null) => {
    try {
        const url = trainerId ? `/reports/trainer/${trainerId}` : '/reports/trainer';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching trainer performance:', error);
        throw error;
    }
};

const reportService = {
    getMonthlyRevenue,
    getMembershipReport,
    getTrainerPerformance
};

export default reportService;