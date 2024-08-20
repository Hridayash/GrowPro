import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

// Define types for employee and ratings
interface Employee {
  Id: number;
  Name: string;
}

interface Ratings {
  qualityOfWork: number;
  productivity: number;
  attendanceAndPunctuality: number;
  communicationSkills: number;
  teamwork: number;
  problemSolvingAbilities: number;
  initiative: number;
  adaptability: number;
  leadershipPotential: number;
  customerSatisfaction: number;
}

const ManagerPerformanceReview: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [ratings, setRatings] = useState<Ratings>({
    qualityOfWork: 0,
    productivity: 0,
    attendanceAndPunctuality: 0,
    communicationSkills: 0,
    teamwork: 0,
    problemSolvingAbilities: 0,
    initiative: 0,
    adaptability: 0,
    leadershipPotential: 0,
    customerSatisfaction: 0,
  });
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>('https://growpro.onrender.com/user/employeeList');
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const handleStarClick = (field: keyof Ratings, stars: number) => {
    if (stars >= 1 && stars <= 5) {
      setRatings(prevRatings => ({
        ...prevRatings,
        [field]: stars,
      }));
    } else {
      console.error('Invalid rating input:', stars);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!selectedEmployee) {
        console.error('No employee selected.');
        return;
      }

      const response = await axios.post('https://growpro.onrender.com/reviews/', {
        userId: selectedEmployee.Id,
        ratings,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Review submitted successfully:', response.data);
      alert('Performance review submitted successfully!');
      // Optionally, reset form fields or update state
    } catch (err) {
      console.error('Error submitting performance review:', err);
    }
  };

  const renderStarInputs = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(ratings).map((metric) => (
          <div key={metric} className="flex items-center">
            <label className="block mb-1">
              {metric.replace(/([A-Z])/g, ' $1').trim()}: 
            </label>
            <div className="flex ml-2">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`text-2xl ${index < ratings[metric as keyof Ratings] ? 'text-yellow-500' : 'text-gray-300'} focus:outline-none`}
                  onClick={() => handleStarClick(metric as keyof Ratings, index + 1)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select an employee:</h2>
      <select
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedEmployee(
          employees.find(emp => emp.Id === parseInt(e.target.value)) || null
        )}
      >
        <option value="">Select an employee</option>
        {employees.map(employee => (
          <option key={employee.Id} value={employee.Id}>{employee.Name}</option>
        ))}
      </select>

      {selectedEmployee && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Employee: {selectedEmployee.Name}</h3>

          {renderStarInputs()}

          <label className="block mt-4 mb-1">Comment:</label>
          <textarea
            value={comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          ></textarea>

          <button
            onClick={handleSubmitReview}
            className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagerPerformanceReview;
