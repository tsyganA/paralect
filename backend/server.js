// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Для обработки JSON-тел запросов
app.use(cors()); // Для разрешения запросов с фронтенда

// Routes
app.use('/api/jobs', jobRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
