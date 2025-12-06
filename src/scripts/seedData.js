const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const College = require('../models/College');

const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/findmycollegeDB';

const seedDatabase = async () => {
    try {
        await mongoose.connect(LOCAL_MONGODB_URI); 
        console.log('Connected to MongoDB');

        await College.deleteMany({});
        console.log('Cleared existing college data');

        const dataPath = path.join(__dirname, '..', '..', 'UG.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const collegeData = JSON.parse(jsonData);

        const transformedData = collegeData.map(item => ({
            "Sr. No.": item["Sr. No."],
            "College Code": item["College Code"],
            "Course Type": item["Course Type"], 
            "Course Name": item["Course Name"],
            "District": item["District"],
            "College Name": item["College Name"],
            "Contact Number": item["Contact Number"] || null
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