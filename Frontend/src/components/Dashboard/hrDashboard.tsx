import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaClipboardList, FaCheckCircle, FaTasks, FaStar } from 'react-icons/fa';
import { getUserId } from '../authcheck/getRole';

const EmployeeDashboard = () => {
  const [totalGoals, setTotalGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);
  const [pendingGoals, setPendingGoals] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const employeeId = getUserId();

  useEffect(() => {
    // Fetch all goals for the employee
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/goal/employee-goals/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // assuming token is stored in local storage
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
    // Fetch reviews and average rating for the employee
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/review/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });
        // Ensure averageRating is correctly set
        setAverageRating(response.data.overallAverageRating || 0);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [employeeId]);

  const renderStarRating = (rating) => {
    const stars = Math.round(parseFloat(rating));
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`inline-block ${index < stars ? 'text-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Goals Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaClipboardList className="text-blue-500 mr-2" /> Goals Overview
          </h2>
          <p>Total goals assigned: <span className="font-bold">{totalGoals}</span></p>
          <p>Goals completed: <span className="font-bold">{completedGoals}</span></p>
          <p>Pending goals: <span className="font-bold">{pendingGoals}</span></p>
        </div>
        
        {/* Completed Goals */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" /> Completed Goals
          </h2>
          <p>Goals completed: <span className="font-bold">{completedGoals}</span></p>
        </div>

        {/* Pending Goals */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaTasks className="text-yellow-500 mr-2" /> Pending Goals
          </h2>
          <p>Pending goals: <span className="font-bold">{pendingGoals}</span></p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaStar className="text-yellow-500 mr-2" /> Reviews
        </h2>
        <p>Average Rating: <span className="font-bold">{averageRating.toFixed(1)}</span></p>
        <div className="flex space-x-1 mb-4">
          {renderStarRating(averageRating)}
        </div>
        <div className="mt-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-300 mb-4 pb-4">
                <p><strong>Comment:</strong> {review.comment}</p>
                <div className="flex space-x-1">
                  {Object.keys(review).filter(key => key !== 'comment' && typeof review[key] === 'number').map((key) => (
                    <div key={key} className="flex items-center">
                      {renderStarRating(review[key])}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
