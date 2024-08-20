import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaClipboardList, FaStar, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserId } from '../authcheck/getRole'; // Assuming this function retrieves userId

const EmployeeDashboard = () => {
  const [totalGoals, setTotalGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [pendingGoals, setPendingGoals] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalJobsPosted, setTotalJobsPosted] = useState(0);
  const [approvedJobs, setApprovedJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [yearlyProgress, setYearlyProgress] = useState([]);

  const employeeId = getUserId();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/goal/employee-goals/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });

        const goals = response.data;
        const total = goals.length;
        const completed = goals.filter(goal => goal.Completed).length;
        const pending = total - completed;

        setTotalGoals(total);
        setCompletedGoals(completed);
        setPendingGoals(pending);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [employeeId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/reviews/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });

        setAverageRating(response.data.overallAverageRating || 0);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [employeeId]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        const totalJobsResponse = await axios.get(`http://localhost:3002/job/total-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setTotalJobsPosted(totalJobsResponse.data.total);

        const approvedJobsResponse = await axios.get(`http://localhost:3002/job/approved-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setApprovedJobs(approvedJobsResponse.data.approved);

        const appliedJobsResponse = await axios.get(`http://localhost:3002/job/applied-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setAppliedJobs(appliedJobsResponse.data.applied);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [employeeId]);

  // Dummy data for the line chart
  useEffect(() => {
    const fetchYearlyProgress = () => {
      setYearlyProgress([
        { year: '2019', value: 20 },
        { year: '2020', value: 35 },
        { year: '2021', value: 50 },
        { year: '2022', value: 65 },
        { year: '2023', value: 80 },
        { year: '2024', value: 90 },
        { year: '2025', value: null } // 2025 is left vacant
      ]);
    };

    fetchYearlyProgress();
  }, []);

  const renderStarRating = (rating) => {
    const stars = Math.round(parseFloat(rating));
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`inline-block ${index < stars ? 'text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  // Progress Bar Component
  const ProgressBar = ({ value, max, label }) => {
    const percentage = (value / max) * 100;

    return (
      <div className="w-full bg-gray-200 rounded-full h-4 relative">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="absolute top-0 left-0 text-xs text-white px-1">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Goals Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 relative">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaClipboardList className="text-blue-500 mr-2" /> Goals Overview
          </h2>
          <p>Total goals assigned: <span className="font-bold">{totalGoals}</span></p>
          <p>Goals completed: <span className="font-bold">{completedGoals}</span></p>
          <p>Pending goals: <span className="font-bold">{pendingGoals}</span></p>
          <div className="mt-4">
            <ProgressBar value={completedGoals} max={totalGoals} label="Goals Completed" />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaStar className="text-yellow-500 mr-2" /> Reviews
          </h2>
          <p>Average Rating: <span className="font-bold">{averageRating.toFixed(1)}</span></p>
          <div className="flex space-x-1 mb-4">
            {renderStarRating(averageRating)}
          </div>
        </div>

        {/* Jobs Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 relative">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBriefcase className="text-gray-500 mr-2" /> Jobs Overview
          </h2>
          <p>Total jobs posted: <span className="font-bold">{totalJobsPosted}</span></p>
          <p>Approved jobs: <span className="font-bold">{approvedJobs}</span></p>
          <p>Applied jobs: <span className="font-bold">{appliedJobs}</span></p>
          <div className="mt-4">
            <ProgressBar value={appliedJobs} max={totalJobsPosted} label="Jobs Applied" />
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartLine className="text-green-500 mr-2" /> Yearly Progress
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={yearlyProgress}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
