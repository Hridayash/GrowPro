import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3002/job/all-jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Link to="/create-job">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">+ Add</button>
      </Link>

      <div className='bg-slate-400 flex flex-col gap-2 p-4 w-[600px]'>
        {jobs.map((job) => (
          <ul key={job.Id} className='bg-red-50 p-6'>
            <li className='font-extrabold text-xl'>{job.Title}</li>
            <div className="prose" dangerouslySetInnerHTML={{ __html: job.Description.substring(0,100) }} />
          </ul>
        ))}
      </div>
    </>
  );
}
