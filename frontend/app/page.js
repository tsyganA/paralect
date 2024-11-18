//frontend\app\page.js
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({ company: '', position: '', salaryRange: '', status: '', note: '' });
    const [editMode, setEditMode] = useState(false); // Режим редактирования
    const [currentJobId, setCurrentJobId] = useState(null); // ID текущей редактируемой записи

    const statusOptions = ['Applied', 'Interviewing', 'Offer', 'Rejected', 'On Hold'];

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
                setJobs(res.data);
            } catch (error) {
                console.error('Error fetching jobs:', error.response?.data || error.message);
            }
        };

        loadJobs();
    }, []);

    const handleAddOrUpdateJob = async e => {
        e.preventDefault();

        if (!newJob.company || !newJob.position) {
            alert('Company and Position are required fields.');
            return;
        }

        try {
            if (editMode) {
                // Режим редактирования
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${currentJobId}`, newJob);
                setJobs(jobs.map(job => (job._id === currentJobId ? res.data : job)));
                setEditMode(false);
                setCurrentJobId(null);
            } else {
                // Режим добавления
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, newJob);
                setJobs([...jobs, res.data]);
            }

            setNewJob({ company: '', position: '', salaryRange: '', status: '', note: '' });
        } catch (error) {
            console.error('Error adding/updating job:', error.response?.data || error.message);
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewJob(prevJob => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleEditJob = job => {
        setEditMode(true);
        setCurrentJobId(job._id);
        setNewJob(job);
    };

    const handleDeleteJob = async jobId => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`);
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error('Error deleting job:', error.response?.data || error.message);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setCurrentJobId(null);
        setNewJob({ company: '', position: '', salaryRange: '', status: '', note: '' });
    };

    return (
        <div>
            <h1>Job Tracker</h1>
            <form onSubmit={handleAddOrUpdateJob}>
                <input type="text" name="company" value={newJob.company} onChange={handleInputChange} placeholder="Company Name" required />
                <input type="text" name="position" value={newJob.position} onChange={handleInputChange} placeholder="Position" required />
                <input type="text" name="salaryRange" value={newJob.salaryRange} onChange={handleInputChange} placeholder="Salary Range" />

                <select name="status" value={newJob.status} onChange={handleInputChange} required>
                    <option value="" disabled>
                        Select Status
                    </option>
                    {statusOptions.map(status => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <input type="text" name="note" value={newJob.note} onChange={handleInputChange} placeholder="Notes" />
                <button type="submit">{editMode ? 'Update Job' : 'Add Job'}</button>
                {editMode && (
                    <button type="button" onClick={handleCancelEdit}>
                        Cancel
                    </button>
                )}
            </form>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <strong>{job.company}</strong> - {job.position} - {job.salaryRange} - {job.status} - {job.note}
                        <button onClick={() => handleEditJob(job)}>Edit</button>
                        <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
