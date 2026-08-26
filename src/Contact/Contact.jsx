import React from 'react'
import Navbar from "../Navbar/Navbar";
import "./Contact.css"


function Contact() {
  return (
    <div>

      <Navbar/>


        
    {/* <!-- start appointment contact section --> */}

    <section className="appointment-contact">
        <div className="container pl-5 pr-5">
            <div className="row">

                <div className="col-md-12">


                    <h3 className=" mb-3"><span>
                            <i className="fa-solid fa-calendar-days fa-lg" style={{color: "rgb(116, 192, 252)"}}></i></span>
                        Book AN Appointment</h3>

                    <form id="fromappointment" target="_self" method="post">

                        <input type="text" name="patient" placeholder="Enter Your Name"
                            className="form-control mb-2 rounded-3 input-name" required/>
                        <input type="email" name="email" placeholder="Enter Your Email"
                            className="form-control mb-2 rounded-3 input-email" required/>
                        <input type="tel" name="phone" placeholder="Phone"
                            className="form-control mb-2 rounded-3 input-phone" required/>

                        <input type="date" name="date" className=" p-1" required/>
                        <br/>

                        <select name="time" required>
                            <option value="" disabled>Avalailable Time</option>
                            <option value="11.00">11.00</option>
                            <option value="12.00">12.00</option>
                        </select>

                        <br/>


                        <select name="doctor" id="doctor" required>
                            <option value="" disabled>Select Doctor</option>
                        </select>


                        <br/>

                        <select name="payment" id="payment" required>
                            <option value="" disabled>Payment</option>
                            <option value="credit">Credit</option>
                            <option value="Cash">cash</option>
                        </select>


                        <br/>
                        <textarea name="message" cols="15" rows="2" placeholder="message" className="mt-2"></textarea>
                        <br/>

                        <input type="submit" value="Book An Appointment" className="btn btn-primary p-2 "/>

                        
<br/>
                        <input type="submit" value="Cancel An Appointment" className="btn btn-dark p-2  mt-3"/>







                    </form>







                </div>
            </div>
        </div>
    </section>


    {/* <!-- start appointment contact section --> */}







    {/* <!-- start call contact section --> */}

    <section className="call-contact">
        <div className="container pl-5 pr-5">

            <div className="row">





                <div className="col-md-6 text-start  d-flex flex-column align-items-start  ">
                    <div className="mb-5">
                        <h2>ADDERSS</h2>
                        <p><i className="fa-solid fa-location-dot" style={{color: "rgb(59, 167, 255)"}}></i>El Gomhoureya
                            Street, Mansoura, Dakahlia, Egypt 60</p>
                        <p><i className="fa-solid fa-phone" style={{color: "rgb(59, 167, 255)"}}></i>Phone:123456789</p>
                        <p><i className="fa-regular fa-envelope"
                                style={{color: "rgb(59, 167, 255)"}}></i>Support@foodlover.com</p>
                    </div>


                    <div className="mb-5">
                        <h2>WORKING HOURS</h2>
                        <p>7.00 am to 12.00 am on Weekday<br/> 10.00 am to 1.00 am on Weekend </p>

                    </div>


                    <div className="mb-5">
                        <h2>FOLLOW US</h2>
                        <div className="icons ">

                            <a href="https://www.facebook.com/MansouraUniversityOfficial"
                                className="bg-info rounded-pill p-1 m-1 "><i className="fa-brands fa-facebook-f"
                                    style={{color: "rgb(235, 244, 250) "}}></i></a>
                            <a href="https://twitter.com/Mansoura_un" className="bg-info rounded-pill p-1  m-1"><i
                                    className="fa-brands fa-twitter" style={{color: "rgb(235, 244, 250)"}}></i></a>
                            <a href="https://www.instagram.com/mansourauniversityofficial"
                                className="bg-info rounded-pill p-1  m-1"><i className="fa-brands fa-instagram"
                                    style={{color: "rgb(235, 244, 250)"}}></i></a>




                        </div>
                    </div>

                </div>





                <div className="col-md-6 mt-3">
                    <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.361127448946!2d31.361261274994984!3d31.044044774435577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79dd0441cbe8f%3A0x3a28297de7005a5!2sMansoura%20University%20Hospitals!5e0!3m2!1sen!2seg!4v1787075141168!5m2!1sen!2seg"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
></iframe>
                </div>


            </div>



        </div>
    </section>

    {/* <!-- end call contact section --> */}




    </div>
  )
}

export default Contact