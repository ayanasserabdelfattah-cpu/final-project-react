import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {

  // Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {

    // لما الصفحة تفتح
    document.body.classList.toggle("dark", darkMode);

    // حفظ الحالة
    localStorage.setItem("darkMode", darkMode);

  }, [darkMode]);


  // إغلاق الـ Navbar لما أدوس بره
  useEffect(() => {

    const handleClick = (e) => {

      if (!e.target.closest(".navbar")) {

        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (navbarCollapse) {
          navbarCollapse.classList.remove("show");
        }

      }

    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };

  }, []);


  return (
    <div>

      {/* start navbar welcome section */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light pl-5 pr-5 navbar_home">

        <Link className="navbar-brand" to="#">
          <img
            src="/img/WhatsApp Image 2026-08-17 at 3.01.12 PM.png"
            className="img-fluid"
            width="140"
            alt="Medstar Logo"
          />
        </Link>

        <label className="switch mt-2">

            {/* اتعدل مع ال js */}

          <input
            id="input"
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          
  {/* اتعدل مع ال js */}
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
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
              </svg>

              <svg id="star-2" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
              </svg>

              <svg id="star-3" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
              </svg>

              <svg id="star-4" className="star" viewBox="0 0 20 20">
                <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
              </svg>

            </div>

          </div>

        </label>

      </nav>

      {/* end navbar welcome section */}


      {/* start welcome section */}

      <section className="welcome">

        <div className="container pl-5 pr-5">

          <div className="row">

            <div className="col-md-6 mt-5">

              <div className="d-flex justify-content-center align-items-center flex-column">

                <h2>
                  Welcome To <span>Medstar</span>
                </h2>

                <p>
                  Your health and well-being are our priority.
                </p>

              </div>


              <div className="d-flex justify-content-center gap-2">

                <Link
                  to="/Register"
                  className="nav-link btn btn-primary p-2 mb-3"
                >
                  Register
                </Link>

                <Link
                  to="/Login"
                  className="nav-link btn btn-primary p-2 mb-3"
                >
                  Login
                </Link>

              </div>

            </div>


            <div className="col-md-6">

              <div className="d-flex justify-content-center align-items-center flex-column">

                <img
                  src="/img/blog-2.jpeg"
                  className="img-fluid"
                  alt="Medical"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* end welcome section */}

    </div>
  );
}

export default Welcome;