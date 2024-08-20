import { Outlet } from 'react-router-dom';
import Nav from '../Navigation/nav';
import NewSideBar from '../sidebar/newSidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define a type for the user data returned from the API
interface UserData {
  Name: string;
  Role: string;
  Id: string;
}

const Layout: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<'hr' | 'manager' | 'employee' | 'guest' | null>(null);
  const [id, setID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('fetching user data...');

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get<UserData>('https://growpro.onrender.com/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.Name);
        setRole(response.data.Role as 'hr' | 'manager' | 'employee' | 'guest');
        setID(response.data.Id);
        setLoading(false);
        console.log(response.data.Role);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          // Handle AxiosError
          if (error.response?.status === 401) {
            console.log('Unauthorized');
            navigate('/login');
          } else {
            console.log('Cannot fetch data:', error.message);
          }
        } else {
          // Handle non-Axios errors
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Nav name={user || "Guest"} />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NewSideBar role={role || 'guest'} userId={id || ''} />
          <main className="flex-1 p-6 ml-60 mt-12 flex justify-center">
            <div className="w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
        {/* Uncomment if needed */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
