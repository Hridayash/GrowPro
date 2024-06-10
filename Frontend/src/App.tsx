import Home from "./components/Home/home"
import Nav from "./components/Navigation/nav"
import SideBar from "./components/sidebar/sidebar"
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
        <Route path = "/home" element = {<Home />} />

    
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
