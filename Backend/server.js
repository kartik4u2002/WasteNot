require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const ngosRoutes = require('./routes/ngos');
const donationsRoutes = require('./routes/donations');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ngos', ngosRoutes);
app.use('/api/donations', donationsRoutes);

// Basic health check
app.get('/', (req, res) => res.send({ status: 'ok', message: 'NGO Connect API' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
