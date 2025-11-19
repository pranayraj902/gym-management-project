import React, { useEffect, useState } from 'react';
import { getPaymentHistory } from '../../services/paymentService';
import './PaymentHistory.css';

const PaymentHistory = ({ memberId }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const data = await getPaymentHistory(memberId);
                setPayments(data);
            } catch (err) {
                setError('Failed to fetch payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [memberId]);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="payment-history">
            <h2>Payment History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Amount</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.Payment_ID}>
                            <td>{payment.Payment_ID}</td>
                            <td>{payment.Amount}</td>
                            <td>{new Date(payment.Payment_Date).toLocaleDateString()}</td>
                            <td>{payment.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;