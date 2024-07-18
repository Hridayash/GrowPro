import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const { userId } = useParams(); // Get the user ID from the URL

  const fetchUserApplications = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3002/JobApplication/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserApplications();
  }, []);

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

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-3xl">Jobs Applied</h1>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Apply Date</th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.Id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{application.Job.Title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(application.AppliedAt), 'MMMM dd, yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusClass(application.Status)}>
                    {application.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserApplications;
