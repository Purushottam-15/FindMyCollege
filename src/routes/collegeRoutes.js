const express = require('express');
const router = express.Router();
const College = require('../models/College');

router.get('/', async (req, res) => {
    try {
        const {
            search,
            course,
            district,
            courseType,
            page = 1,
            limit = 20
        } = req.query;

        const filter = {};
        
        if (district && district !== 'All') {
            filter['District'] = district;
        }
        
        if (course && course !== 'All') {
            filter['Course Name'] = course;
        }
        
        if (courseType && courseType !== 'All') {
            filter['Course Type'] = courseType;
        }
        
        if (search && search.trim()) {
            filter.$or = [
                { 'College Name': { $regex: search, $options: 'i' } },
                { 'District': { $regex: search, $options: 'i' } },
                { 'Course Name': { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        
        const colleges = await College.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await College.countDocuments(filter);

        res.json({
            success: true,
            data: colleges,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total: total
            }
        });

    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
});

router.get('/filters', async (req, res) => {
    try {
        const districts = await College.distinct('District');
        const courseNames = await College.distinct('Course Name');
        const courseTypes = await College.distinct('Course Type');
        
        res.json({
            success: true,
            data: {
                districts: districts.filter(d => d && d !== '' && d !== null).sort(),
                courseNames: courseNames.filter(c => c && c !== '' && c !== null).sort(),
                courseTypes: courseTypes.filter(t => t && t !== '' && t !== null).sort()
            }
        });
    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
});

module.exports = router;