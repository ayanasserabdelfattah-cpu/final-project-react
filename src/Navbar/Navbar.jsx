
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"





function Navbar() {




  // حالة الـ Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // تشغيل الـ Dark Mode عند فتح الصفحة
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  // إغلاق الـ Navbar لما نضغط بره
  useEffect(() => {

    const handleClickOutside = (e) => {

      const navbar = document.querySelector(".navbar");
      const navbarCollapse = document.querySelector(".navbar-collapse");

      if (
        navbar &&
        navbarCollapse &&
        !navbar.contains(e.target)
      ) {

        // لو Bootstrap Navbar مفتوحة
        navbarCollapse.classList.remove("show");

      }
    };

    document.addEventListener("click", handleClickOutside);

    // تنظيف الـ event لما الـ component يتشال
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);


  return (
    <div>

    



          {/* <!-- start navbar home section --> */}

  <nav className="navbar navbar-expand-lg navbar-light bg-light  pl-5 pr-5  navbar_home">


    <Link className="navbar-brand" to="#"><img src="img/WhatsApp Image 2026-08-17 at 3.01.12 PM.png" className="img-fluid " width="140px"/></Link>


      <label className="switch mt-2" >



    {/* //   متعدل بسبب ال js */}
  <input
        id="input"
        type="checkbox"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />

    {/* //   متعدل بسبب ال js */}


  <div className="slider round">
    <div className="sun-moon">
      <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>

      <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
      <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50"></circle>
      </svg>
    </div>
    <div className="stars">
      <svg id="star-1" className="star" viewBox="0 0 20 20">
        <path
          d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
        ></path>
      </svg>
      <svg id="star-2" className="star" viewBox="0 0 20 20">
        <path
          d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
        ></path>
      </svg>
      <svg id="star-3" className="star" viewBox="0 0 20 20">
        <path
          d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
        ></path>
      </svg>
      <svg id="star-4" className="star" viewBox="0 0 20 20">
        <path
          d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
        ></path>
      </svg>
    </div>
  </div>
</label>




    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fa-solid fa-bars fa-xl" style={{color: "rgb(116, 192, 252);"}}></i>
    </button>



    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      <ul className="navbar-nav ml-auto pr-5">

        <li className="nav-item active">
          <Link  to="/Home" className="nav-link" >Home <span className="sr-only">(current)</span></Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/About">About</Link>
        </li>

        <li className="nav-item">
          <Link to="/Doctors"  className="nav-link " > Doctors</Link>
        </li>

        <li className="nav-item">
          <Link  to="/Services" className="nav-link ">Services</Link>
        </li>

        <li className="nav-item">
          <Link  to="/Department" className="nav-link ">Departments</Link>
        </li>

        <li className="nav-item">
          <Link   to="/Contact" className="nav-link ">Contact</Link>
        </li>


    <li className="nav-item dropdown">
   <button
  className="nav-link btn btn btn-link"
  type="button"
  data-toggle="dropdown"
  aria-expanded="false"
>
  <i
    className="fa-solid fa-user "
    style={{ color: "rgb(116, 192, 252)" }}
  ></i>{" "}
  My Profile
</button>
        <div className="dropdown-menu">
       

<div className="input">
  <Link  to="/PublicProfile" className="value">
    <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z" fill="#7D8590"></path></svg>
    Public profile
  </Link>


  
  <Link to="/PublicNotification" className="value">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none"><path fill-rule="evenodd" fill="#7D8590" d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z" clip-rule="evenodd"></path></svg>
   Notifications
  </Link>




</div>




        </div>
      </li>

      </ul>


<button class="btn btn-primary">Logout</button>




    </div>
  </nav>

  {/* <!-- end navbar home section --> */}

    </div>
  )
}
  















export default Navbar