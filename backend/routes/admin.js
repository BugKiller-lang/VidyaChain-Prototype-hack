const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { generateHash } = require('../utils/blockchainSim');
const Certificate = require('../models/Certificate');
const QRCode = require('qrcode');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretvidyachain123';

// Auth & Admin Middleware
const authAdmin = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admin only.' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/issue', authAdmin, upload.single('document'), async (req, res) => {
  try {
    const { studentName, studentEmail, institution, degree } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a PDF or image document.' });
    }

    // Step 1: Simulate Blockchain Hashing
    const fileHash = generateHash(req.file.buffer);

    // Step 2: Create Unique ID
    const uniqueId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

    // Step 3: Save to DB (Ledger)
    const newCert = new Certificate({
      studentName,
      studentEmail,
      institution,
      degree,
      fileHash,
      uniqueId,
      issuedBy: req.user.id
    });
    await newCert.save();

    // Step 4: Generate Verification QR Code
    const verificationUrl = `http://localhost:5173/verify/${uniqueId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);

    res.json({
      msg: 'Certificate issued and hashed on ledger',
      certificate: newCert,
      qrCodeDataUrl,
      verificationUrl
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/issued', authAdmin, async (req, res) => {
  try {
    const certs = await Certificate.find({ issuedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
