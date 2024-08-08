import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnswerFeedback = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/feedbacks/${id}`);
        setFeedback(response.data);
        setResponses(response.data.Questions.map((question) => ({ questionId: question.Id, answer: '' })));
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index].answer = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3002/feedbacks/${id}/responses`, { responses });
      console.log('Responses submitted');
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  if (!feedback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{feedback.Title}</h1>
      <form onSubmit={handleSubmit}>
        {feedback.Questions.map((question, index) => (
          <div key={question.Id} className="mb-4">
            <label className="block text-gray-700">{question.Text}</label>
            <input
              type="text"
              value={responses[index].answer}
              onChange={(e) => handleResponseChange(index, e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default AnswerFeedback;
