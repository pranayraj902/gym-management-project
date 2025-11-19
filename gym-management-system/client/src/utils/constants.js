const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const MEMBER_API = `${API_BASE_URL}/members`;
const TRAINER_API = `${API_BASE_URL}/trainers`;
const SESSION_API = `${API_BASE_URL}/sessions`;
const PAYMENT_API = `${API_BASE_URL}/payments`;
const EQUIPMENT_API = `${API_BASE_URL}/equipment`;
const ATTENDANCE_API = `${API_BASE_URL}/attendance`;
const FEEDBACK_API = `${API_BASE_URL}/feedback`;
const REPORT_API = `${API_BASE_URL}/reports`;

export {
    MEMBER_API,
    TRAINER_API,
    SESSION_API,
    PAYMENT_API,
    EQUIPMENT_API,
    ATTENDANCE_API,
    FEEDBACK_API,
    REPORT_API
};