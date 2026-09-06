import React from 'react'
import Navbar from "../Navbar/Navbar";
import "./PublicNotification.css"

function PublicNotification() {
  return (
    <div>

      <Navbar />


            {/* <!-- start notification section --> */}

    <section class="notification">

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <i class="fa-solid fa-bell fa-2xl" style={{color: "rgb(116, 192, 252)"}}></i>
                        <h2> Notifications</h2>

                    </div>
                    <div class="alert alert-info alert-dismissible fade show" role="alert">
                        <i class="fa-solid fa-check fa-2xl" style={{color: "rgb(193, 193, 78)"}}></i>
                          Your appointment has been confirmed!
Your appointment is scheduled for Tuesday, August 25 at 4:00 PM.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </section>




    {/* <!-- start notification section --> */}

    </div>
  )
}

export default PublicNotification