import Home from "./components/Home/home"
import Nav from "./components/Navigation/nav"
import SideBar from "./components/sidebar/sidebar"


function App() {


  return (
    <>
    
    <Nav/>
    <div className="flex">
    <SideBar/>
    <Home />
    </div>
    

   
    </>
    
  )
}

export default App
