import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define types for course and content item props
interface Course {
  Id: number;
  Title: string;
  Description: string;
  FileType: 'image' | 'video' | 'pdf';
  FileUrl: string;
  Duration: number;
}

interface ContentItemProps {
  type: 'image' | 'video' | 'pdf';
  source: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ type, source }) => {
  if (!type) {
    return <p>Content type not specified</p>;
  } else if (type === 'image') {
    return <img src={source} alt="Content" height={400} width={400} />;
  } else if (type === 'video') {
    return <video src={source} controls />;
  } else if (type === 'pdf') {
    return <iframe src={source} width="100%" height="500px" />;
  } else {
    return <p>Unsupported content type: {type}</p>;
  }
};

const TrainingMaterial: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('https://growpro.onrender.com/course');
        setCourses(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="flex justify-between gap-6">
        <h1 className="font-bold text-3xl">Courses</h1>
        <Link to="/add-training-material">
          <button className="bg-blue-500 text-white p-2 px-4 rounded-xl">+ Add</button>
        </Link>
      </div>

      <div className="">
        {courses.map((course) => (
          <div className="border rounded-xl p-4 my-4" key={course.Id}>
            <h1 className="font-bold">{course.Title}</h1>
            <p className="text-gray-500">{course.Description}</p>
            
            {/* Dynamically render content based on FileType */}
            <ContentItem type={course.FileType} source={course.FileUrl} />

            <div className="flex gap-2 items-center">
              <p>Duration: {course.Duration} mins</p>
              <button className="bg-blue-500 text-white p-1 px-2 rounded-xl">Start</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrainingMaterial;
