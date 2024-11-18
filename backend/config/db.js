// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Убраны устаревшие параметры
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Завершение процесса с ошибкой
    }
};

module.exports = connectDB;
