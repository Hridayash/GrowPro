import AuthRoute from "./components/authcheck/authcheck"
import Home from "./components/Home/home"
import Profile from "./components/profile/profile"
import UpdateProfile from "./components/profile/updateProfile"
import Login from "./components/Signup/Login"
import Signup from "./components/Signup/signup"
import {Routes, Route, BrowserRouter } from "react-router-dom"
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Signup />} />
        <Route path ="/login" element  ={<Login />} />
        <Route path = "/home" element = {<AuthRoute> <Home /></AuthRoute>} />
        <Route path = "/profile" element = {<Profile />} />
        <Route path = "/editProfile" element ={<UpdateProfile />} />

      

    
      </Routes>
    </BrowserRouter>
    {/* <Nav/>
    <div className="flex">
    <SideBar/>
    <Home />
    </div> */}
   
    

   
    </>
    
  )
}

export default App
