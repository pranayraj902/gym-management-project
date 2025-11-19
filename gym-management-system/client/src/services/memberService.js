import api from './api';

export const getAllMembers = async () => {
    const response = await api.get('/members');
    return response.data;
};

export const getMembers = async () => {
    const response = await api.get('/members');
    return response.data;
};

export const getMemberById = async (id) => {
    const response = await api.get(`/members/${id}`);
    return response.data;
};

export const createMember = async (memberData) => {
    const response = await api.post('/members', memberData);
    return response.data;
};

export const updateMember = async (id, memberData) => {
    const response = await api.put(`/members/${id}`, memberData);
    return response.data;
};

export const deleteMember = async (id) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
};

const memberService = {
    getAllMembers,
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};

export default memberService;