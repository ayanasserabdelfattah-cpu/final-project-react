import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {

    const API_URL = "http://127.0.0.1:8000/api";

    const navigate = useNavigate();

    // =========================================
    // TOKEN
    // =========================================

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    // =========================================
    // STATES
    // =========================================

    const [user, setUser] = useState(null);

    const [doctors, setDoctors] = useState([]);

    const [schedules, setSchedules] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState("");

    const [selectedSchedule, setSelectedSchedule] = useState("");

    const [formData, setFormData] = useState({
        appointment_date: "",
        appointment_time: "",
        notes: "",
    });

    // =========================================
    // GET USER FROM LOCAL STORAGE
    // =========================================

    useEffect(() => {

        const savedUser =
            localStorage.getItem("user");

        if (savedUser) {

            try {

                const userData =
                    JSON.parse(savedUser);

                console.log(
                    "CURRENT USER:",
                    userData
                );

                setUser(userData);

            } catch (error) {

                console.log(
                    "USER PARSE ERROR:",
                    error
                );

                setUser(null);
            }

        } else {

            console.log(
                "VISITOR - NO LOGIN"
            );

            setUser(null);
        }

    }, []);

    // =========================================
    // GET DOCTORS
    // =========================================

    useEffect(() => {

        const getDoctors = async () => {

            try {

                /*
                If the user is logged in,
                send the token.

                If not logged in,
                send the request normally.
                */

                const response = await axios.get(
                    `${API_URL}/doctors`,
                    token
                        ? config
                        : {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                );

                const doctorData =
                    response.data.data ||
                    response.data ||
                    [];

                console.log(
                    "DOCTORS:",
                    doctorData
                );

                setDoctors(
                    doctorData
                );

            } catch (error) {

                console.log(
                    "GET DOCTORS ERROR:",
                    error
                );

                console.log(
                    "STATUS:",
                    error.response?.status
                );

                console.log(
                    "BACKEND RESPONSE:",
                    error.response?.data
                );

            }

        };

        getDoctors();

    }, []);

    // =========================================
    // GET DOCTOR SCHEDULES
    // =========================================

    useEffect(() => {

        const getSchedules = async () => {

            if (!selectedDoctor) {

                setSchedules([]);

                setSelectedSchedule("");

                return;
            }

            try {

                const response = await axios.get(
                    `${API_URL}/doctor_schedules`,
                    token
                        ? config
                        : {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                );

                const allSchedules =
                    response.data.data ||
                    response.data ||
                    [];

                console.log(
                    "ALL SCHEDULES:",
                    allSchedules
                );

                const doctorSchedules =
                    allSchedules.filter(
                        (schedule) =>
                            Number(schedule.doctor_id) ===
                            Number(selectedDoctor)
                    );

                console.log(
                    "SELECTED DOCTOR SCHEDULES:",
                    doctorSchedules
                );

                setSchedules(
                    doctorSchedules
                );

                setSelectedSchedule("");

            } catch (error) {

                console.log(
                    "GET SCHEDULES ERROR:",
                    error
                );

                console.log(
                    "STATUS:",
                    error.response?.status
                );

                console.log(
                    "BACKEND RESPONSE:",
                    error.response?.data
                );

            }
        };

        getSchedules();

    }, [selectedDoctor]);

    // =========================================
    // HANDLE CHANGE
    // =========================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // =========================================
    // HANDLE DOCTOR CHANGE
    // =========================================

    const handleDoctorChange = (e) => {

        setSelectedDoctor(
            e.target.value
        );

        setFormData({
            ...formData,
            appointment_time: "",
        });

    };

    // =========================================
    // HANDLE SCHEDULE CHANGE
    // =========================================

    const handleScheduleChange = (e) => {

        const scheduleId =
            e.target.value;

        setSelectedSchedule(
            scheduleId
        );

        const selectedScheduleData =
            schedules.find(
                (schedule) =>
                    Number(schedule.id) ===
                    Number(scheduleId)
            );

        if (selectedScheduleData) {

            setFormData({
                ...formData,
                appointment_time:
                    selectedScheduleData.start_time,
            });

        }

    };

    // =========================================
    // BOOK APPOINTMENT
    // =========================================

    const handleBookAppointment = async (e) => {

        e.preventDefault();

        // =========================================
        // FIRST: CHECK LOGIN
        // =========================================

        if (!user || !token) {

            /*
            Save the page that the user
            wanted to return to.
            */

            localStorage.setItem(
                "redirectAfterLogin",
                "/Contact"
            );

            alert(
                "Please login first to book an appointment."
            );

            navigate("/Login");

            return;
        }

        // =========================================
        // CHECK DOCTOR
        // =========================================

        // if (!selectedDoctor) {

        //     alert(
        //         "Please select a doctor."
        //     );

        //     return;
        // }

        // =========================================
        // CHECK SCHEDULE
        // =========================================

        // if (!selectedSchedule) {

        //     alert(
        //         "Please select an available time."
        //     );

        //     return;
        // }

        // =========================================
        // BOOK APPOINTMENT
        // =========================================

        try {

            const appointmentData = {

                /*
                Keep your current Backend exactly
                as it is.

                So we send user.id as patient_id
                because this is what your current
                AppointmentController expects.
                */

                patient_id:
                    user.id,

                doctor_id:
                    selectedDoctor,

                doctor_schedule_id:
                    selectedSchedule,

                appointment_date:
                    formData.appointment_date,

                appointment_time:
                    formData.appointment_time,

                status:
                    "pending",

                notes:
                    formData.notes,
            };

            console.log(
                "APPOINTMENT DATA:",
                appointmentData
            );

            const response =
                await axios.post(
                    `${API_URL}/appointments`,
                    appointmentData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`,
                            Accept:
                                "application/json",
                        },
                    }
                );

            console.log(
                "APPOINTMENT CREATED:",
                response.data
            );

            alert(
                "Appointment booked successfully."
            );

            // =========================================
            // RESET FORM
            // =========================================

            setFormData({
                appointment_date: "",
                appointment_time: "",
                notes: "",
            });

            setSelectedDoctor("");

            setSelectedSchedule("");

            setSchedules([]);

        } catch (error) {

            console.log(
                "BOOK APPOINTMENT ERROR:",
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

            console.log(
                "VALIDATION ERRORS:",
                JSON.stringify(
                    error.response?.data?.errors,
                    null,
                    2
                )
            );

            alert(
                error.response?.data?.message ||
                "Booking appointment failed."
            );
        }
    };

    // =========================================
    // CANCEL APPOINTMENT
    // =========================================

    const handleCancelAppointment = async () => {

        if (!user || !token) {

            localStorage.setItem(
                "redirectAfterLogin",
                "/Contact"
            );

            alert(
                "Please login first."
            );

            navigate("/Login");

            return;
        }

        const appointmentId =
            window.prompt(
                "Enter Appointment ID to cancel:"
            );

        if (!appointmentId) {

            return;
        }

        const confirmCancel =
            window.confirm(
                "Are you sure you want to cancel this appointment?"
            );

        if (!confirmCancel) {

            return;
        }

        try {

            const response =
                await axios.put(
                    `${API_URL}/appointments/${appointmentId}`,
                    {
                        status: "cancelled",
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`,
                            Accept:
                                "application/json",
                        },
                    }
                );

            console.log(
                "APPOINTMENT CANCELLED:",
                response.data
            );

            alert(
                "Appointment cancelled successfully."
            );

        } catch (error) {

            console.log(
                "CANCEL APPOINTMENT ERROR:",
                error
            );

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "BACKEND RESPONSE:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Cancel appointment failed."
            );
        }
    };

    return (
        <div>

            <Navbar />

            {/* =========================================
                START APPOINTMENT CONTACT SECTION
            ========================================= */}

            <section className="appointment-contact">

                <div className="container pl-5 pr-5">

                    <div className="row">

                        <div className="col-md-12">

                            <h3 className="mb-3">

                                <span>

                                    <i
                                        className="fa-solid fa-calendar-days fa-lg"
                                        style={{
                                            color:
                                                "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                </span>

                                Book AN Appointment

                            </h3>

                            <form
                                id="fromappointment"
                                onSubmit={
                                    handleBookAppointment
                                }
                            >

                                {/* PATIENT NAME */}

                                <input
                                    type="text"
                                    name="patient"
                                    placeholder="Enter Your Name"
                                    className="form-control mb-2 rounded-3 input-name"
                                    value={
                                        user
                                            ? `${user.first_name || ""} ${user.last_name || ""}`
                                            : ""
                                    }
                                    readOnly
                                    required
                                />

                                {/* EMAIL */}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control mb-2 rounded-3 input-email"
                                    value={
                                        user?.email || ""
                                    }
                                    readOnly
                                    required
                                />

                                {/* PHONE */}

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    className="form-control mb-2 rounded-3 input-phone"
                                    value={
                                        user?.phone || ""
                                    }
                                    readOnly
                                    required
                                />

                                {/* DATE */}

                                <input
                                    type="date"
                                    name="appointment_date"
                                    className="p-1"
                                    value={
                                        formData.appointment_date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                                <br />

                                {/* DOCTOR */}



                                <select
                                    name="doctor"
                                    id="doctor"
                                    value={selectedDoctor}
                                    onChange={handleDoctorChange}
                                    disabled
                                >
                                    <option value="">
                                        Select Doctor
                                    </option>
                                </select>


                                {/* <select
                                    name="doctor"
                                    id="doctor"
                                    value={selectedDoctor}
                                    onChange={handleDoctorChange}
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Select Doctor
                                    </option>

                                    {doctors.map(
                                        (doctor) => (
                                            <option
                                                key={doctor.id}
                                                value={doctor.id}
                                            >
                                                Dr.{" "}

                                                {doctor.first_name ||
                                                    doctor.user?.first_name ||
                                                    ""}{" "}

                                                {doctor.last_name ||
                                                    doctor.user?.last_name ||
                                                    ""}

                                                {doctor.specialization
                                                    ? ` - ${doctor.specialization}`
                                                    : ""}
                                            </option>
                                        )
                                    )}
                                </select> */}

                                <br />

                                {/* AVAILABLE TIME */}

                                <select
                                    name="time"
                                    value={selectedSchedule}
                                    onChange={handleScheduleChange}
                                    disabled={!selectedDoctor}
                                    required
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Available Time
                                    </option>

                                    {schedules.map(
                                        (schedule) => (
                                            <option
                                                key={schedule.id}
                                                value={schedule.id}
                                            >
                                                {schedule.start_time}
                                                {" - "}
                                                {schedule.end_time}
                                            </option>
                                        )
                                    )}
                                </select>

                                <br />
                                {/* PAYMENT */}

                                <select
                                    name="payment"
                                    id="payment"
                                    required
                                >

                                    <option
                                        value=""
                                        disabled
                                    >
                                        Payment
                                    </option>

                                    <option value="credit">
                                        Credit
                                    </option>

                                    <option value="Cash">
                                        Cash
                                    </option>

                                </select>

                                <br />

                                {/* MESSAGE */}

                                <textarea
                                    name="notes"
                                    cols="15"
                                    rows="2"
                                    placeholder="message"
                                    className="mt-2"
                                    value={
                                        formData.notes
                                    }
                                    onChange={
                                        handleChange
                                    }
                                ></textarea>

                                <br />

                                {/* BOOK BUTTON */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-50 p-2"
                                >

                                    Book An Appointment

                                </button>

                                <br />

                                {/* CANCEL BUTTON */}

                                <button
                                    type="button"
                                    className="btn btn-dark  w-50 p-2 mt-3"
                                    onClick={
                                        handleCancelAppointment
                                    }
                                >

                                    Cancel An Appointment

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

            {/* =========================================
                START CALL CONTACT SECTION
            ========================================= */}

            <section className="call-contact">

                <div className="container pl-5 pr-5">

                    <div className="row">

                        <div className="col-md-6 text-start d-flex flex-column align-items-start">

                            <div className="mb-5">

                                <h2>
                                    ADDRESS
                                </h2>

                                <p>

                                    <i
                                        className="fa-solid fa-location-dot"
                                        style={{
                                            color:
                                                "rgb(59, 167, 255)"
                                        }}
                                    ></i>

                                    El Gomhoureya Street,
                                    Mansoura, Dakahlia,
                                    Egypt 60

                                </p>

                                <p>

                                    <i
                                        className="fa-solid fa-phone"
                                        style={{
                                            color:
                                                "rgb(59, 167, 255)"
                                        }}
                                    ></i>

                                    Phone: 123456789

                                </p>

                                <p>

                                    <i
                                        className="fa-regular fa-envelope"
                                        style={{
                                            color:
                                                "rgb(59, 167, 255)"
                                        }}
                                    ></i>

                                    Support@foodlover.com

                                </p>

                            </div>

                            <div className="mb-5">

                                <h2>
                                    WORKING HOURS
                                </h2>

                                <p>

                                    7.00 am to 12.00 am on Weekday

                                    <br />

                                    10.00 am to 1.00 am on Weekend

                                </p>

                            </div>

                            <div className="mb-5">

                                <h2>
                                    FOLLOW US
                                </h2>

                                <div className="icons">

                                    <a
                                        href="https://www.facebook.com/MansouraUniversityOfficial"
                                        className="bg-info rounded-pill p-1 m-1"
                                    >

                                        <i
                                            className="fa-brands fa-facebook-f"
                                            style={{
                                                color:
                                                    "rgb(235, 244, 250)"
                                            }}
                                        ></i>

                                    </a>

                                    <a
                                        href="https://twitter.com/Mansoura_un"
                                        className="bg-info rounded-pill p-1 m-1"
                                    >

                                        <i
                                            className="fa-brands fa-twitter"
                                            style={{
                                                color:
                                                    "rgb(235, 244, 250)"
                                            }}
                                        ></i>

                                    </a>

                                    <a
                                        href="https://www.instagram.com/mansourauniversityofficial"
                                        className="bg-info rounded-pill p-1 m-1"
                                    >

                                        <i
                                            className="fa-brands fa-instagram"
                                            style={{
                                                color:
                                                    "rgb(235, 244, 250)"
                                            }}
                                        ></i>

                                    </a>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mt-3">

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.361127448946!2d31.361261274994984!3d31.044044774435577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79dd0441cbe8f%3A0x3a28297de7005a5!2sMansoura%20University%20Hospitals!5e0!3m2!1sen!2seg!4v1787075141168!5m2!1sen!2seg"
                                width="100%"
                                height="450"
                                style={{
                                    border: 0
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Contact;