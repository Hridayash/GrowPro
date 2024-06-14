import AuthRoute from "./components/authcheck/authcheck";
import HomeEmployee from "./components/Employee/employeeHome";
import Home from "./components/Home/home";
import Profile from "./components/profile/profile";
import UpdateProfile from "./components/profile/updateProfile";
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/signup";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editProfile" element={<UpdateProfile />} />
          <Route path="employeeHome" element={<HomeEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
