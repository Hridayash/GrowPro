import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTrainingMaterial = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    fileType: '',
    duration: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to backend
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('fileType', form.fileType);
    formData.append('duration', form.duration);
    formData.append('file', form.file);

    try {
      // Fetch POST endpoint on your backend
      const response = await fetch('http://localhost:3002/course/upload-Course', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Reset form after successful upload (if needed)
      setForm({
        title: '',
        description: '',
        fileType: '',
        duration: '',
        file: null,
      });
      navigate('/training-material')

    } catch (error) {
      console.error('Error uploading course:', error);
      // Handle error state or show user feedback
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Upload Training Material</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fileType">
            File Type
          </label>
          <select
            id="fileType"
            name="fileType"
            value={form.fileType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select file type</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="image">Image</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="duration">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddTrainingMaterial;
