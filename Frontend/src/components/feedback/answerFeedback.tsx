import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define types for feedback and responses
interface Question {
  Id: string;
  Text: string;
}

interface Feedback {
  Id: string;
  Title: string;
  Questions: Question[];
}

interface Response {
  questionId: string;
  answer: string;
}

const AnswerFeedback: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Type the URL parameter
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`https://growpro.onrender.com/feedbacks`);
        const allFeedback: Feedback[] = response.data;

        // Find the specific feedback by ID
        const selectedFeedback = allFeedback.find((feed) => feed.Id === id);
        console.log(selectedFeedback);

        if (selectedFeedback) {
          setFeedback(selectedFeedback);

          // Initialize responses based on Questions array
          if (Array.isArray(selectedFeedback.Questions)) {
            setResponses(
              selectedFeedback.Questions.map((question) => ({
                questionId: question.Id,
                answer: '',
              }))
            );
          }
        } else {
          console.error('Feedback not found');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleResponseChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index].answer = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`https://growpro.onrender.com/feedbacks/${id}/responses`, {
        responses,
      });
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
      <h2>{feedback.Title}</h2>
      <form onSubmit={handleSubmit}>
        {feedback.Questions && feedback.Questions.map((question, index) => (
          <div key={question.Id} className="mb-4">
            <label className="block text-gray-700">{question.Text}</label>
            <input
              type="text"
              value={responses[index]?.answer || ''}
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
