const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US');
};

const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const ageDiff = Date.now() - new Date(birthDate).getTime();
    return Math.floor(ageDiff / (1000 * 3600 * 24 * 365.25));
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export { formatDate, calculateAge, validateEmail, capitalizeFirstLetter };