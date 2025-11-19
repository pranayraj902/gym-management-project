const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phone) => {
    const re = /^\d{10}$/; // Adjust the regex as per your phone number format
    return re.test(String(phone));
};

const validateRequiredField = (value) => {
    return value && value.trim() !== '';
};

const validateMembershipExpiry = (expiryDate) => {
    const today = new Date();
    return new Date(expiryDate) > today;
};

export {
    validateEmail,
    validatePhoneNumber,
    validateRequiredField,
    validateMembershipExpiry
};