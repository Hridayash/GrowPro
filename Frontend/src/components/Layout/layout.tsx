
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

import Nav from "../Navigation/nav";
import NewSideBar from "../sidebar/newSidebar";
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Layout = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
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
        console.log(response.data.Role)
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
            <Nav name={user}/>
            <Footer />
            <div className="flex">
                <NewSideBar role={role} />
                <main className="p-6 ml-60 mt-12 min-h-full">
                    <Outlet />
                </main>
            </div>
            

            

            
           
        </>
    );
   
}

export default Layout;