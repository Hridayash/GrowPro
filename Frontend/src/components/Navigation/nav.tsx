import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Profile {
  ProfileUrl?: string;
}

interface NavProps {
  name: string;
}

const Nav: React.FC<NavProps> = ({ name }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({});
  const [profileOption, setProfileOption] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      try {
        const response = await axios.get("https://growpro.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profile Data:", response.data);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Access token not found in localStorage");
      return;
    }

    axios.post("https://growpro.onrender.com/logout", {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      localStorage.removeItem("accessToken");
      navigate("/login");
    })
    .catch(err => {
      console.error("Error logging out:", err);
    });
  };

  const toggleProfile = () => {
    setProfileOption(prevState => !prevState);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex gap-6 items-center justify-between px-6 h-12 border-b-2 z-10 bg-white mb-13">
        <Link to="/">
          <h1 className="font-black">GrowPro</h1>
        </Link>

        <button className="flex items-center gap-2" onClick={toggleProfile}>
          <p>{name}</p>
          <div className="bg-yellow-500 rounded-full w-9 h-9 overflow-hidden">
            {profile.ProfileUrl ? (
              <img src={profile.ProfileUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white">No Image</div>
            )}
          </div>
        </button>
      </nav>

      {profileOption && (
        <div className="absolute right-0 top-14 bg-slate-100 flex flex-col rounded-lg items-center w-[20%] p-6 gap-3 shadow-lg">
          <h1 className="text-lg font-semibold">{name}</h1>
          <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
          <button className="bg-red-600 text-white rounded-lg p-2" onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Nav;
