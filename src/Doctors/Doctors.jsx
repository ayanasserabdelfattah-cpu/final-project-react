import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Doctors.css";



function Doctors() {

useEffect(() => {

  const searchInput = document.getElementById("search");

  const itemList = document
    .getElementById("itemList")
    .getElementsByClassName("col-md-4");

  const handleSearch = function () {

    const filter = searchInput.value.toLowerCase();

    for (let i = 0; i < itemList.length; i++) {

      const item = itemList[i].textContent.toLowerCase();

      itemList[i].style.display =
        item.includes(filter) ? "" : "none";
    }
  };

  searchInput.addEventListener("keyup", handleSearch);

  return () => {
    searchInput.removeEventListener("keyup", handleSearch);
  };

}, []);

  return (
    <div>

        <Navbar/>

      {/* Start Search Doctors Section */}

      <section className="search-doctors">

        <div className="container">

          {/* Search */}

          <div className="row">
            <div className="col-md-12">

              <div className="d-flex align-items-center justify-content-center">

                <i className="fas fa-search mr-2"></i>

                <input
                  type="text"
                  id="search"
                  placeholder="Search for a doctor..."
                />

              </div>

            </div>
          </div>


          {/* Doctors */}

          <div className="row mt-5" id="itemList">

            {/* Doctor 1 */}

            <div className="col-md-4">

              <div className="text-center doctor mb-5">

                <img
                  src="/img/doctor-1.jpg"
                  className="img-fluid mb-4 doctor-image"
                  alt="Dr. Zyad Ali"
                />

                <h3 className="mb-4 doctor-name">
                  Dr. Zyad Ali
                </h3>

                <h6 className="mb-4 doctor-specialization">
                  Surgeon
                </h6>

                <Link
                  to="/details"
                  className="btn btn-primary rounded-pill"
                >
                  Details
                </Link>

              </div>

            </div>


            {/* Doctor 2 */}

            <div className="col-md-4">

              <div className="text-center doctor mb-5">

                <img
                  src="/img/contact.jpg"
                  className="img-fluid mb-4 doctor-image"
                  alt="Dr. Mazen"
                />

                <h3 className="mb-4 doctor-name">
                  Dr. Mazen
                </h3>

                <h6 className="mb-4 doctor-specialization">
                  Ophthalmology
                </h6>

                <Link
                  to="/Details"
                  className="btn btn-primary rounded-pill"
                >
                  Details
                </Link>

              </div>

            </div>


            {/* Doctor 3 */}

            <div className="col-md-4">

              <div className="text-center doctor mb-5">

                <img
                  src="/img/doctor-2.jpg"
                  className="img-fluid mb-4 doctor-image"
                  alt="Dr. Ezz Ali"
                />

                <h3 className="mb-4 doctor-name">
                  Dr. Ezz Ali
                </h3>

                <h6 className="mb-4 doctor-specialization">
                  Dentist
                </h6>

                <Link
                  to="/Details"
                  className="btn btn-primary rounded-pill"
                >
                  Details
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* End Search Doctors Section */}

    </div>
  );
}

export default Doctors;