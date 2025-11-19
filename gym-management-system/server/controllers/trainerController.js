const Trainer = require('../models/trainerModel');

// Get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.getAllTrainers();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trainers', error });
    }
};

// Get trainer by ID
exports.getTrainerById = async (req, res) => {
    const { id } = req.params;
    try {
        const trainer = await Trainer.getTrainerById(id);
        if (trainer) {
            res.status(200).json(trainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trainer', error });
    }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
    const { Name, Email, Phone, Salary } = req.body;
    try {
        const trainerId = await Trainer.createTrainer({ Name, Email, Phone, Salary });
        const newTrainer = await Trainer.getTrainerById(trainerId);
        res.status(201).json(newTrainer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating trainer', error });
    }
};

// Update trainer
exports.updateTrainer = async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Phone, Salary } = req.body;
    try {
        await Trainer.updateTrainer(id, { Name, Email, Phone, Salary });
        const updatedTrainer = await Trainer.getTrainerById(id);
        if (updatedTrainer) {
            res.status(200).json(updatedTrainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating trainer', error });
    }
};

// Delete trainer
exports.deleteTrainer = async (req, res) => {
    const { id } = req.params;
    try {
        await Trainer.deleteTrainer(id);
        res.status(200).json({ message: 'Trainer deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trainer', error });
    }
};