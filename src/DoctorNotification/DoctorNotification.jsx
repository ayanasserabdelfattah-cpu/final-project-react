import React from 'react'
import NavDoctor from '../NavDoctor/NavDoctor'
import "./DoctorNotification.css"

function DoctorNotification() {
  return (
    <div>

<NavDoctor/>

        {/* <!-- start notification section --> */}
<section className="doctor-notification">
    <div className="container pl-5 pr-5">
        <div className="row ">
            <div className="col-md-12">
                <div className="d-flex align-content-center justify-content-center mb-3">
                    <i className="fa-solid fa-bell fa-2xl mr-2" style={{color: "rgb(116, 192, 252)"}}></i>

                    <h2>Notifications</h2>
                </div>
                <div className="alert alert-info alert-dismissible fade show" role="alert">
  <strong>New Appointment!</strong>
    You have a new appointment request from a patient.
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
            </div>
        </div>
    </div>
     
</section>

{/* <!--  end notification section --> */}


    </div>
  )
}

export default DoctorNotification