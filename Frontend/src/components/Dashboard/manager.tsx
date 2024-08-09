import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUsers, FaTasks, FaChartLine, FaBell, FaProjectDiagram, FaStar, FaTrophy } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ManagerDashboard = () => {
  const [jobCount, setJobCount] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [user, setUser] = useState([]);
  const [goal, setGetAllEmployeeGoals] = useState([]);
  const [course, setCourse] = useState([]);
  const [goals, setEmployeeCounts] = useState([]);

 

  useEffect(() => {
    const getEmployeeList = async () => {
      try {
        const res = await axios.get('http://localhost:3002/user/employeeList');
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch employee list:', error);
      }
    };
    getEmployeeList();
  }, []);

  useEffect(() => {
    const getTotalCourse = async () => {
      try {
        const res = await axios.get('http://localhost:3002/Course/');
        setCourse(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    getTotalCourse();
  }, []);

  useEffect(() => {
    const getAllEmployeesGoals = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await axios.get('http://localhost:3002/goal/employee-goals/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGetAllEmployeeGoals(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch employee goals:', error);
      }
    };
    getAllEmployeesGoals();
  }, []);

  useEffect(() => {
    const getCompletedGoals = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await axios.get('http://localhost:3002/goal/completedgoals', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployeeCounts(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch completed goals:', error);
      }
    };
    getCompletedGoals();
  }, []);

  useEffect(() => {
    const getAllJob = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await axios.get('http://localhost:3002/job/all-jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobCount(res.data); // Ensure your backend sends data in { count: ... } format
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    getAllJob();
  }, []);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3002/reviews', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const performers = response.data;

        // Fetch reviews for each performer and update the state
        const updatedPerformers = await Promise.all(performers.map(async (performer) => {
          try {
            const reviewResponse = await axios.get(`http://localhost:3002/reviews/${performer.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return { ...performer, overallAverageRating: reviewResponse.data.overallAverageRating || 'N/A' };
          } catch (err) {
            console.error('Error fetching reviews for performer:', err);
            return { ...performer, overallAverageRating: 'N/A' };
          }
        }));

        setTopPerformers(updatedPerformers);
      } catch (error) {
        console.error('Failed to fetch top performers:', error);
      }
    };

    fetchTopPerformers();
  }, []);

  const renderStarRating = (rating) => {
    const stars = parseInt(rating, 10);
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
            <h2 className="text-xl font-semibold mb-2">Jobposting</h2>
            <p>Number of Job Posted: <span className="font-bold">{jobCount.length}</span></p>
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
          <h2 className="text-xl font-semibold mb-2 flex items-center"><FaTrophy className="text-yellow-500 mr-2" />Top Performers</h2>
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
