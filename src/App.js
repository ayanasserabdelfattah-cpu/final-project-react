
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
// import Services from "./Services/Services";
import Contact from "./Contact/Contact";

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
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/Contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

