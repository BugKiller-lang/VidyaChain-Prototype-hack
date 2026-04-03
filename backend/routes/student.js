const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Certificate = require('../models/Certificate');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretvidyachain123';

const authStudent = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

router.get('/my-certificates', authStudent, async (req, res) => {
  try {
    // Assuming student user has same email as what admin entered
    // In a real app we'd map this safely, here we'll just check by user email
    const user = await require('../models/User').findById(req.user.id);
    const certs = await Certificate.find({ studentEmail: user.email }).sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
