import api from './api';

export const checkIn = async (memberId) => {
    try {
        const response = await api.post(`/attendance/checkin`, { memberId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkInMember = async (memberId) => {
    try {
        const response = await api.post(`/attendance/checkin`, { memberId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkOut = async (memberId, logId) => {
    try {
        const response = await api.post(`/attendance/checkout`, { memberId, logId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkOutMember = async (memberId, logId) => {
    try {
        const response = await api.post(`/attendance/checkout`, { memberId, logId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAttendanceLog = async (memberId = null) => {
    try {
        const url = memberId ? `/attendance?memberId=${memberId}` : '/attendance';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const attendanceService = {
    checkIn,
    checkInMember,
    checkOut,
    checkOutMember,
    getAttendanceLog
};

export default attendanceService;