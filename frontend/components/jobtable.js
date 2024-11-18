import React, { useEffect, useState } from 'react';
import { fetchJobs, createJob } from '../utils/api';

const JobTable = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const loadJobs = async () => {
            const data = await fetchJobs();
            setJobs(data);
        };

        loadJobs();
    }, []);

    const handleAddJob = async () => {
        const newJob = {
            title: 'Frontend Developer',
            company: 'Tech Corp',
        };
        const createdJob = await createJob(newJob);
        setJobs(prev => [...prev, createdJob]);
    };

    return (
        <div>
            <h1>Jobs</h1>
            <button onClick={handleAddJob}>Add Job</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>{job.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;
