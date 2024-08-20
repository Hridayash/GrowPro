import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaTasks,  FaBell, FaProjectDiagram, FaStar, FaTrophy } from 'react-icons/fa';


interface Performer {
  userId: string;
  User?: {
    Name?: string;
  };
  overallAverageRating?: string;
}

const ManagerDashboard: React.FC = () => {
  const [jobCount, setJobCount] = useState<number>(0);
  const [topPerformers, setTopPerformers] = useState<Performer[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const [goal, setGetAllEmployeeGoals] = useState<any[]>([]);
  const [course, setCourse] = useState<any[]>([]);
  const [goals, setEmployeeCounts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        // Fetch employee list
        const userResponse = await axios.get('https://growpro.onrender.com/user/employeeList');
        setUser(userResponse.data);

        // Fetch courses
        const courseResponse = await axios.get('https://growpro.onrender.com/Course/');
        setCourse(courseResponse.data);

        // Fetch all employee goals
        const goalsResponse = await axios.get('https://growpro.onrender.com/goal/employee-goals/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGetAllEmployeeGoals(goalsResponse.data);

        // Fetch completed goals
        const completedGoalsResponse = await axios.get('https://growpro.onrender.com/goal/completedgoals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeCounts(completedGoalsResponse.data);

        // Fetch all jobs
        const jobsResponse = await axios.get('https://growpro.onrender.com/job/all-jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobCount(jobsResponse.data.count);

        // Fetch top performers
        const performersResponse = await axios.get('https://growpro.onrender.com/reviews', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedPerformers = await Promise.all(performersResponse.data.map(async (performer: Performer) => {
          try {
            const reviewResponse = await axios.get(`https://growpro.onrender.com/reviews/${performer.userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return { ...performer, overallAverageRating: reviewResponse.data.overallAverageRating || 'N/A' };
          } catch (err) {
            console.error('Error fetching reviews for performer:', err);
            return { ...performer, overallAverageRating: 'N/A' };
          }
        }));

        setTopPerformers(updatedPerformers);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const renderStarRating = (rating: string | undefined) => {
    const stars = parseInt(rating ?? '', 10);
    if (isNaN(stars) || stars < 1 || stars > 5) return 'N/A';

    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`inline-block ${index < stars ? 'text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Team Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-3xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Team Overview</h2>
            <p>Number of team members: <span className="font-bold">{user.length}</span></p>
          </div>
        </div>

        {/* Task Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaTasks className="text-3xl text-green-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Task Assignments</h2>
            <p>Pending tasks: <span className="font-bold">3</span></p>
            <p>Completed tasks: <span className="font-bold">20</span></p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBell className="text-3xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Job Posting</h2>
            <p>Number of Jobs Posted: <span className="font-bold">{jobCount}</span></p>
          </div>
        </div>

        {/* Project Status */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaProjectDiagram className="text-3xl text-purple-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Course</h2>
            <p>Current projects: <span className="font-bold">{course.length}</span></p>
            <p>Completed projects: <span className="font-bold">7</span></p>
          </div>
        </div>

        {/* Team Member Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaStar className="text-3xl text-orange-500 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Goals 2024</h2>
            <p>Goals Posted: <span className="font-bold">{goal.length}</span></p>
            <p>Completed Goals: <span className="font-bold">{goals.length}</span></p>
          </div>
        </div>

        {/* Top Performers Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaTrophy className="text-yellow-500 mr-2" /> Top Performers
          </h2>
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Average Rating</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((performer) => (
                <tr key={performer.userId}>
                  <td className="py-2 px-4 border-b">{performer.User?.Name || 'N/A'}</td>
                  <td>{renderStarRating(performer.overallAverageRating)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
