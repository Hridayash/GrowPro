import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Applicant() {
  const [applicants, setApplicants] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { JobId } = useParams(); 
  
  // Get the job ID from the URL

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
      setApplicants(response.data);
    } catch (err) {
      console.log(err);
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
        status : "Accepted"
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User Accepted');
      // Update the state to reflect the changes
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
        status : "Rejected"
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User Rejected');
      // Update the state to reflect the changes
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



  // Filter applicants based on role and job
  const jobApplicants = applicants.filter((applicant)=>(applicant.JobId === parseInt( JobId)))

  const jobTitle = jobApplicants.length > 0 ? jobApplicants[0]?.Job?.Title : '';

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-3xl">Applicants for {jobTitle}</h1>
        <Link to='/add-user'>
          <button className="bg-blue-500 text-white rounded-xl p-2 px-4">+ Add</button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
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
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{applicant.Profile.User.Role}</td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{applicant.Profile.Position}</td>
                <td className= {` px-6 py-2 whitespace-nowrap cursor-pointer `}>
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
