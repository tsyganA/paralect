// backend/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        company: { type: String, required: true },
        position: { type: String, required: true },
        salaryRange: { type: String },
        status: { type: String }, // Добавлена проверка значения
        note: { type: String },
    },
    { timestamps: true }
); // Автоматически добавляет createdAt и updatedAt

module.exports = mongoose.model('Job', jobSchema);
