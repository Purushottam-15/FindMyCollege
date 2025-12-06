const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDatabase = require('./src/config/database');
const collegeRoutes = require('./src/routes/collegeRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');
const adminAuthRoutes = require('./src/routes/adminAuthRoutes');

const app = express();

connectDatabase();

function requireAdmin(req, res, next) {
    if (req.headers['x-admin-auth'] === 'true') {
        return next();
    }
    res.status(403).json({ success: false, message: 'Forbidden' });
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

app.use('/api/admin', requireAdmin, adminRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});