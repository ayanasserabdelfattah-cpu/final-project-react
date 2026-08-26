import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Details.css"



function Details() {
  return (
    <div>


<Navbar/>
        

    <section class="details-home">
        <div class="container pl-5 pr-5">



            <div class="row">




                <div class="col-md-6 ">
                    <img src="/img/doctor-1.jpg" class="img-fluid mb-4  rounded-5"/>

                </div>




                <div class="col-md-6 ">




                    <div
                        class="doctor-info d-flex flex-column align-items-start justify-content-center text-center mt-5">


                        <div class="d-flex">

                            <i class="fa-solid fa-id-card-clip fa-lg mt-1 mr-2" style={{color: "rgb(116, 192, 252)"}}></i>
                            <h5 class="mb-4">Doctor ID: <span class="doctor-id  ml-2">5</span></h5>

                        </div>


                        <div class="d-flex">

                            <i class="fa-solid fa-user fa-lg mr-1" style={{color: "rgb(116, 192, 252)"}}></i>
                            <h5 class="mb-4">Name: <span class="doctor-Name  ml-2">Dr.Zyad Ali</span></h5>

                        </div>

                        <div class="d-flex">

                            <i class="fa-solid fa-stethoscope fa-lg mr-1" style={{color: "rgb(116, 192, 252)"}}></i>
                            <h5 class="mb-4">Specialization: <span class="doctor-specialization ml-2">Surgeon</span>
                            </h5>

                        </div>

                        <div class="d-flex">

                            <i class="fa-solid fa-syringe fa-lg mr-1" style={{color: "rgb(116, 192, 252)"}}></i>
                            <h5 class="mb-4">Experience: <span class="doctor-experience ml-2">6 years</span></h5>
                        </div>


                        <div class="d-flex">

                            <i class="fa-solid fa-person-cane fa-lg mr-1" style={{color: "rgb(116, 192, 252)"}}></i>
                            <h5 class="mb-4">Age: <span class="doctor-age ml-2">33</span></h5>

                        </div>

                        <div class="d-flex">

                            <i class="fa-solid fa-money-check-dollar fa-lg mr-1" style={{color: "rgb(116, 192, 252)"}}></i>
                            <h5 class="mb-4">Fees: <span class="doctor-fees ml-2">50$</span></h5>

                        </div>


                        <Link to="/Contact" class="btn btn-primary rounded-pill">
                            Appointment
                        </Link>

                        <Link to="/Doctors" class="btn btn-dark rounded-pill mt-4">
                            Back
                        </Link>


                    </div>




                </div>





            </div>






            <div class="row mt-5">
                <div class="col-md-12">


                    <div class=" d-flex  align-items-center justify-content-center ">

                        <i class="fa-regular fa-calendar-days fa-lg mb-2 mr-2" style={{color: "rgb(116, 192, 252)"}}></i>
                        <h4>Available Appointments</h4>

                    </div>


                    <table class="table table-striped table-light ">

                        <thead>
                            <tr>
                                <th scope="col">Day</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                
                                <td>Saturday</td>
                                <td>07:00 AM</td>
                                <td>09:00 PM</td>
                                
                            </tr>
                            <tr>
                               
                                <td>Monday</td>
                                <td>02:00 PM</td>
                                <td>07:00 PM</td>
                              

                            </tr>
                            <tr>
                                
                                <td>Wednesday</td>
                                <td>12:00 PM</td>
                                <td>11:00 PM</td>
                                
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>


        </div>

    </section>


    </div>
  )
}

export default Details