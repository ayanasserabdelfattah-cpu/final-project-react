import React, { useEffect, useState } from "react";
import axios from "axios";
import NavReceptionDashboard from "../NavReceptionDashboard/NavReceptionDashboard";
import { Link } from "react-router-dom";
import "./RepceptionDashboard.css";

function ReceptionDashboard() {

    // =========================
    // Patients
    // =========================

    const [patients, setPatients] = useState([]);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // =========================
    // Patients API
    // =========================

    useEffect(() => {

        const getPatients = async () => {

            try {

                const usersResponse =
                    await axios.get(
                        "http://127.0.0.1:8000/api/users",
                        config
                    );

                const users =
                    usersResponse.data.data ||
                    usersResponse.data ||
                    [];

                // Patients = role_id 4
                const patientUsers =
                    users.filter(
                        (user) =>
                            Number(user.role_id) === 4
                    );

                setPatients(patientUsers);

                console.log(
                    "PATIENT USERS:",
                    patientUsers
                );

            } catch (error) {

                console.log(
                    "PATIENTS API ERROR:",
                    error
                );

                console.log(
                    "STATUS:",
                    error.response?.status
                );

                console.log(
                    "BACKEND RESPONSE:",
                    JSON.stringify(
                        error.response?.data,
                        null,
                        2
                    )
                );

            }

        };

        getPatients();

    }, []);

    // =========================
    // PAGE
    // =========================

    return (

        <div className="reception-dashboard">

            <NavReceptionDashboard />

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
                        style={{
                            color: "rgb(116, 192, 252)"
                        }}
                    ></i>

                    <h3>
                        Reception Dashboard
                    </h3>

                </div>


                {/* =========================
                    Statistics
                ========================= */}

                <div className="row dashboard-cards">

                    {/* Patients */}

                    <div className="col-md-4 mb-4">

                        <div className="dashboard-card">

                            <div className="card-icon">

                                <i
                                    className="fa-solid fa-hospital-user"
                                    style={{
                                        color:
                                            "rgb(116, 192, 252)"
                                    }}
                                ></i>

                            </div>

                            <div>

                                <h6>
                                    Patients
                                </h6>

                                <h3>
                                    {patients.length}
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
                            style={{
                                color:
                                    "rgb(116, 192, 252)"
                            }}
                        ></i>

                        <h4>
                            Management Operations
                        </h4>

                    </div>


                    <div className="row management-cards">

                        {/* Patient Management */}

                        <div className="col-md-6 col-lg-4 mb-4">

                            <div className="management-card">

                                <i
                                    className="fa-solid fa-hospital-user"
                                    style={{
                                        color:
                                            "rgb(116, 192, 252)"
                                    }}
                                ></i>

                                <h5>
                                    Patient Management
                                </h5>

                                <p>
                                    Add, edit and manage patients
                                </p>

                                <Link
                                    to="/PatientReceptionManagement"
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

export default ReceptionDashboard;