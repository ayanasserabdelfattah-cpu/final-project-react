
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import Register from "./Register/Register";



import Home from "./Home/Home";
// import About from "./About/About";
import Doctors from "./Doctors/Doctors";
import Details from "./Details/Details";
// import Department from "./Department/Department";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";
import PublicProfile from "./PublicProfile/PublicProfile";
import PublicNotification from "./PublicNotification/PublicNotification";


import NavDoctor from "./NavDoctor/NavDoctor";
import DoctorAvailiability from "./DoctorAvailiability/DoctorAvailiability";
import DoctorNotification from "./DoctorNotification/DoctorNotification";




function App() {
  return (
    <BrowserRouter>

 
      <Routes>

        {/* الصفحات قبل تسجيل الدخول */}
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      


        {/* صفحات الـ User */}
        <Route path="/Home" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/Doctors" element={<Doctors />} />
        <Route path="/Details" element={<Details />} />
        {/* <Route path="/department" element={<Department />} /> */}
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/PublicProfile" element={<PublicProfile />} />
        <Route path="/PublicNotification" element={<PublicNotification />} />


        {/* صفحات ال Doctor */}
            <Route path="/NavDoctor" element={<NavDoctor />} />
            <Route path="/DoctorAvailiability" element={<DoctorAvailiability />} />
            <Route path="/DoctorNotification" element={<DoctorNotification />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;

