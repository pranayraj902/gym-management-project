const Payment = require('../models/paymentModel');

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payments', error: error.message });
    }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findById(id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment', error: error.message });
    }
};

// Create a new payment
exports.createPayment = async (req, res) => {
    const { Amount, Payment_Date, Mode, Status, Member_id } = req.body;
    try {
        const result = await Payment.create({ 
            Amount, 
            Payment_Date, 
            Mode, 
            Status: Status || 'Pending', 
            Member_id 
        });
        const newPayment = await Payment.findById(result.insertId);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};

// Update a payment
exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { Amount, Payment_Date, Mode, Status, Member_id } = req.body;
    try {
        await Payment.update(id, { Amount, Payment_Date, Mode, Status, Member_id });
        const updatedPayment = await Payment.findById(id);
        if (updatedPayment) {
            res.status(200).json(updatedPayment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment', error: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        await Payment.delete(id);
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
};