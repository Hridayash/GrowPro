import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import getUserRole from '../authcheck/getRole';
import {jwtDecode} from 'jwt-decode';

export default function JobDetail() {
  const [job, setJob] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const role = getUserRole();
  const navigate = useNavigate();

  const handleButtonContent = role === 'manager' ? 'Edit' : 'Apply';

  const handleLink = () => {
    if (role === 'manager') {
      navigate(`/edit-job-postings/${job.Id}`);
    } else {
      applyToJob();
    }
  };

  const fetchJobDetail = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const jobResponse = await axios.get(`http://localhost:3002/job/all-jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(jobResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfileId = async (userId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const profileResponse = await axios.get(`http://localhost:3002/profileId/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileId(profileResponse.data.Id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobDetail();
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);
    fetchProfileId(decodedToken.userId);
  }, []);

  const applyToJob = async () => {
    if (!profileId) {
      alert('Profile not found');
      return;
    }
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        'http://localhost:3002/JobApplication/',
        {
          JobId: job.Id,
          ProfileId: profileId,
          UserId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure Content-Type is set
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
      console.log(err.response); // Log server response for debugging
      // Handle error gracefully, e.g., show an error message to the user
    }
  };

  if (!job.Id) {
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
      <button className="bg-blue-400 text-white px-6 py-2 rounded-xl" onClick={handleLink}>
        {handleButtonContent}
      </button>
    </>
  );
}
