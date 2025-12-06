const mongoose = require('mongoose');

const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/college_search';
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(LOCAL_MONGODB_URI);
        console.log(`MongoDB Connected Locally: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        console.error('*** HINT: Is your local MongoDB server running? ***');
        process.exit(1);
    }
};

module.exports = connectDatabase;