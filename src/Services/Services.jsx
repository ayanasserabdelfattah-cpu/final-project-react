import React from 'react'
import "./Services.css"
import Navbar from "../Navbar/Navbar";

function Services() {
  return (
      <div>

        
        <Navbar/>



            {/* <!-- start welcome services section  --> */}

    <section className="welcome-services">
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="text-center  ">
                        <h2>Our Services</h2>
                        <p>Comprehensive healthcare services designed to provide you <br/>and your family with the best
                            possible care❤️.</p>

                    </div>
                </div>
            </div>
        </div>
    </section>


    {/* <!-- end welcome services section  --> */}



    
    {/* <!-- start services section --> */}
    <section className="services">
        <div className="container pr-5 pl-5">

            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                        <h2>Our services</h2>
                        <img src="/img/section-img.png" className="img-fluid mb-3 mt-3"/>
                        <h6>
                            Discover the healthcare services we provide for you and your family.
                        </h6>

                    </div>
                </div>

            </div>






            <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                        <i className="fa-solid fa-user-doctor fa-2xl care " style={{color:  "#0f2250"}}></i>
                        <h2>Medical Consultation🩺 </h2>
                        <p>Get professional medical advice from experienced doctors to understand your condition and
                            receive the right treatment.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6   image ">
                    <img src="/img/4338bd_fcdb899d16104de191d0a815c8f06d6b~mv2.avif" className="img-fluid"/>

                </div>
            </div>


            <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                       <i className="fa-solid fa-briefcase-medical fa-2xl care" style={{color: "#0f2250"}}></i>
                        <h2>Emergency Care🚑 </h2>
                        <p>Receive quick and reliable medical care from our trained team during urgent and emergency situations.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/istockphoto-1288457610-170667a.jpg" className="img-fluid"/>

                </div>
            </div>


            
            <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                     <i className="fa-solid fa-microscope fa-2xl care" style={{color:"#0f2250 "}}></i>
                        <h2>Laboratory Tests🔬 </h2>
                        <p>Accurate laboratory tests help doctors identify health problems and choose the most suitable treatment.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/the-scientist-conducts-an-experiment-using-test-tubes-in-a-modern-laboratory-environment-photo.jpeg" className="img-fluid"/>

                </div>
            </div>



            <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                       <i className="fa-solid fa-x-ray fa-2xl care" style={{color: "#0f2250 "}}></i>
                        <h2>Radiology & Imaging🩻  </h2>
                        <p>
Advanced imaging services help doctors examine the body and detect health problems accurately.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/تطبيقات-الأشعة-السينية.jpg" className="img-fluid"/>

                </div>
            </div>



            <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                    <i className="fa-solid fa-syringe fa-2xl care" style={{color: "#0f2250 "}}></i>
                        <h2>Vaccination💉 </h2>
                        <p>Protect yourself and your family with essential vaccinations provided by qualified healthcare professionals.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/Untitled_design.webp" className="img-fluid"/>

                </div>
            </div>


           


                 <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                    <i className="fa-solid fa-mask-face fa-2xl care" style={{color: "#0f2250 "}}></i>
                        <h2>Surgical Procedures🏥 </h2>
                        <p>Our skilled surgical team provides safe procedures using modern medical techniques and careful patient care.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/group-surgeons-doing-surgery-hospital-operating-theater-medical-team-doing-critical-operation_124865-22625.avif" className="img-fluid"/>

                </div>
            </div>





                <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                   <i className="fa-solid fa-heart-pulse fa-2xl care" style={{color: "#0f2250 "}}></i>
                        <h2>Inpatient Care⚕️ </h2>
                        <p>Patients receive comfortable care, continuous medical monitoring, and professional nursing support during their stay.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/OIP.webp" className="img-fluid"/>

                </div>
            </div>




                <div className="row mt-5">

                <div className="col-md-6">
                    <div className="services-card text-center">
                   <i className="fa-solid fa-truck-medical fa-2xl care" style={{color: "#0f2250"}}></i>
                        <h2>Ambulance Service🚑 </h2>
                        <p>Our ambulance service provides fast and safe transportation for patients who need urgent medical attention.</p>
                        <button className="animated-button">
                            <span>Learn More</span>
                            <span></span>
                        </button>

                    </div>

                </div>

                <div className="col-md-6  image ">
                    <img src="/img/NON-EMERGENCY-main-1.jpg" className="img-fluid"/>

                </div>
            </div>



        </div>
    </section>

    {/* <!-- start services section --> */}





   


    </div>
  )
}

export default Services
