const express = require('express');
const router = express.Router();
const College = require('../models/College');

router.post('/colleges', async (req, res) => {
    try {
        const college = new College(req.body);
        await college.save();
        res.json({ success: true, message: 'College added successfully', data: college });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/colleges/:id', async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.json({ success: true, message: 'College updated successfully', data: college });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/colleges/:id', async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.json({ success: true, message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/colleges/search', async (req, res) => {
    try {
        const { q } = req.query;
        const colleges = await College.find({
            $or: [
                { 'College Name': { $regex: q, $options: 'i' } },
                { 'College Code': { $regex: q, $options: 'i' } },
                { 'District': { $regex: q, $options: 'i' } }
            ]
        }).limit(10);
        res.json({ success: true, data: colleges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;