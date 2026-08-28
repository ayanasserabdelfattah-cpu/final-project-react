import React from 'react'
import NavDoctor from '../NavDoctor/NavDoctor'
import "./DoctorAvailiability.css"

function DoctorAvailiability() {
  return (
    <div>
<NavDoctor/>

            {/* <!-- start appointments section --> */}

    <section className="appointments">
        <div className="container pl-5 pr-5">



            <div className="row">
                <div className="row mt-5">
                    <div className="col-md-12">


                        <div className=" d-flex  align-items-center justify-content-center ">

                            <i className="fa-regular fa-calendar-days fa-lg mb-2 mr-2"
                                style={{color: "rgb(116, 192, 252)"}}></i>
                            <h4>Doctor Appointments</h4>

                        </div>


                        <table className="table table-striped table-light ">

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




            <div className="row mt-5">
                <div className="col-md-12">


                     <div className=" d-flex  align-items-center justify-content-center ">

                            <i className="fa-regular fa-calendar-days fa-lg mb-2 mr-2"
                                style={{color: "rgb(116, 192, 252)"}}></i>
                            <h4>Patient Appointments</h4>

                        </div>

                
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Day</th>
                                <th scope="col">Time</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>


                        <tbody>
                            <tr>
                                <td >22/8</td>
                                <td>Saturday</td>
                                <td>3:00 pm</td>
                                <td>Ali</td>
                                <td>confirmed</td>
                            </tr>
                          
                            <tr>
                                <th ></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>













        </div>

    </section>
    {/* <!-- end appointments section --> */}

    </div>
  )
}

export default DoctorAvailiability