// backend/routes/jobs.js
const express = require('express');
const Job = require('../models/job');
const router = express.Router();

// Получить все вакансии
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 }); // Сортировка по дате создания
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Создать новую вакансию
router.post('/', async (req, res) => {
    const { company, position, salaryRange, status, note } = req.body;

    if (!company || !position) {
        return res.status(400).json({ message: 'Company and Position are required fields.' });
    }

    try {
        const job = new Job({ company, position, salaryRange, status, note });
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Обновить вакансию
router.put('/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Удалить вакансию
router.delete('/:id', async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
