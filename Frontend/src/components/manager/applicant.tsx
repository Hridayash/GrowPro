import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Applicant() {
  const [applicants, setApplicants] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { JobId } = useParams(); 
  
  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3002/userRole`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRole(response.data.role);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3002/JobApplication`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const applicantsData = response.data;
      for (const applicant of applicantsData) {
        await fetchReviews(applicant);
      }
      setApplicants(applicantsData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async (applicant) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3002/reviews/${applicant.Profile.User.Id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      applicant.overallAverageRating = response.data.overallAverageRating || 'N/A';
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchApplicants();
  }, []);

  const handleAccept = async (applicantId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`http://localhost:3002/JobApplication/${applicantId}`, {
        approved: true,
        status: "Accepted"
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User Accepted');
      fetchApplicants();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (applicantId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`http://localhost:3002/JobApplication/${applicantId}`, {
        approved: false,
        status: "Rejected"
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User Rejected');
      fetchApplicants();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-300 text-green-700 rounded-xl p-2';
      case 'Rejected':
        return 'bg-red-300 text-red-700 rounded-xl p-2';
      case 'Processing':
        return 'bg-yellow-300 text-yellow-700 rounded-xl p-2';
      default:
        return '';
    }
  };

  const renderStarRating = (rating) => {
    const stars = parseInt(rating, 10);
    if (isNaN(stars) || stars < 1 || stars > 5) return null;

    return (
      <div className="flex">
        {[...Array(stars)].map((_, index) => (
          <span key={index} className="text-yellow-500 text-2xl">★</span>
        ))}
      </div>
    );
  };
  const jobApplicants = applicants.filter(applicant => applicant.JobId === parseInt(JobId));

  const jobTitle = jobApplicants.length > 0 ? jobApplicants[0]?.Job?.Title : '';

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-3xl">Applicants for {jobTitle}</h1>
       
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Performance</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Job Position</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobApplicants.map(applicant => (
              <tr key={applicant.Id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                  <Link to={`/profile/${applicant.Profile.User.Id}`} className="contents">
                    {applicant.Profile.User.Name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{applicant.Profile.User.Email}</td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{renderStarRating(applicant.overallAverageRating)}</td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{applicant.Profile.Position}</td>
                <td className={`px-6 py-2 whitespace-nowrap cursor-pointer`}>
                  <button className={getStatusClass(applicant.Status)}>
                    {applicant.Status}
                  </button>
                </td>
                <td className="px-6 py-2 whitespace-nowrap cursor-pointer">
                  <button className='bg-green-200 text-green-700 rounded-xl p-1 mx-2' onClick={() => handleAccept(applicant.Id)}>Accept</button>
                  <button className='bg-red-200 text-red-700 rounded-xl p-1' onClick={() => handleReject(applicant.Id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}