import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Doctors.css";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const API_URL = "http://127.0.0.1:8000";

    // =========================================
    // IMAGE URL
    // =========================================

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

    // =========================================
    // GET DOCTORS
    // =========================================

    useEffect(() => {
        const getDoctors = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");

                const config = token
                    ? {
                          headers: {
                              Authorization: `Bearer ${token}`,
                              Accept: "application/json",
                          },
                      }
                    : {
                          headers: {
                              Accept: "application/json",
                          },
                      };

                // =========================================
                // 1. DOCTORS API
                // ده الأساس لأنه شغال مع Patient
                // =========================================

                const doctorsResponse = await axios.get(
                    `${API_URL}/api/doctors`,
                    config
                );

                console.log(
                    "DOCTORS API:",
                    doctorsResponse.data
                );

                const doctorRecords =
                    doctorsResponse.data.data ||
                    doctorsResponse.data ||
                    [];

                console.log(
                    "DOCTOR RECORDS:",
                    doctorRecords
                );

                // =========================================
                // 2. USERS API
                // نحاول نجيبها، لكن لو Patient مش مسموح له
                // مش هنوقف الصفحة
                // =========================================

                let users = [];

                try {
                    const usersResponse = await axios.get(
                        `${API_URL}/api/users`,
                        config
                    );

                    console.log(
                        "USERS API:",
                        usersResponse.data
                    );

                    users =
                        usersResponse.data.data ||
                        usersResponse.data ||
                        [];

                    console.log(
                        "USERS:",
                        users
                    );
                } catch (userError) {
                    console.log(
                        "USERS API NOT AVAILABLE FOR THIS USER"
                    );

                    console.log(
                        "USERS STATUS:",
                        userError.response?.status
                    );

                    console.log(
                        "USERS RESPONSE:",
                        userError.response?.data
                    );

                    // مهم جدًا:
                    // مش هنوقف الصفحة لو /api/users
                    // مش متاح للـ Patient
                    users = [];
                }

                // =========================================
                // 3. FORMAT DOCTORS
                // =========================================

                const formattedDoctors = doctorRecords.map(
                    (doctor) => {

                        // -----------------------------------------
                        // نحاول نجيب الـ User المرتبط بالدكتور
                        // -----------------------------------------

                        const user = users.find(
                            (item) =>
                                Number(item.id) ===
                                Number(doctor.user_id)
                        );

                        // -----------------------------------------
                        // الاسم:
                        //
                        // الأول من users لو موجود
                        // وبعد كده نجرب أي اسم موجود داخل doctor
                        // -----------------------------------------

                        const firstName =
                            user?.first_name ||
                            doctor.first_name ||
                            doctor.user?.first_name ||
                            "";

                        const lastName =
                            user?.last_name ||
                            doctor.last_name ||
                            doctor.user?.last_name ||
                            "";

                        // -----------------------------------------
                        // الصورة
                        // -----------------------------------------

                        const profileImage =
                            user?.profile_image ||
                            doctor.profile_image ||
                            doctor.user?.profile_image ||
                            "";

                        // -----------------------------------------
                        // IMPORTANT
                        //
                        // id هنا Doctor ID
                        // doctor_id برضه Doctor ID
                        // user_id هو User ID
                        // -----------------------------------------

                        return {
                            id: doctor.id,

                            doctor_id: doctor.id,

                            user_id: doctor.user_id,

                            first_name: firstName,

                            last_name: lastName,

                            profile_image: profileImage,

                            specialization:
                                doctor.specialization || "",

                            qualification:
                                doctor.qualification || "",

                            experience_years:
                                doctor.experience_years || "",

                            consultation_fee:
                                doctor.consultation_fee || "",

                            bio:
                                doctor.bio || "",

                            license_number:
                                doctor.license_number || "",

                            doctor_status:
                                doctor.status,
                        };
                    }
                );

                console.log(
                    "FORMATTED DOCTORS:",
                    formattedDoctors
                );

                setDoctors(formattedDoctors);

            } catch (error) {
                console.error(
                    "GET PUBLIC DOCTORS ERROR:",
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

                setDoctors([]);

            } finally {
                setLoading(false);
            }
        };

        getDoctors();
    }, []);

    // =========================================
    // SEARCH
    // =========================================

    const filteredDoctors = doctors.filter(
        (doctor) => {

            const fullName =
                `${doctor.first_name || ""} ${
                    doctor.last_name || ""
                }`
                    .toLowerCase()
                    .trim();

            const specialization =
                doctor.specialization
                    ?.toLowerCase() || "";

            const searchValue =
                search
                    .toLowerCase()
                    .trim();

            return (
                fullName.includes(searchValue) ||
                specialization.includes(searchValue)
            );
        }
    );

    // =========================================
    // UI
    // =========================================

    return (
        <div>

            <Navbar />

            <section className="search-doctors">

                <div className="container">

                    <div className="row">

                        <div className="col-md-12">

                            <div className="d-flex align-items-center justify-content-center">

                                <i className="fas fa-search mr-2"></i>

                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search for a doctor..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    <div
                        className="row mt-5"
                        id="itemList"
                    >

                        {loading ? (

                            <div className="col-md-12 text-center">

                                <p>
                                    Loading doctors...
                                </p>

                            </div>

                        ) : filteredDoctors.length > 0 ? (

                            filteredDoctors.map(
                                (doctor) => (

                                    <div
                                        className="col-md-4 mb-4 d-flex"
                                        key={doctor.doctor_id}
                                    >

                                        <div className="doctor text-center">

                                            {/* IMAGE */}

                                            {doctor.profile_image ? (

                                                <img
                                                    src={getImageUrl(
                                                        doctor.profile_image
                                                    )}
                                                    alt={`Dr. ${
                                                        doctor.first_name
                                                    } ${
                                                        doctor.last_name
                                                    }`}
                                                />

                                            ) : (

                                                <div className="no-image">
                                                    No Image
                                                </div>

                                            )}

                                            {/* NAME */}

                                            <h3>

                                                Dr.{" "}

                                                {
                                                    doctor.first_name
                                                }{" "}

                                                {
                                                    doctor.last_name
                                                }

                                            </h3>

                                            {/* SPECIALIZATION */}

                                            <h6>

                                                {
                                                    doctor.specialization ||
                                                    "Doctor"
                                                }

                                            </h6>

                                            {/* DETAILS */}

                                            <Link
                                                to={`/Details/${doctor.user_id}`}
                                                className="btn btn-primary rounded-pill"
                                            >
                                                Details
                                            </Link>

                                        </div>

                                    </div>

                                )
                            )

                        ) : (

                            <div className="col-md-12 text-center">

                                <p>
                                    No doctors found.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Doctors;