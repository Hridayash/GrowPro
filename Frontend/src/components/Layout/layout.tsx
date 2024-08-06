import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Nav from '../Navigation/nav';
import NewSideBar from '../sidebar/newSidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Layout = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('fetching user Data...');

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3002/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.Name);
        setRole(response.data.Role);
        setID(response.data.Id);
        console.log(response.data.Role);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          console.log('unauthorized');
          navigate('/login');
        } else {
          console.log('cannot fetch data');
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <>
      <Nav name={user} />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NewSideBar role={role} userId={id} />
          <main className="flex-1 p-6 ml-60 mt-12 flex justify-center ">
            <div className="w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
 