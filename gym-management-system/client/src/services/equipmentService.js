import api from './api';

export const getAllEquipment = async () => {
    const response = await api.get('/equipment');
    return response.data;
};

export const getEquipmentList = async () => {
    const response = await api.get('/equipment');
    return response.data;
};

export const getEquipmentById = async (id) => {
    const response = await api.get(`/equipment/${id}`);
    return response.data;
};

export const createEquipment = async (equipmentData) => {
    const response = await api.post('/equipment', equipmentData);
    return response.data;
};

export const updateEquipment = async (id, equipmentData) => {
    const response = await api.put(`/equipment/${id}`, equipmentData);
    return response.data;
};

export const deleteEquipment = async (id) => {
    const response = await api.delete(`/equipment/${id}`);
    return response.data;
};

export const getMaintenanceLogs = async (equipmentId) => {
    const response = await api.get(`/equipment/${equipmentId}/maintenance`);
    return response.data;
};

const equipmentService = {
    getAllEquipment,
    getEquipmentList,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getMaintenanceLogs
};

export default equipmentService;