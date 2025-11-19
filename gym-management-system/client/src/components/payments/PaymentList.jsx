import React, { useEffect, useState } from 'react';
import { getPayments } from '../../services/paymentService';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getPayments();
                setPayments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Payment List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Member ID</th>
                        <th>Amount</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.Payment_ID}>
                            <td>{payment.Payment_ID}</td>
                            <td>{payment.Member_id}</td>
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

export default PaymentList;