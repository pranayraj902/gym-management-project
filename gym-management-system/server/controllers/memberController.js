const Member = require('../models/memberModel');

// Get all members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.findAll();
        return res.status(200).json(members);
    } catch (error) {
        console.error('getAllMembers error:', error);
        return res.status(500).json({ message: 'Error retrieving members' });
    }
};

// Get a member by ID
exports.getMemberById = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await Member.findById(id);
        if (member) {
            return res.status(200).json(member);
        }
        return res.status(404).json({ message: 'Member not found' });
    } catch (error) {
        console.error('getMemberById error:', error);
        return res.status(500).json({ message: 'Error retrieving member' });
    }
};

// Create a new member
exports.createMember = async (req, res) => {
    const newMember = req.body;
    try {
        // Member.create returns the inserted id (insertId)
        const insertId = await Member.create(newMember);
        // Fetch the newly created member to return full object
        const created = await Member.findById(insertId);
        return res.status(201).json(created || { Member_id: insertId });
    } catch (error) {
        console.error('createMember error:', error);
        return res.status(500).json({ message: 'Error creating member' });
    }
};

// Update a member
exports.updateMember = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        // Ensure member exists first
        const existing = await Member.findById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Member not found' });
        }

        await Member.update(id, updatedData);
        const updatedMember = await Member.findById(id);
        return res.status(200).json(updatedMember);
    } catch (error) {
        console.error('updateMember error:', error);
        return res.status(500).json({ message: 'Error updating member' });
    }
};

// Delete a member
exports.deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        const existing = await Member.findById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Member not found' });
        }

        await Member.delete(id);
        return res.status(204).send();
    } catch (error) {
        console.error('deleteMember error:', error);
        return res.status(500).json({ message: 'Error deleting member' });
    }
};