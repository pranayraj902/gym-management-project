import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import paymentService from '../../services/paymentService';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState('');
    const [memberId, setMemberId] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const paymentData = {
                amount: parseFloat(amount),
                mode,
                memberId: parseInt(memberId),
            };
            await paymentService.processPayment(paymentData);
            history.push('/payments');
        } catch (err) {
            setError('Failed to process payment. Please try again.');
        }
    };

    return (
        <div className="payment-form">
            <h2>Process Payment</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Payment Mode:</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value)} required>
                        <option value="">Select Mode</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div>
                    <label>Member ID:</label>
                    <input
                        type="number"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default PaymentForm;