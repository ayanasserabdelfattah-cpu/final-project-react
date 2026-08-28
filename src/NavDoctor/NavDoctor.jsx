import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavDoctor"

function NavDoctor() {



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

    <nav class="navbar navbar-expand-lg navbar-light bg-light  pl-5 pr-5  navbar_home">


        <a class="navbar-brand" href="#"><img src="img/WhatsApp Image 2026-08-17 at 3.01.12 PM.png" class="img-fluid "
                width="140"/></a>


        <label class="switch mt-2">
            <input
        id="input"
        type="checkbox"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />

            <div class="slider round">
                <div class="sun-moon">
                    <svg id="moon-dot-1" class="moon-dot" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="moon-dot-2" class="moon-dot" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="moon-dot-3" class="moon-dot" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="light-ray-1" class="light-ray" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="light-ray-2" class="light-ray" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="light-ray-3" class="light-ray" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>

                    <svg id="cloud-1" class="cloud-dark" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="cloud-2" class="cloud-dark" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="cloud-3" class="cloud-dark" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="cloud-4" class="cloud-light" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="cloud-5" class="cloud-light" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg id="cloud-6" class="cloud-light" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                </div>
                <div class="stars">
                    <svg id="star-1" class="star" viewBox="0 0 20 20">
                        <path
                            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z">
                        </path>
                    </svg>
                    <svg id="star-2" class="star" viewBox="0 0 20 20">
                        <path
                            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z">
                        </path>
                    </svg>
                    <svg id="star-3" class="star" viewBox="0 0 20 20">
                        <path
                            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z">
                        </path>
                    </svg>
                    <svg id="star-4" class="star" viewBox="0 0 20 20">
                        <path
                            d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z">
                        </path>
                    </svg>
                </div>
            </div>
        </label>


        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars fa-xl" style={{color: "rgb(116, 192, 252)"}}></i>
        </button>



        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav ml-auto pr-5">

                <li class="nav-item active">
                    <Link to="/DoctorAvailiability" class="nav-link">Appointments <span
                            class="sr-only">(current)</span></Link>
                </li>

                <li class="nav-item">
                    <Link  to="/DoctorNotification"class="nav-link" >Notifications</Link>
                </li>





            </ul>

        </div>
    </nav>

    {/* <!-- end navbar home section --> */}

    </div>
  )
}

export default NavDoctor