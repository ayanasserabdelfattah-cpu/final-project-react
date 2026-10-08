import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Details.css";

function Details() {

    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://127.0.0.1:8000";

    // Get Image URL
    const getImageUrl = (imagePath) => {

        if (!imagePath) return "";

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {
            return imagePath;
        }

        if (imagePath.startsWith("/storage/")) {
            return `${API_URL}${imagePath}`;
        }

        if (imagePath.startsWith("storage/")) {
            return `${API_URL}/${imagePath}`;
        }

        return `${API_URL}/storage/${imagePath}`;
    };


    // Get Doctor Details
    useEffect(() => {

        const getDoctor = async () => {

            try {

                setLoading(true);

                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };


                // Get Users
                const usersResponse = await axios.get(
                    `${API_URL}/api/users`,
                    config
                );


                // Get Doctors
                const doctorsResponse = await axios.get(
                    `${API_URL}/api/doctors`,
                    config
                );


                console.log(
                    "DETAILS USERS:",
                    usersResponse.data
                );

                console.log(
                    "DETAILS DOCTORS:",
                    doctorsResponse.data
                );


                const users =
                    usersResponse.data.data ||
                    usersResponse.data ||
                    [];


                const doctorRecords =
                    doctorsResponse.data.data ||
                    doctorsResponse.data ||
                    [];


                // Find User
                const user = users.find(
                    (item) =>
                        Number(item.id) === Number(id)
                );


                if (!user) {

                    console.log(
                        "DOCTOR USER NOT FOUND"
                    );

                    setDoctor(null);

                    return;
                }


                // Find Doctor Record
                const doctorRecord =
                    doctorRecords.find(
                        (item) =>
                            Number(item.user_id) ===
                            Number(user.id)
                    );


                if (!doctorRecord) {

                    console.log(
                        "DOCTOR RECORD NOT FOUND"
                    );

                    setDoctor(null);

                    return;
                }


                console.log(
                    "FOUND DOCTOR RECORD:",
                    doctorRecord
                );


                console.log(
                    "DOCTOR IMAGE:",
                    doctorRecord.profile_image
                );


                // Combine User + Doctor
                const doctorData = {

                    ...user,

                    // Doctor ID
                    doctor_id:
                        doctorRecord.id || null,

                    // Image comes from doctors table
                    profile_image:
                        doctorRecord.profile_image || "",

                    // Doctor Information
                    specialization:
                        doctorRecord.specialization || "",

                    qualification:
                        doctorRecord.qualification || "",

                    experience_years:
                        doctorRecord.experience_years ?? "",

                    consultation_fee:
                        doctorRecord.consultation_fee ?? "",

                    bio:
                        doctorRecord.bio || "",

                    license_number:
                        doctorRecord.license_number || "",

                    doctor_status:
                        doctorRecord.status ??
                        user.status,
                };


                console.log(
                    "FINAL DETAILS DOCTOR:",
                    doctorData
                );


                setDoctor(doctorData);


            } catch (error) {

                console.error(
                    "GET DOCTOR DETAILS ERROR:",
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

            } finally {

                setLoading(false);

            }

        };


        getDoctor();

    }, [id]);


    // Loading
    if (loading) {

        return (

            <div>

                <Navbar />

                <section className="details-home">

                    <div className="container text-center">

                        <h4>
                            Loading doctor details...
                        </h4>

                    </div>

                </section>

            </div>

        );
    }


    // Doctor Not Found
    if (!doctor) {

        return (

            <div>

                <Navbar />

                <section className="details-home">

                    <div className="container text-center">

                        <h4>
                            Doctor not found
                        </h4>

                        <Link
                            to="/Doctors"
                            className="btn btn-dark rounded-pill mt-3"
                        >
                            Back
                        </Link>

                    </div>

                </section>

            </div>

        );
    }


    return (

        <div>

            <Navbar />

            <section className="details-home">

                <div className="container pl-5 pr-5">

                    <div className="row">


                        {/* Doctor Image */}

                        <div className="col-md-6">

                            {doctor.profile_image ? (

                                <img
                                    src={getImageUrl(
                                        doctor.profile_image
                                    )}
                                    className="img-fluid mb-4 rounded-5"
                                    alt={`${doctor.first_name} ${doctor.last_name}`}
                                />

                            ) : (

                                <div className="details-no-image">
                                    No Image
                                </div>

                            )}

                        </div>


                        {/* Doctor Information */}

                        <div className="col-md-6">

                            <div
                                className="doctor-info d-flex flex-column align-items-start justify-content-center text-center mt-5"
                            >


                                {/* Doctor ID */}

                                <div className="d-flex">

                                    <i
                                        className="fa-solid fa-id-card-clip fa-lg mt-1 mr-2"
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                    <h5 className="mb-4">

                                        Doctor ID:

                                        <span className="doctor-id ml-2">

                                            {
                                                doctor.doctor_id ||
                                                doctor.id
                                            }

                                        </span>

                                    </h5>

                                </div>


                                {/* Name */}

                                <div className="d-flex">

                                    <i
                                        className="fa-solid fa-user fa-lg mr-1"
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                    <h5 className="mb-4">

                                        Name:

                                        <span className="doctor-Name ml-2">

                                            Dr.{" "}
                                            {doctor.first_name}{" "}
                                            {doctor.last_name}

                                        </span>

                                    </h5>

                                </div>


                                {/* Specialization */}

                                <div className="d-flex">

                                    <i
                                        className="fa-solid fa-stethoscope fa-lg mr-1"
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                    <h5 className="mb-4">

                                        Specialization:

                                        <span className="doctor-specialization ml-2">

                                            {
                                                doctor.specialization ||
                                                "Not Available"
                                            }

                                        </span>

                                    </h5>

                                </div>


                                {/* Experience */}

                                <div className="d-flex">

                                    <i
                                        className="fa-solid fa-syringe fa-lg mr-1"
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                    <h5 className="mb-4">

                                        Experience:

                                        <span className="doctor-experience ml-2">

                                            {
                                                doctor.experience_years ||
                                                "Not Available"
                                            }

                                            {
                                                doctor.experience_years
                                                    ? " years"
                                                    : ""
                                            }

                                        </span>

                                    </h5>

                                </div>


                                {/* Qualification */}

                                <div className="d-flex">

                                    <i
                                        className="fa-solid fa-graduation-cap fa-lg mr-1"
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                    <h5 className="mb-4">

                                        Qualification:

                                        <span className="doctor-qualification ml-2">

                                            {
                                                doctor.qualification ||
                                                "Not Available"
                                            }

                                        </span>

                                    </h5>

                                </div>


                                {/* Bio */}

                                <div className="d-flex ">

                                    <i
                                        className="fa-solid fa-file-lines fa-lg  "
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>


                                    <h5 className="mb-2">
                                        Bio:


                                        <span className="doctor-bio  ml-2">

                                            {
                                                doctor.bio ||
                                                "Not Available"
                                            }

                                        </span>

                                    </h5>



                                </div>


                                {/* Fees */}

                                <div className="d-flex">

                                    <i
                                        className="fa-solid fa-money-check-dollar fa-lg mr-1"
                                        style={{
                                            color: "rgb(116, 192, 252)"
                                        }}
                                    ></i>

                                    <h5 className="mb-4">

                                        Fees:

                                        <span className="doctor-fees ml-2">

                                            {
                                                doctor.consultation_fee
                                                    ? `${doctor.consultation_fee}$`
                                                    : "Not Available"
                                            }

                                        </span>

                                    </h5>

                                </div>


                                {/* Appointment */}

                                <Link
                                    to={`/Contact?doctor=${doctor.doctor_id}`}
                                    className="btn btn-primary rounded-pill"
                                >
                                    Appointment
                                </Link>

                                {/* Back */}

                                <Link
                                    to="/Doctors"
                                    className="btn btn-dark rounded-pill mt-4"
                                >
                                    Back
                                </Link>


                            </div>

                        </div>

                    </div>


                    {/* Available Appointments */}

                    <div className="row mt-5">

                        <div className="col-md-12">

                            <div className="d-flex align-items-center justify-content-center">

                                <i
                                    className="fa-regular fa-calendar-days fa-lg mb-2 mr-2"
                                    style={{
                                        color: "rgb(116, 192, 252)"
                                    }}
                                ></i>

                                <h4>
                                    Available Appointments
                                </h4>

                            </div>


                            <table className="table table-striped table-light">

                                <thead>

                                    <tr>

                                        <th scope="col">
                                            Day
                                        </th>

                                        <th scope="col">
                                            From
                                        </th>

                                        <th scope="col">
                                            To
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    <tr>

                                        <td>
                                            Saturday
                                        </td>

                                        <td>
                                            07:00 AM
                                        </td>

                                        <td>
                                            09:00 PM
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            Monday
                                        </td>

                                        <td>
                                            02:00 PM
                                        </td>

                                        <td>
                                            07:00 PM
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            Wednesday
                                        </td>

                                        <td>
                                            12:00 PM
                                        </td>

                                        <td>
                                            11:00 PM
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Details;