import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import getUserRole from '../authcheck/getRole';
import {jwtDecode} from 'jwt-decode';

interface Job {
  Id: number;
  Title: string;
  Description: string;
  DatePosted: string;
}

interface DecodedToken {
  userId: number;
}

export default function JobDetail() {
  const [job, setJob] = useState<Job | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const role = getUserRole();
  const navigate = useNavigate();

  const handleButtonContent = role === 'manager' ? 'Edit' : 'Apply';

  const handleLink = () => {
    if (role === 'manager') {
      navigate(`/edit-job-postings/${job?.Id}`);
    } else {
      applyToJob();
    }
  };

  const fetchJobDetail = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const jobResponse = await axios.get<Job>(`https://growpro.onrender.com/job/all-jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(jobResponse.data);
    } catch (err) {
      console.error('Failed to fetch job details:', err);
    }
  };

  const fetchProfileId = async (userId: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const profileResponse = await axios.get<{ Id: number }>(`https://growpro.onrender.com/profileId/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileId(profileResponse.data.Id);
    } catch (err) {
      console.error('Failed to fetch profile ID:', err);
    }
  };

  useEffect(() => {
    fetchJobDetail();
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.userId);
      fetchProfileId(decodedToken.userId);
    }
  }, [id]);

  const applyToJob = async () => {
    if (!profileId || !userId) {
      alert('Profile or User ID not found');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.post(
        'https://growpro.onrender.com/JobApplication/',
        {
          JobId: job?.Id,
          ProfileId: profileId,
          UserId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        alert('Applied successfully!');
        navigate('/');
      } else {
        console.log('Unexpected status:', response.status);
      }
    } catch (err) {
      console.error('Error applying to job:', err);
      alert('Failed to apply to job. Please try again.');
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold mb-6">{job.Title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: job.Description }} />
      <p>
        {format(new Date(job.DatePosted), 'MMMM dd, yyyy')}
        <br />
        {formatDistanceToNow(new Date(job.DatePosted), { addSuffix: true })}
      </p>
      <button
        className="bg-blue-400 text-white px-6 py-2 rounded-xl"
        onClick={handleLink}
      >
        {handleButtonContent}
      </button>
    </>
  );
}
