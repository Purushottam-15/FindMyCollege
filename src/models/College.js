const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    'Sr. No.': {
        type: Number,
        required: true
    },
    'College Code': {
        type: String,
        required: true
    },
    'Course Type': {
        type: String,
        required: true
    },
    'Course Name': {
        type: String,
        required: true
    },
    'District': {
        type: String,
        required: true
    },
    'College Name': {
        type: String,
        required: true
    },
    'Location': String,
    'contactNumber': String
}, {
    collection: 'colleges'
});

module.exports = mongoose.model('College', collegeSchema);