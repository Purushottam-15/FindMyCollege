const mongoose = require('mongoose');

const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/college_search';
const connectDatabase = async () => {
    try {
        // const conn = await mongoose.connect(LOCAL_MONGODB_URI);
        const uri = process.env.MONGO_URL || LOCAL_MONGODB_URI;
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;