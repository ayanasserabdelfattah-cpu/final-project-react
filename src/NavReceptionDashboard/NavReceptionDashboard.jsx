
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavReceptionDashboard.css";

function NavReceptionDashboard() {

    // =========================
    // Dark Mode
    // =========================

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    // تشغيل الـ Dark Mode عند فتح الصفحة
    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);


    // =========================
    // إغلاق الـ Navbar لما نضغط بره
    // =========================

    useEffect(() => {

        const handleClickOutside = (e) => {

            const navbar = document.querySelector(".navbar-reception");
            const navbarCollapse = document.querySelector(
                ".navbar-reception .navbar-collapse"
            );

            if (
                navbar &&
                navbarCollapse &&
                !navbar.contains(e.target)
            ) {
                navbarCollapse.classList.remove("show");
            }
        };

        document.addEventListener("click", handleClickOutside);

        // تنظيف الـ event
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, []);


    return (
        <div>

            {/* =========================
                Start Navbar Reception Dashboard
            ========================= */}

            <nav className="navbar navbar-expand-lg navbar-light bg-light pl-5 pr-5 navbar-reception">

                {/* Logo */}

                <Link
                    className="navbar-brand"
                    to="/ReceptionDashboard"
                >
                    <img
                        src="img/WhatsApp Image 2026-08-17 at 3.01.12 PM.png"
                        className="img-fluid"
                        width="140px"
                        alt="Logo"
                    />
                </Link>


                {/* =========================
                    Dark Mode Switch
                ========================= */}

                <label className="switch mt-2">

                    <input
                        id="input"
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                    />

                    <div className="slider round">

                        <div className="sun-moon">

                            <svg
                                id="moon-dot-1"
                                className="moon-dot"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="moon-dot-2"
                                className="moon-dot"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="moon-dot-3"
                                className="moon-dot"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="light-ray-1"
                                className="light-ray"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="light-ray-2"
                                className="light-ray"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="light-ray-3"
                                className="light-ray"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="cloud-1"
                                className="cloud-dark"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="cloud-2"
                                className="cloud-dark"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="cloud-3"
                                className="cloud-dark"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="cloud-4"
                                className="cloud-light"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="cloud-5"
                                className="cloud-light"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                            <svg
                                id="cloud-6"
                                className="cloud-light"
                                viewBox="0 0 100 100"
                            >
                                <circle cx="50" cy="50" r="50"></circle>
                            </svg>

                        </div>


                        <div className="stars">

                            <svg
                                id="star-1"
                                className="star"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                                ></path>
                            </svg>

                            <svg
                                id="star-2"
                                className="star"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                                ></path>
                            </svg>

                            <svg
                                id="star-3"
                                className="star"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                                ></path>
                            </svg>

                            <svg
                                id="star-4"
                                className="star"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
                                ></path>
                            </svg>

                        </div>

                    </div>

                </label>


                {/* =========================
                    Hamburger Button
                ========================= */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#receptionNavbarContent"
                    aria-controls="receptionNavbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i
                        className="fa-solid fa-bars fa-xl"
                        style={{
                            color: "rgb(116, 192, 252)"
                        }}
                    ></i>
                </button>


                {/* =========================
                    Navbar Links
                    No Visit Site
                ========================= */}

                <div
                    className="collapse navbar-collapse"
                    id="receptionNavbarContent"
                >
                </div>

            </nav>

            {/* =========================
                End Navbar Reception Dashboard
            ========================= */}

        </div>
    );
}

export default NavReceptionDashboard;

