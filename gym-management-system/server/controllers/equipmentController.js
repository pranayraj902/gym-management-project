const Equipment = require('../models/equipmentModel');

// Get all equipment
exports.getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.getAll();
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving equipment', error: error.message });
    }
};

// Get equipment by ID
exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.getById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving equipment', error: error.message });
    }
};

// Create new equipment
exports.createEquipment = async (req, res) => {
    try {
        const equipmentId = await Equipment.create(req.body);
        const newEquipment = await Equipment.getById(equipmentId);
        res.status(201).json(newEquipment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating equipment', error: error.message });
    }
};

// Update equipment
exports.updateEquipment = async (req, res) => {
    try {
        await Equipment.update(req.params.id, req.body);
        const updatedEquipment = await Equipment.getById(req.params.id);
        if (!updatedEquipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(updatedEquipment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating equipment', error: error.message });
    }
};

// Delete equipment
exports.deleteEquipment = async (req, res) => {
    try {
        await Equipment.delete(req.params.id);
        res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting equipment', error: error.message });
    }
};