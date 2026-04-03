const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/student', require('./routes/student'));
app.use('/api/verify', require('./routes/verify'));

app.get('/', (req, res) => res.send('VidyaChain API Running (In-Memory DB Mode)'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} (Zero-Dependency In-Memory DB)`);
});
