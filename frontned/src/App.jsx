import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Adminlogin from "./pages/Adminlogin";
import Userlogin from "./pages/Userlogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserRegistration from "./pages/UserRegistration";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import AdminRegistration from "./pages/AdminRegistration";
import CourseTopics from "./pages/CourseTopics";
import Questions from "./pages/Questions";
import Result from "./pages/Result";
//import Hom from "./pages/hom";
// import Protected from "./components/Protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/UserRegistration" element={<UserRegistration />} />
        <Route path="/AdminRegistration" element={<AdminRegistration />} />
        <Route path="/UserDashboard" element={<UserDashboard />}/>
        <Route path="/AdminDashboard" element={<AdminDashboard />}/>
        <Route path="/courses" element={<Courses />}/>
        <Route path ="/courses/:courseName" element={<CourseTopics/>}/>
        <Route path="/courses/:courseName/topics/:topicId" element={<Questions />} />
        <Route path="/result" element={<Result />} />
                {/* //<Route path="/hom" element={<Hom/>}/> */}

      </Routes>
    </Router>
  );
}

export default App;
