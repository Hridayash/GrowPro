import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface Applicant {
  Id: number;
  Profile: {
    User: {
      Id: number;
      Name: string;
      Email: string;
    };
    Position: string;
  };
  JobId: number;
  Status: string;
  overallAverageRating?: string;
  Job?: {
    Title: string;
  };
}

interface Review {
  userId: number;
  overallAverageRating: string;
}

const Applicant: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [userRole, setUserRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { JobId } = useParams<{ JobId: string }>();
  console.log(userRole)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No token found');

        const userRoleResponse = await axios.get<{ role: string }>('https://growpro.onrender.com/userRole', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRole(userRoleResponse.data.role);

        const applicantsResponse = await axios.get<Applicant[]>('https://growpro.onrender.com/JobApplication', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const applicantsData = applicantsResponse.data;

        // Fetch reviews in bulk if possible
        const userIds = applicantsData.map(applicant => applicant.Profile.User.Id);
        const reviewsResponse = await axios.get<Review[]>('https://growpro.onrender.com/reviews/bulk', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userIds: userIds.join(','),
          },
        });

        const reviewsData = reviewsResponse.data;
        const reviewsMap = reviewsData.reduce((acc, review) => {
          acc[review.userId] = review.overallAverageRating;
          return acc;
        }, {} as Record<number, string>);

        // Attach reviews to applicants
        const updatedApplicants = applicantsData.map(applicant => ({
          ...applicant,
          overallAverageRating: reviewsMap[applicant.Profile.User.Id] || 'N/A',
        }));

        setApplicants(updatedApplicants);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JobId]);

  const handleAccept = async (applicantId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No token found');

      await axios.patch(`https://growpro.onrender.com/JobApplication/${applicantId}`, {
        approved: true,
        status: "Accepted",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User Accepted');
      setApplicants(prevApplicants =>
        prevApplicants.map(applicant =>
          applicant.Id === applicantId ? { ...applicant, Status: 'Accepted' } : applicant
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to accept user');
    }
  };

  const handleReject = async (applicantId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No token found');

      await axios.patch(`https://growpro.onrender.com/JobApplication/${applicantId}`, {
        approved: false,
        status: "Rejected",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User Rejected');
      setApplicants(prevApplicants =>
        prevApplicants.map(applicant =>
          applicant.Id === applicantId ? { ...applicant, Status: 'Rejected' } : applicant
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to reject user');
    }
  };

  const getStatusClass = (status: string) => {
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

  const renderStarRating = (rating: string) => {
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

  const jobApplicants = applicants.filter(applicant => applicant.JobId === parseInt(JobId || '0', 10));
  const jobTitle = jobApplicants.length > 0 ? jobApplicants[0]?.Job?.Title : '';

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">{renderStarRating(applicant.overallAverageRating || 'N/A')}</td>
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
};

export default Applicant;
