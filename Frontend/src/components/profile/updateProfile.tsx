import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Define types for profile state and file
interface Profile {
  FullName: string;
  Position: string;
  Address: string;
}

export default function UpdateProfile() {
  const inputStyle = "p-2 rounded-xl w-[90%]";
  const uploadButtonStyle = "bg-blue-500 text-white p-2 w-36 rounded-lg shadow-md px-12";

  const [profile, setProfile] = useState<Profile>({
    FullName: '',
    Position: '',
    Address: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // State for profile picture

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get<Profile>('https://growpro.onrender.com/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePicture(file);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('FullName', profile.FullName);
    formData.append('Position', profile.Position);
    formData.append('Address', profile.Address);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const result = await axios.post('https://growpro.onrender.com/profile', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(result);
      // Optionally, you can update local state or show a success message
    } catch (err) {
      console.log('Error submitting profile:', err);
    }
  };

  return (
    <>
      {/* Blurred background */}
      <div className="bg-gray-200 h-screen w-screen fixed top-0 left-0 z-10 backdrop-filter backdrop-blur-sm"></div>

      {/* Editing form */}
      <form onSubmit={submit} className="flex flex-col items-center gap-6 p-6 w-96 z-20 bg-white rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" encType="multipart/form-data">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <input
          type="text"
          placeholder="FullName"
          name="FullName"
          className={inputStyle}
          onChange={handleChange}
          value={profile.FullName}
        />
        <input
          type="text"
          placeholder="Position"
          name="Position"
          className={inputStyle}
          onChange={handleChange}
          value={profile.Position}
        />
        <input
          type="text"
          placeholder="Address"
          name="Address"
          className={inputStyle}
          onChange={handleChange}
          value={profile.Address}
        />
        
        {/* Profile picture upload */}
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="profilePicture" className="font-semibold">Profile Picture</label>
          <div className="relative overflow-hidden rounded-lg bg-gray-300 w-36 h-36 flex items-center justify-center">
            {profilePicture ? (
              <img src={URL.createObjectURL(profilePicture)} alt="Profile Preview" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500">Preview</span>
            )}
          </div>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="profilePicture" className={uploadButtonStyle + " cursor-pointer"}>
            Upload
          </label>
        </div>

        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-green-500 text-white p-2 w-20 rounded-xl">Save</button>
          <Link to='/profile'>
            <button type="button" className="bg-red-500 text-white p-2 w-20 rounded-xl">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}
