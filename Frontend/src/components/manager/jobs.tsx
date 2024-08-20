import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import getUserRole from '../authcheck/getRole';

interface Job {
  Id: number;
  Title: string;
  Description: string;
  DatePosted: string;
}

interface Applicant {
  JobId: number;
}

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const role = getUserRole();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      const response = await axios.get<Job[]>('https://growpro.onrender.com/job/all-jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      const response = await axios.get<Applicant[]>('https://growpro.onrender.com/JobApplication', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplicants(response.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    }
  };

  useEffect(() => {
    fetchApplicants();
    fetchJobs();
  }, []);

  const handleJobCRUD = role === "employee" ? null : (
    <Link to="/create-job">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3">
        + Add
      </button>
    </Link>
  );

  return (
    <>
      <h1 className="font-bold text-3xl py-6">Job Postings</h1>
      {handleJobCRUD}

      <div className="bg-slate-400 flex flex-col gap-6 p-4 w-[600px] rounded-3xl">
        {jobs.map((job) => {
          const jobApplicants = applicants.filter((applicant) => applicant.JobId === job.Id);
          return (
            <ul key={job.Id} className="bg-slate-50 p-6 flex flex-col rounded-3xl">
              <div className="flex justify-between">
                <li className="font-extrabold text-xl">{job.Title}</li>
                <div>
                  <p>{format(new Date(job.DatePosted), 'MMMM dd, yyyy')}</p>
                  <p className="text-red-500">
                    {formatDistanceToNow(new Date(job.DatePosted), { addSuffix: true })}
                  </p>
                  {role === "employee" ? (
                    <p>{jobApplicants.length} Applicant(s)</p>
                  ) : (
                    <Link to={`/applicants/${job.Id}`}>
                      <p>{jobApplicants.length} Applicant(s)</p>
                    </Link>
                  )}
                </div>
              </div>

              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: job.Description.substring(0, 200) + '...' }}
              />
              <div className="flex gap-6">
                <Link to={`/job-postings/${job.Id}`}>
                  <button className="bg-blue-400 text-white p-2 rounded-xl">Open</button>
                </Link>
              </div>
            </ul>
          );
        })}
      </div>
    </>
  );
}
