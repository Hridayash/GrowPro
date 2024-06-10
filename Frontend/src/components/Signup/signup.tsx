import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate(); // Correctly use the navigate function
  const inputStyle = "border rounded-md p-2 w-[20%]";

  const [userInfo, setUserInfo] = useState({
    Name: "",
    Email: "",
    Password: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const submit = (e :any) => {
    e.preventDefault();

    axios.post('http://localhost:3002/createUser', userInfo)
      .then(result => {
        console.log(result);
        navigate("/login"); // Navigate to the login page on successful signup
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <nav>
        <h1 className="font-extrabold text-4xl m-6">GrowPro</h1>
      </nav>
      <form onSubmit={submit} className="flex flex-col justify-center items-center gap-10 mt-40">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-semibold text-3xl">Welcome to GrowPro</h1>
          <h2 className="font-semibold text-xl text-neutral-500">To get started, please sign up</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-[100%] gap-8">
          <input
            type="text"
            placeholder="Name"
            name="Name"
            className={inputStyle}
            value={userInfo.Name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            className={inputStyle}
            value={userInfo.Email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            className={inputStyle}
            value={userInfo.Password}
            onChange={handleChange}
          />

          <button type="submit" className="bg-blue-500 rounded-lg w-[20%] p-2 text-white hover:bg-blue-700">
            Sign Up
          </button>
          <Link to="/login"><p>Already have an account?</p></Link>
        </div>
      </form>
    </main>
  );
}
