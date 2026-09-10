import React from 'react'
import Navbar from "../Navbar/Navbar";
import "./Department.css"



function Department() {
  return (
    <div>

        <Navbar/>


            {/* <!-- start department section --> */}

    <section className="department">
        <div className="container">
            <div className="row">


                <div className="col-md-4">
                    <div className="one">
                        <h6>OUR DEPARTMENTS</h6>
                        <h2>Specialized Care,<br/>All in One Place</h2>
                        <p>We offer a wide range of medical departments with advance technology and a team ofhighly<br/> 
                            qualified speciallists. </p>
                    </div>



                </div>



                <div className="col-md-4">

                    <div className="title-services">

                        <div className="department-item">

                            <h5> <i className="fa-solid fa-circle-chevron-right" style={{color: "rgb(116, 192, 252)"}}></i>Cardiology</h5>

                            <div className="description">
                                <h4><i className="fa-solid fa-heart-pulse" style={{color: "#130f40"}}></i> Cardiology</h4>
                                <p>
                                    Heart care and treatment for cardiovascular diseases.
                                </p>
                            </div>

                        </div>


                        <div className="department-item">

                            <h5><i className="fa-solid fa-circle-chevron-right" style={{color: "rgb(116, 192, 252)"}}></i> Neurology</h5>

                            <div className="description">
                                <h4><i className="fa-solid fa-brain" style={{color:"#130f40 "}}></i> Neurology</h4>
                                <p>
                                    Specialized care for brain and nervous system disorders.
                                </p>
                            </div>

                        </div>


                        <div className="department-item">

                            <h5><i className="fa-solid fa-circle-chevron-right" style={{color: "rgb(116, 192, 252)"}}></i> Pediatrics</h5>

                            <div className="description">
                                <h4><i className="fa-solid fa-child" style={{color: "#130f40 "}}></i> Pediatrics</h4>
                                <p>
                                    Complete healthcare and treatment for children.
                                </p>
                            </div>

                        </div>


                        <div className="department-item">

                            <h5><i className="fa-solid fa-circle-chevron-right" style={{color: "rgb(116, 192, 252)"}}></i> Orthopedics</h5>

                            <div className="description">
                                <h4><i className="fa-solid fa-bone" style={{color: "#130f40"}}></i> Orthopedics</h4>
                                <p>
                                    Care for bones, joints, and muscles.
                                </p>
                            </div>

                        </div>


                        <div className="department-item">

                            <h5><i className="fa-solid fa-circle-chevron-right" style={{color: "rgb(116, 192, 252)"}}></i> Dermatology</h5>

                            <div className="description">
                                <h4><i className="fa-solid fa-pump-soap" style={{color: "#130f40"}}></i> Dermatology</h4>
                                <p>
                                    Expert care for skin, hair, and nail conditions.
                                </p>
                            </div>

                        </div>


                        <div className="department-item">

                            <h5><i className="fa-solid fa-circle-chevron-right" style={{color: "rgb(116, 192, 252)"}}></i> Emergency</h5>

                            <div className="description">
                                <h4><i className="fa-solid fa-truck-medical" style={{color: "#130f40"}}></i> Emergency</h4>
                                <p>
                                    Fast care for urgent medical conditions.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    </section>


    {/* <!-- end department section --> */}






    </div>
  )
}

export default Department