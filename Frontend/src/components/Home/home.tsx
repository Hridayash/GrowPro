import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
        const response = await axios.get('https://growpro.onrender.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.Name);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          console.log('Unauthorized');
          navigate('/login');
        } else {
          console.error('Failed to fetch data', err);
          setError('Failed to fetch user details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <h1>Hello <strong>{user}</strong>, this is the home page</h1>
      <div className="flex gap-6">
     
      </div>
    </>
  );
}
