const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  username: { type: String, required: true, lowercase: true },
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);