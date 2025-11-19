import React, { useEffect, useState } from 'react';
import { getMonthlyRevenue } from '../../services/reportService';

const RevenueReport = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const data = await getMonthlyRevenue();
                setRevenueData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenueData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Revenue Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Total Payments</th>
                        <th>Total Revenue</th>
                        <th>Average Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {revenueData.map((item) => (
                        <tr key={item.Month}>
                            <td>{item.Month}</td>
                            <td>{item.Total_Payments}</td>
                            <td>{item.Total_Revenue}</td>
                            <td>{item.Average_Payment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueReport;