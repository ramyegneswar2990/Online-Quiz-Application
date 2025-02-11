import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Adminlogin from "./pages/Adminlogin";
import Userlogin from "./pages/Userlogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserRegistration from "./pages/UserRegistration";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
// import Protected from "./components/Protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/UserRegistration" element={<UserRegistration />} />
        <Route path="/UserDashboard" element={<UserDashboard />}/>
        <Route path="/AdminDashboard" element={<AdminDashboard />}/>
        <Route path="/Courses" element={<Courses />}/>
      </Routes>
    </Router>
  );
}

export default App;
