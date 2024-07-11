import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {format, formatDistanceToNow} from 'date-fns'

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const  token = localStorage.getItem('accessToken')
        const response = await axios.get('http://localhost:3002/job/all-jobs' , {
          headers: {
            Authorization :`Bearer ${token}`
          }
        });
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

      <div className='bg-slate-400 flex flex-col gap-6 p-4 w-[600px] rounded-3xl'>
        {jobs.map((job) => (
          
          <ul key={job.Id} className='bg-slate-50 p-6 flex flex-col rounded-3xl'>
            <div className='flex justify-between'>
              <li className='font-extrabold text-xl'>{job.Title}</li>
              <div>
              <p>{format(new Date(job.DatePosted) , 'MMMM dd, yyy')}</p>
              <p className='text-red-500'>{formatDistanceToNow(new Date(job.DatePosted) , {addSuffix : true})}</p>

            </div>

            </div>
            
            <div className="prose" dangerouslySetInnerHTML={{ __html: job.Description.substring(0,200) + '...' }} />
           <Link to = {`/job-postings/${job.Id}`}>
              <button className='bg-blue-400 text-white p-2 rounded-xl '>Open</button>
           </Link> 
            
            
          </ul>
        ))}
      </div>
    </>
  );
}
