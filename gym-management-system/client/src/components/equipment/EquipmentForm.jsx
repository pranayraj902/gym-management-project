import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createEquipment, updateEquipment, getEquipmentById } from '../../services/equipmentService';

const EquipmentForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const [equipment, setEquipment] = useState({
        name: '',
        type: '',
        availability: 'Available',
        maintenance_dates: '',
        purchase_date: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const fetchEquipment = async () => {
                const data = await getEquipmentById(id);
                setEquipment(data);
            };
            fetchEquipment();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipment({ ...equipment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateEquipment(id, equipment);
        } else {
            await createEquipment(equipment);
        }
        history.push('/equipment');
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Equipment' : 'Add Equipment'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={equipment.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" name="type" value={equipment.type} onChange={handleChange} required />
                </div>
                <div>
                    <label>Availability:</label>
                    <select name="availability" value={equipment.availability} onChange={handleChange}>
                        <option value="Available">Available</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                </div>
                <div>
                    <label>Maintenance Dates:</label>
                    <input type="date" name="maintenance_dates" value={equipment.maintenance_dates} onChange={handleChange} />
                </div>
                <div>
                    <label>Purchase Date:</label>
                    <input type="date" name="purchase_date" value={equipment.purchase_date} onChange={handleChange} />
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Add'} Equipment</button>
            </form>
        </div>
    );
};

export default EquipmentForm;