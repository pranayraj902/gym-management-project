import React, { useEffect, useState } from 'react';
import { getAllEquipment, createEquipment, updateEquipment, deleteEquipment } from '../services/equipmentService';
import Loader from '../components/common/Loader';
import '../styles/Members.css';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        availability: 'Available',
        last_maintenance: '',
        purchase_date: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getAllEquipment();
            setEquipment(data);
        } catch (error) {
            console.error('Error fetching equipment:', error);
            setMessage({ text: 'Error loading equipment', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEquipment) {
                await updateEquipment(editingEquipment.equipment_id, formData);
                setMessage({ text: 'Equipment updated successfully!', type: 'success' });
            } else {
                await createEquipment(formData);
                setMessage({ text: 'Equipment created successfully!', type: 'success' });
            }
            
            fetchData();
            handleCancel();
            
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            console.error('Error saving equipment:', error);
            setMessage({ text: 'Error saving equipment', type: 'error' });
        }
    };

    const handleEdit = (item) => {
        setEditingEquipment(item);
        setFormData({
            name: item.name || '',
            type: item.type || '',
            availability: item.availability || 'Available',
            last_maintenance: item.last_maintenance ? item.last_maintenance.split('T')[0] : '',
            purchase_date: item.purchase_date ? item.purchase_date.split('T')[0] : ''
        });
        setShowForm(true);
        setMessage({ text: '', type: '' });
    };

    const handleDelete = async (equipmentId) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            try {
                await deleteEquipment(equipmentId);
                setMessage({ text: 'Equipment deleted successfully!', type: 'success' });
                fetchData();
                setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            } catch (error) {
                console.error('Error deleting equipment:', error);
                setMessage({ text: 'Error deleting equipment', type: 'error' });
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingEquipment(null);
        setFormData({
            name: '',
            type: '',
            availability: 'Available',
            last_maintenance: '',
            purchase_date: ''
        });
        setMessage({ text: '', type: '' });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="members-container">
            <div className="members-header">
                <h1>Equipment Management</h1>
                {!showForm && (
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        Add New Equipment
                    </button>
                )}
            </div>

            {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {showForm && (
                    <div className="member-form">
                        <h2>{editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Equipment Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Treadmill"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Strength">Strength</option>
                                        <option value="Free Weights">Free Weights</option>
                                        <option value="Machine">Machine</option>
                                        <option value="Accessory">Accessory</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Availability *</label>
                                    <select
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Available">Available</option>
                                        <option value="In Use">In Use</option>
                                        <option value="Under Maintenance">Under Maintenance</option>
                                        <option value="Out of Order">Out of Order</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Last Maintenance</label>
                                    <input
                                        type="date"
                                        name="last_maintenance"
                                        value={formData.last_maintenance}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Purchase Date</label>
                                    <input
                                        type="date"
                                        name="purchase_date"
                                        value={formData.purchase_date}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-submit">
                                    {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
                                </button>
                                <button type="button" className="btn-cancel" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="members-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Availability</th>
                                <th>Last Maintenance</th>
                                <th>Purchase Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipment.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                                        No equipment found. Add your first equipment!
                                    </td>
                                </tr>
                            ) : (
                                equipment.map(item => (
                                    <tr key={item.equipment_id}>
                                        <td>{item.equipment_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>
                                            <span className={`status-badge ${
                                                item.availability === 'Available' ? 'paid' :
                                                item.availability === 'In Use' ? 'pending' :
                                                'error'
                                            }`}>
                                                {item.availability}
                                            </span>
                                        </td>
                                        <td>
                                            {item.last_maintenance ? new Date(item.last_maintenance).toLocaleDateString() : '-'}
                                        </td>
                                        <td>
                                            {item.purchase_date ? new Date(item.purchase_date).toLocaleDateString() : '-'}
                                        </td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(item.equipment_id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default Equipment;