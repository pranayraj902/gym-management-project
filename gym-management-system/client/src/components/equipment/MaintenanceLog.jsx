import React, { useEffect, useState } from 'react';
import { getMaintenanceLogs } from '../../services/equipmentService';

const MaintenanceLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getMaintenanceLogs();
                setLogs(response.data);
            } catch (err) {
                setError('Failed to fetch maintenance logs');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Equipment Maintenance Log</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipment ID</th>
                        <th>Maintenance Date</th>
                        <th>Description</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.log_id}>
                            <td>{log.log_id}</td>
                            <td>{log.equipment_id}</td>
                            <td>{new Date(log.maintenance_date).toLocaleDateString()}</td>
                            <td>{log.description}</td>
                            <td>{log.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaintenanceLog;