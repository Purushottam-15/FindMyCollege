require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const College = require('../models/College');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await College.deleteMany({});
        console.log('Cleared existing college data');

        const dataPath = path.join(__dirname, '..', '..', 'UG.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const collegeData = JSON.parse(jsonData);

        const transformedData = collegeData.map(item => ({
            srNo: item["Sr. No."],
            collegeCode: item["College Code"],
            courseType: item["Course Type"], 
            courseName: item["Course Name"],
            district: item["District"],
            collegeName: item["College Name"],
            contactNumber: item["Contact Number"] || null
        }));

        console.log(`Processing ${transformedData.length} records...`);

        await College.insertMany(transformedData);
        console.log(`Successfully inserted ${transformedData.length} colleges`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();