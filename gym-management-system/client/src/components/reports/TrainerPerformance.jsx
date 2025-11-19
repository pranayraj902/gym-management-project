import React, { useEffect, useState } from 'react';
import { getTrainerPerformance } from '../../services/reportService';

const TrainerPerformance = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const data = await getTrainerPerformance();
                setPerformanceData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Trainer Performance Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Trainer Name</th>
                        <th>Total Members</th>
                        <th>Total Sessions</th>
                        <th>Avg Participants Per Session</th>
                        <th>Total Training Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {performanceData.map((trainer) => (
                        <tr key={trainer.Trainer_ID}>
                            <td>{trainer.Trainer_Name}</td>
                            <td>{trainer.Total_Members}</td>
                            <td>{trainer.Total_Sessions}</td>
                            <td>{trainer.Avg_Participants_Per_Session}</td>
                            <td>{trainer.Total_Training_Hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerPerformance;