const Plan = require('../models/planModel');

// Get all plans
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll();
        return res.status(200).json(plans);
    } catch (error) {
        console.error('getAllPlans error:', error);
        return res.status(500).json({ message: 'Error retrieving plans' });
    }
};

// Get a plan by ID
exports.getPlanById = async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await Plan.findById(id);
        if (plan) {
            return res.status(200).json(plan);
        }
        return res.status(404).json({ message: 'Plan not found' });
    } catch (error) {
        console.error('getPlanById error:', error);
        return res.status(500).json({ message: 'Error retrieving plan' });
    }
};

// Create a new plan
exports.createPlan = async (req, res) => {
    const newPlan = req.body;
    try {
        const insertId = await Plan.create(newPlan);
        const created = await Plan.findById(insertId);
        return res.status(201).json(created || { Plan_id: insertId });
    } catch (error) {
        console.error('createPlan error:', error);
        return res.status(500).json({ message: 'Error creating plan' });
    }
};

// Update a plan
exports.updatePlan = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const existing = await Plan.findById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        await Plan.update(id, updatedData);
        const updatedPlan = await Plan.findById(id);
        return res.status(200).json(updatedPlan);
    } catch (error) {
        console.error('updatePlan error:', error);
        return res.status(500).json({ message: 'Error updating plan' });
    }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
    const { id } = req.params;
    try {
        const existing = await Plan.findById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        await Plan.delete(id);
        return res.status(204).send();
    } catch (error) {
        console.error('deletePlan error:', error);
        return res.status(500).json({ message: 'Error deleting plan' });
    }
};
