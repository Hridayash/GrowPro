import HomeEmployee from "./components/Employee/employeeHome";
import Profile from "./components/profile/profile";
import UpdateProfile from "./components/profile/updateProfile";
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/layout";
import MainDashboard from "./components/Dashboard/mainDashboard";
import AddUserForm from "./components/admin/addUser";
import EmployeeTable from "./components/admin/employeeTable";
import EditEmployee from "./components/admin/editEmployee";
import JobDetails from "./components/manager/jobDetails";
import AuthRoute from "./components/authcheck/authcheck";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthRoute><Layout /></AuthRoute>}>
          <Route index element={<MainDashboard/>} />
          <Route path="profile" element={<Profile />} />
          <Route path="editProfile" element={<UpdateProfile />} />
          <Route path="employeeHome" element={<HomeEmployee />} />
          <Route path="add-user" element = {<AddUserForm />} />
          <Route path="manage-user" element = {<EmployeeTable />} />
          <Route path="manage-user/edit-user/:id" element = {<EditEmployee />} />
          <Route path = 'job-postings' element = {<JobDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
