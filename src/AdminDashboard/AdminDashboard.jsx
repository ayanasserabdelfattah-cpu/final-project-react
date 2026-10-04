
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import "./AdminDashboard.css";

function AdminDashboard() {

    // =========================
    // APIs
    // =========================

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const token = localStorage.getItem("token");


    // =========================
    // Patients API
    // =========================

    useEffect(() => {

        axios.get(
            "http://127.0.0.1:8000/api/patients",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((item) => {
            setPatients(item.data);
        });

    }, []);


    // =========================
    // Doctors API
    // =========================

    useEffect(() => {

        axios.get(
            "http://127.0.0.1:8000/api/doctors",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((item) => {
            setDoctors(item.data);
        });

    }, []);


    // =========================
    // Users API
    // =========================

    useEffect(() => {

        axios.get(
            "http://127.0.0.1:8000/api/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((item) => {
            setUsers(item.data.data || item.data);
        });

    }, []);


    // =========================
    // Appointments API
    // =========================

    useEffect(() => {

        axios.get(
            "http://127.0.0.1:8000/api/appointments",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((item) => {
            setAppointments(item.data);
        });

    }, []);


    // =========================
    // Filter Users By Role
    // =========================

    const admins = users.filter(
        (user) => Number(user.role_id) === 1
    );

    const doctorsCount = users.filter(
        (user) => Number(user.role_id) === 2
    );

    const reception = users.filter(
        (user) => Number(user.role_id) === 3
    );

    const patientsCount = users.filter(
        (user) => Number(user.role_id) === 4
    );
    console.log("PATIENT USERS:", patientsCount);


    // =========================
    // PAGE
    // =========================

    return (

        <div className="admin-dashboard">

            <NavbarDashboard />


            {/* =========================
                Dashboard Content
            ========================= */}

            <div className="container dashboard-container">


                {/* =========================
                    Dashboard Title
                ========================= */}

                <div className="dashboard-title">

                    <i
                        className="fa-solid fa-gauge-high"
                        style={{ color: "rgb(116, 192, 252)" }}
                    ></i>

                    <h3>Admin Dashboard</h3>

                </div>


                {/* =========================
                    Statistics
                ========================= */}

                <div className="row dashboard-cards">


                    {/* Patients */}

                    <div className="col-md-3 mb-4">

                        <div className="dashboard-card">

                            <div className="card-icon">

                                <i
                                    className="fa-solid fa-hospital-user"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                            </div>

                            <div>

                                <h6>Patients</h6>

                                <h3>
                                    {patientsCount.length}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Doctors */}

                    <div className="col-md-3 mb-4">

                        <div className="dashboard-card">

                            <div className="card-icon">

                                <i
                                    className="fa-solid fa-user-doctor"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                            </div>

                            <div>

                                <h6>Doctors</h6>

                                <h3>
                                    {doctorsCount.length}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Reception */}

                    <div className="col-md-3 mb-4">

                        <div className="dashboard-card">

                            <div className="card-icon">

                                <i
                                    className="fa-solid fa-user-tie"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                            </div>

                            <div>

                                <h6>Reception</h6>

                                <h3>
                                    {reception.length}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* Admins */}

                    <div className="col-md-3 mb-4">

                        <div className="dashboard-card">

                            <div className="card-icon">

                                <i
                                    className="fa-solid fa-user-shield"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                            </div>

                            <div>

                                <h6>Admins</h6>

                                <h3>
                                    {admins.length}
                                </h3>

                            </div>

                        </div>

                    </div>




                    {/* users */}

                    <div className="col-md-3 mb-4">

                        <div className="dashboard-card">

                            <div className="card-icon">

                              

                                <i className="fa-solid fa-users"  style={{ color: "rgb(116, 192, 252)" }}></i>

                            </div>

                            <div>

                                <h6>Users</h6>

                                <h3>
                                    {users.length}
                                </h3>

                            </div>

                        </div>

                    </div>


             

                </div>


                {/* =========================
                    Management Operations
                ========================= */}

                <div className="dashboard-section">

                    <div className="section-title">

                        <i
                            className="fa-solid fa-gear"
                            style={{ color: "rgb(116, 192, 252)" }}
                        ></i>

                        <h4>Management Operations</h4>

                    </div>


                    <div className="row management-cards">


                        {/* Admin Management */}

                        <div className="col-md-6 col-lg-4 mb-4">

                            <div className="management-card">

                                <i
                                    className="fa-solid fa-user-shield"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                                <h5>Admin Management</h5>

                                <p>
                                    Add, edit and manage admins
                                </p>

                                <Link
                                    to="/AdminManagement"
                                    className="management-btn"
                                >
                                    Manage Admins
                                </Link>

                            </div>

                        </div>


                        {/* Doctor Management */}

                        <div className="col-md-6 col-lg-4 mb-4">

                            <div className="management-card">

                                <i
                                    className="fa-solid fa-user-doctor"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                                <h5>Doctor Management</h5>

                                <p>
                                    Add, edit and manage doctors
                                </p>

                                <Link
                                    to="/DoctorManagement"
                                    className="management-btn"
                                >
                                    Manage Doctors
                                </Link>

                            </div>

                        </div>


                        {/* Reception Management */}

                        <div className="col-md-6 col-lg-4 mb-4">

                            <div className="management-card">

                                <i
                                    className="fa-solid fa-user-tie"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                                <h5>Reception Management</h5>

                                <p>
                                    Add, edit and manage reception staff
                                </p>

                                <Link
                                    to="/ReceptionManagment"
                                    className="management-btn"
                                >
                                    Manage Reception
                                </Link>

                            </div>

                        </div>


                        {/* Patient Management */}

                        <div className="col-md-6 col-lg-4 mb-4">

                            <div className="management-card">

                                <i
                                    className="fa-solid fa-hospital-user"
                                    style={{ color: "rgb(116, 192, 252)" }}
                                ></i>

                                <h5>Patient Management</h5>

                                <p>
                                    Add, edit and manage patients
                                </p>

                                <Link
                                    to="/PatientManagement"
                                    className="management-btn"
                                >
                                    Manage Patients
                                </Link>

                            </div>

                        </div>


                     

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
