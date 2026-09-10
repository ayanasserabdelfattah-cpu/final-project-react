import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./About.css"

function About() {


 const [lightMode, setLightMode] = useState(false);







  return (
    <div>
<Navbar/>

  {/* <!-- start heart about section --> */}

    <section className={`heart-about ${lightMode ? "light-mode" : ""}`}>
        <div className="container pr-3 pl-3">
            <div className="row">
                <div className="col-md-6">

                    <div className="contain">

                        <h2>Behind every door, there is a <span>story</span>.
                            Behind every light, there is<span> hope</span> .</h2>


                        <p>We believe healthcare is more than treatment. It is about creating a safe place where care,
                            comfort, and hope come together.</p>
                        <button className="btn btn-dark mr-3  dark" onClick={() => setLightMode(false)}>Stay in the Dark</button>
                        <button className="btn btn-primary  light" onClick={() => setLightMode(true)}>Let the Light In</button>
                    </div>

                </div>
            </div>
        </div>
    </section>

    {/* <!-- end heart about section --> */}



    {/* <!-- start mission section --> */}

    <section className="mission-about">
        <div className="container pl-3 pr-3">
            <div className="row">


                <div className="col-md-4">

                    <h2><i className="fa-solid fa-eye mr-2" style={{color: "rgb(116, 192, 252)"}}></i>Our Vision</h2>
                    <p>To create a healthcare experience where everyone feels safe, cared for, and hopeful.</p>


                </div>



                <div className="col-md-4">

                    <h2><i className="fa-solid fa-bullseye mr-2 " style={{color: "rgb(116, 192, 252)"}}></i>Our Mission</h2>
                    <p>To provide accessible, compassionate, and high-quality healthcare that puts patients at the heart
                        of everything we do.</p>


                </div>


                <div className="col-md-4">

                    <h2><i className="fa-solid fa-heart mr-2" style={{color: "rgb(116, 192, 252)"}}></i>Our Values</h2>
                    <p>We believe in compassion, trust, respect, teamwork, and putting people first in every step of
                        their healthcare journey.</p>


                </div>


            </div>
        </div>
    </section>

    {/* <!-- end mission section --> */}


    {/* <!--  start choose section  --> */}

    <section className="choose-about">
        <div className="container pr-3 pl-3">


            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">

                        <h2>
                            What Makes Us Different?
                        </h2>

                        <img src="/img/section-img.png" className="img-fluid"/>
                    </div>

                </div>

            </div>






            <div className="row mt-5">


                <div className="col-md-6">
                    <div className="choose">
                        <h3><i className="fa-solid fa-circle-dot mr-2" style={{color: "rgb(116, 192, 252)"}}></i>Why Choose Us?
                        </h3>

                        <p className="mt-4">
                            We are committed to providing exceptional healthcare through experienced doctors,
                            modern facilities, advanced medical services, and compassionate care.
                            Every decision we make is focused on your health, comfort, safety, and well-being.
                        </p>

                        <Link to="/Department" className="btn btn-primary mt-3  mb-5">Explore Department</Link>
                    </div>

                </div>



                <div className="col-md-6">
                    <div className="image-stack">

                        <img src="/img/WhatsApp Image 2026-09-09 at 1.04.03 AM.jpeg" className="stack-img img-one"/>

                        <img src="/img/image_2023_03_10T12_49_13_290Z-1024x682.png" className="stack-img img-two"/>

                        <img src="/img/group-surgeons-doing-surgery-hospital-operating-theater-medical-team-doing-critical-operation_124865-22625.avif"
                            className="stack-img img-three"/>

                    </div>
                </div>

            </div>






        </div>
    </section>


    {/* <!--  end choose section  --> */}


    {/* <!-- start info about section --> */}

    <section className="info-about">
        <div className="container  ">

            <div className="row ">

                <div className="col-lg-3 col-md-6 d-flex mb-4">
                    <i className="fa-solid fa-house-chimney icon-about" style={{color: "rgb(255, 255, 255)"}}></i>
                    <div className="ml-3">
                        <h2>3468</h2>
                        <p>Hospital Rooms</p>
                    </div>

                </div>


                <div className="col-lg-3  col-md-6 d-flex  mb-4">
                    <i className="fa-solid fa-user  icon-about" style={{color: "rgb(255, 255, 255)"}}></i>
                    <div className="ml-3">
                        <h2>557</h2>
                        <p>Speciallist Doctors</p>
                    </div>

                </div>


                <div className="col-lg-3 col-md-6 d-flex  mb-4">
                    <i className="fa-solid fa-face-smile-beam icon-about" style={{color: "rgb(255, 255, 255)"}}></i>
                    <div className="ml-3">
                        <h2>4379</h2>
                        <p>Happy Patients</p>
                    </div>

                </div>


                <div className="col-lg-3 col-md-6 d-flex" mb-4>
                    <i className="fa-solid fa-clipboard-list icon-about" style={{color: "rgb(255, 255, 255)"}}></i>
                    <div className="ml-3">
                        <h2>32</h2>
                        <p>Years of Experience</p>
                    </div>

                </div>

            </div>
        </div>

    </section>

    {/* <!-- end info about section --> */}






    </div>
  )
}

export default About