const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    "Sr. No.": {
        type: Number
    },
    "College Code": {
        type: String
    },
    "College Name": {
        type: String
    },
    "District": {
        type: String
    },
    "Course Name": {
        type: String
    },
    "Course Type": {
        type: String
    },
    "Location": {
        type: String
    },
    "Contact Number": {
        type: String
    }
}, { 
    strict: false,  
    collection: 'colleges' 
});

module.exports = mongoose.model('College', collegeSchema);