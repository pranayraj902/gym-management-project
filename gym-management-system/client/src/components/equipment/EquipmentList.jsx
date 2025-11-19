import React, { useEffect, useState } from 'react';
import { getEquipmentList } from '../../services/equipmentService';
import './EquipmentList.css';

const EquipmentList = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const data = await getEquipmentList();
                setEquipment(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="equipment-list">
            <h2>Equipment List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((item) => (
                        <tr key={item.equipment_id}>
                            <td>{item.equipment_id}</td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.availability}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentList;