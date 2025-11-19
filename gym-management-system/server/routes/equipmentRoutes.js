const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// Get all equipment
router.get('/', equipmentController.getAllEquipment);

// Get equipment by ID
router.get('/:id', equipmentController.getEquipmentById);

// Create new equipment
router.post('/', equipmentController.createEquipment);

// Update equipment by ID
router.put('/:id', equipmentController.updateEquipment);

// Delete equipment by ID
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;