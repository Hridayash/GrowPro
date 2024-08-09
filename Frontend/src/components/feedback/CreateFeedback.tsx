import React, { useState } from 'react';
import axios from 'axios';
import { getUserId } from '../authcheck/getRole';

const CreateFeedback = () => {
  const userId = getUserId();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '' }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/feedbacks/', {
        title,
        questions: questions.map((q) => ({ text: q.text })),
        userId
      });
      console.log('Feedback created:', response.data);
    } catch (error) {
      console.error('Error creating feedback:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Questions</label>
          {questions.map((question, index) => (
            <input
              key={index}
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              required
            />
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Question
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Create Feedback
        </button>
      </form>
    </div>
  );
};

export default CreateFeedback;
