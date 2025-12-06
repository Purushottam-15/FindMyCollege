const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'purush' && password === 'purush2006') {
        return res.json({ success: true, message: 'Admin login successful' });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

module.exports = router;