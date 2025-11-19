import React, { useEffect, useState } from 'react';
import { getMembershipReport } from '../../services/reportService';

const MembershipReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const data = await getMembershipReport();
                setReportData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Membership Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Join Date</th>
                        <th>Status</th>
                        <th>Membership Expiry</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map(member => (
                        <tr key={member.Member_id}>
                            <td>{member.Member_id}</td>
                            <td>{member.Name}</td>
                            <td>{new Date(member.Join_Date).toLocaleDateString()}</td>
                            <td>{member.status}</td>
                            <td>{member.membership_expiry ? new Date(member.membership_expiry).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MembershipReport;