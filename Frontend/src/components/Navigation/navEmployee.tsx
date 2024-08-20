import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

interface NavEmployeeProps {
  name: string;
}

const NavEmployee: React.FC<NavEmployeeProps> = ({ name }) => {
  const navigate = useNavigate();
  const [profileOption, setProfileOption] = useState<boolean>(false);

  const logout = () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('Access token not found in localStorage');
      return;
    }

    axios.post('https://growpro.onrender.com/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      localStorage.removeItem('accessToken');
      navigate('/login');
    })
    .catch(err => {
      console.error('Error logging out:', err);
    });
  };

  const toggleProfile = () => {
    setProfileOption(prevState => !prevState);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex gap-6 items-center justify-between px-6 h-12 border-b-2 z-10 bg-white mb-13">
        <Link to="/home">
          <h1 className="font-black">GrowPro</h1>
        </Link>

        <button className="flex items-center gap-2" onClick={toggleProfile}>
          <p>{name}</p>
          <div className="bg-yellow-500 rounded-full w-9 h-9"></div>
        </button>
      </nav>

      {profileOption && (
        <div className="absolute right-0 top-14 bg-slate-100 flex flex-col rounded-lg items-center w-[20%] p-6 gap-3 shadow-lg">
          <h1 className="text-lg font-semibold">{name}</h1>
          <Link to="/profile">
            <h1 className="text-blue-600 hover:underline">Profile</h1>
          </Link>
          <button className="bg-red-600 text-white rounded-lg p-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default NavEmployee;
