// frontend/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

// Получить все вакансии
export const fetchJobs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        throw error;
    }
};

// Создать новую вакансию
export const createJob = async job => {
    try {
        const response = await axios.post(API_URL, job);
        return response.data;
    } catch (error) {
        console.error('Error creating job:', error.message);
        throw error;
    }
};

// Обновить вакансию
export const updateJob = async (id, job) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, job);
        return response.data;
    } catch (error) {
        console.error('Error updating job:', error.message);
        throw error;
    }
};

// Удалить вакансию
export const deleteJob = async id => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job:', error.message);
        throw error;
    }
};
