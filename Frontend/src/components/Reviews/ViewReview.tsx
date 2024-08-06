import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserId } from '../authcheck/getRole'; // Assuming this function retrieves userId

const EmployeePerformanceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [overall, setOverall ]  = useState();
  const userId = getUserId(); // Assuming this function retrieves userId from somewhere

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3002/reviews/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReviews(response.data.reviews || []); // Ensure you are setting the correct data
        setOverall(response.data.overallAverageRating)
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [userId]); // Fetch reviews whenever userId changes

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

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Employee Performance Reviews</h2>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="flex justify-between mb-2">
                <div>Quality of Work:</div>
                <div>{renderStarRating(review.qualityOfWork)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Productivity:</div>
                <div>{renderStarRating(review.productivity)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Attendance & Punctuality:</div>
                <div>{renderStarRating(review.attendanceAndPunctuality)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Communication Skills:</div>
                <div>{renderStarRating(review.communicationSkills)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Teamwork:</div>
                <div>{renderStarRating(review.teamwork)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Problem Solving Abilities:</div>
                <div>{renderStarRating(review.problemSolvingAbilities)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Initiative:</div>
                <div>{renderStarRating(review.initiative)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Adaptability:</div>
                <div>{renderStarRating(review.adaptability)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Leadership Potential:</div>
                <div>{renderStarRating(review.leadershipPotential)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Customer Satisfaction:</div>
                <div>{renderStarRating(review.customerSatisfaction)}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Overall</div>
                <div>{renderStarRating(overall)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default EmployeePerformanceReviews;
