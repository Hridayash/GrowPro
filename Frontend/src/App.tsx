import HomeEmployee from "./components/Employee/employeeHome";
import Profile from "./components/profile/profile";
import UpdateProfile from "./components/profile/updateProfile";
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/layout";
import MainDashboard from "./components/Dashboard/mainDashboard";
import AddUserForm from "./components/manager/addUser";
// import EmployeeTable from "./components/admin/employeeTable";
import EditEmployee from "./components/admin/editEmployee";
import JobPost from "./components/manager/jobPost";
import AuthRoute from "./components/authcheck/authcheck";
import Myteam from "./components/manager/myteam";
import ProfileRead from "./components/profile/profileRead";
import AllJobs from "./components/manager/jobs";
import JobDetail from "./components/manager/jobDetails";
import TrainingMaterial from "./components/TrainingMaterial/training";

import AddTrainingMaterial from "./components/TrainingMaterial/addTrainingMaterials";
import PerformanceReview from "./components/performanceReview/PerformaceReview";
import EditJobPost from "./components/manager/editJobPost";
import Applicant from "./components/manager/applicant";
import UserApplications from "./components/manager/userApplicant";
import ReviewList from "./components/Reviews/reviews";
import ManagerPerformanceReview from "./components/Reviews/reviews";

import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import About from "./components/Footer/About";
import Contact from "./components/Footer/Contact";
import Services from "./components/Footer/Services";
import SetGoal from "./components/goal/setGoal";
import EmployeeGoals from "./components/goal/getGoals";
import AnswerFeedback from "./components/feedback/answerFeedback";
import CreateFeedback from "./components/feedback/CreateFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthRoute><Layout /></AuthRoute>}>
          <Route index element={<MainDashboard/>} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<ProfileRead/>} />
          <Route path="editProfile" element={<UpdateProfile />} />
          <Route path="employeeHome" element={<HomeEmployee />} />
          <Route path="add-user" element = {<AddUserForm />} />
          {/* <Route path="manage-user" element = {<EmployeeTable />} /> */}
          <Route path="manage-user/edit-user/:id" element = {<EditEmployee />} />
          <Route path = 'job-postings' element = {<AllJobs/>} />
          <Route path = 'job-postings/:id' element = {<JobDetail/>} />
          <Route path = 'edit-job-postings/:id' element = {<EditJobPost/>} />
          <Route path = 'create-job' element = {<JobPost/>} />
          <Route path = '/my-team' element = {<Myteam/>} />
          <Route path = '/PrivacyPolicy' element = {<PrivacyPolicy/>} />
          <Route path = '/About' element = {<About/>} />
          <Route path = '/Contact' element = {<Contact/>} />
          <Route path = '/Services' element = {<Services/>} />
          <Route path = '/training-material' element = {<TrainingMaterial/>} />
          <Route path = '/add-training-material' element = {<AddTrainingMaterial/>} />
          <Route path = '/performance-reviews' element = {<PerformanceReview/>} />
          <Route path = '/applicants/:JobId' element = {<Applicant/>} />
          <Route path = '/applicant/:userId' element = {<UserApplications/>} />
          <Route path = '/review' element ={<ManagerPerformanceReview />} />
          <Route path = '/setGoal' element ={<SetGoal />} />
          <Route path = '/getGoal' element ={<EmployeeGoals />} />
          <Route path = '/giveFeedback' element ={<AnswerFeedback />} />
          <Route path = '/setFeedback' element ={<CreateFeedback />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
