const express = require('express');
const router = express.Router();
const multer = require('multer');
const { generateHash } = require('../utils/blockchainSim');
const Certificate = require('../models/Certificate');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public Verification via ID (without providing file, just checking existence)
router.get('/:uniqueId', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ uniqueId: req.params.uniqueId }).populate('issuedBy', 'name');
    if (!cert) {
      return res.status(404).json({ valid: false, msg: 'Certificate not found on ledger.' });
    }
    
    res.json({
      valid: true,
      msg: 'Certificate found on ledger',
      data: {
        studentName: cert.studentName,
        institution: cert.institution,
        degree: cert.degree,
        issueDate: cert.issueDate,
        issuer: cert.issuedBy.name
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Advanced Verification: Check providing file to compare hashes
router.post('/check-document/:uniqueId', upload.single('document'), async (req, res) => {
  try {
    const cert = await Certificate.findOne({ uniqueId: req.params.uniqueId });
    if (!cert) {
      return res.status(404).json({ valid: false, msg: 'Certificate not found.' });
    }

    if (!req.file) {
      return res.status(400).json({ valid: false, msg: 'No document provided for comparison.' });
    }

    const uploadedHash = generateHash(req.file.buffer);
    
    if (uploadedHash === cert.fileHash) {
      return res.json({ valid: true, msg: 'Hash matches perfectly. Document is authentic.' });
    } else {
      return res.json({ valid: false, msg: 'HASH MISMATCH. Document has been tampered with or is fake.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
