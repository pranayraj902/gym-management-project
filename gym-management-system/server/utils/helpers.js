module.exports = {
    formatDate: (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    },

    calculateAge: (birthDate) => {
        const ageDiff = Date.now() - new Date(birthDate).getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    },

    generateUniqueId: () => {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    },

    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    responseHandler: (res, status, message, data = null) => {
        res.status(status).json({
            message,
            data
        });
    }
};