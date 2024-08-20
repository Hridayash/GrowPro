import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function JobPost() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No access token found');
        return;
      }

      const response = await axios.post(
        'https://growpro.onrender.com/job',
        { Title: title, Description: description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      setTitle('');
      setDescription('');
      navigate('/job-postings');
    } catch (err) {
      console.error(err);
      alert('Failed to add job post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-2 rounded"
      />
      <ReactQuill
        theme="snow"
        value={description}
        onChange={setDescription}
        className="border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Post
      </button>
    </form>
  );
}
