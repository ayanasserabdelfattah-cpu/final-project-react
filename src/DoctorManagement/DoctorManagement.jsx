import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { Link } from "react-router-dom";
import "./DoctorManagement.css";

function DoctorManagement() {
    const [doctors, setDoctors] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",

        profile_image: null,

        license_number: "",
        qualification: "",
        specialization: "",
        experience_years: "",
        bio: "",
        consultation_fee: "",

        status: "1",
    });

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const API_URL = "http://127.0.0.1:8000";

    // =========================================
    // IMAGE URL
    // =========================================

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return "";
        }

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
                const usersResponse = await axios.get(
                    `${API_URL}/api/users`,
                    config
                );

                const doctorsResponse = await axios.get(
                    `${API_URL}/api/doctors`,
                    config
                );

                const users =
                    usersResponse.data.data ||
                    usersResponse.data ||
                    [];

                const doctorRecords =
                    doctorsResponse.data.data ||
                    doctorsResponse.data ||
                    [];

                console.log(
                    "USERS API DATA:",
                    users
                );

                console.log(
                    "DOCTORS API DATA:",
                    doctorRecords
                );

                // Users whose role is Doctor
                const doctorUsers = users.filter(
                    (user) => Number(user.role_id) === 2
                );

                console.log(
                    "DOCTOR USERS:",
                    doctorUsers
                );

                // Combine User + Doctor data
                const combinedDoctors = doctorUsers.map(
                    (user) => {
                        const doctor = doctorRecords.find(
                            (item) =>
                                Number(item.user_id) ===
                                Number(user.id)
                        );

                        return {
                            ...user,

                            doctor_id:
                                doctor?.id || null,

                            license_number:
                                doctor?.license_number || "",

                            qualification:
                                doctor?.qualification || "",

                            specialization:
                                doctor?.specialization || "",

                            experience_years:
                                doctor?.experience_years ?? "",

                            bio:
                                doctor?.bio || "",

                            consultation_fee:
                                doctor?.consultation_fee ?? "",

                            doctor_status:
                                doctor?.status ??
                                user.status,
                        };
                    }
                );

                setDoctors(combinedDoctors);

                console.log(
                    "GET DOCTORS SUCCESS:",
                    combinedDoctors
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
                    JSON.stringify(
                        error.response?.data,
                        null,
                        2
                    )
                );
            }
        };

        getDoctors();
    }, [refresh]);

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
    // HANDLE IMAGE CHANGE
    // =========================================

    const handleImageChange = (e) => {
        const file = e.target.files[0] || null;

        setFormData({
            ...formData,
            profile_image: file,
        });
    };

    // =========================================
    // RESET FORM
    // =========================================

    const resetForm = () => {
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",

            profile_image: null,

            license_number: "",
            qualification: "",
            specialization: "",
            experience_years: "",
            bio: "",
            consultation_fee: "",

            status: "1",
        });

        setEditingId(null);
    };

    // =========================================
    // OPEN CREATE FORM
    // =========================================

    const openCreateForm = () => {
        resetForm();
        setShowForm(true);
    };

    // =========================================
    // CLOSE FORM
    // =========================================

    const closeForm = () => {
        resetForm();
        setShowForm(false);
    };

    // =========================================
    // CREATE DOCTOR
    // =========================================

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            // =====================================
            // STEP 1
            // CREATE USER
            // =====================================

            const userData = new FormData();

            userData.append(
                "first_name",
                formData.first_name
            );

            userData.append(
                "last_name",
                formData.last_name
            );

            userData.append(
                "email",
                formData.email
            );

            userData.append(
                "phone",
                formData.phone
            );

            userData.append(
                "password",
                formData.password
            );

            userData.append(
                "role_id",
                "2"
            );

            if (formData.profile_image) {
                userData.append(
                    "profile_image",
                    formData.profile_image
                );
            }

            console.log(
                "PROFILE IMAGE:",
                formData.profile_image
            );

            const userResponse = await axios.post(
                `${API_URL}/api/users`,
                userData,
                config
            );

            console.log(
                "USER CREATED:",
                userResponse.data
            );

            // =====================================
            // GET NEW USER ID
            // =====================================

            const newUser =
                userResponse.data.user ||
                userResponse.data.data;

            const newUserId =
                newUser?.id;

            console.log(
                "NEW USER ID:",
                newUserId
            );

            if (!newUserId) {
                throw new Error(
                    "User was created but User ID was not returned."
                );
            }

            // =====================================
            // STEP 2
            // GET DOCTORS
            // =====================================

            const doctorsResponse =
                await axios.get(
                    `${API_URL}/api/doctors`,
                    config
                );

            const doctorRecords =
                doctorsResponse.data.data ||
                doctorsResponse.data ||
                [];

            console.log(
                "DOCTORS AFTER USER CREATION:",
                doctorRecords
            );

            // =====================================
            // FIND AUTO-CREATED DOCTOR
            // =====================================

            const newDoctor =
                doctorRecords.find(
                    (doctor) =>
                        Number(doctor.user_id) ===
                        Number(newUserId)
                );

            console.log(
                "NEW AUTO CREATED DOCTOR:",
                newDoctor
            );

            if (!newDoctor) {
                throw new Error(
                    "User was created, but the Doctor record was not created automatically."
                );
            }

            // =====================================
            // STEP 3
            // UPDATE DOCTOR
            // =====================================

            const doctorData = {
                user_id: newUserId,

                license_number:
                    formData.license_number,

                qualification:
                    formData.qualification,

                specialization:
                    formData.specialization,

                experience_years:
                    Number(
                        formData.experience_years
                    ),

                bio:
                    formData.bio,

                consultation_fee:
                    Number(
                        formData.consultation_fee
                    ),

                status:
                    Number(formData.status),
            };

            console.log(
                "DOCTOR DATA:",
                doctorData
            );

            await axios.put(
                `${API_URL}/api/doctors/${newDoctor.id}`,
                doctorData,
                config
            );

            alert(
                "Doctor created successfully"
            );

            closeForm();

            setRefresh(
                (item) => item + 1
            );

        } catch (error) {
            console.log(
                "CREATE DOCTOR ERROR:",
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
                    error.response?.data?.errors ||
                    error.response?.data?.data,
                    null,
                    2
                )
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Create Doctor failed. Check Console."
            );
        }
    };

    // =========================================
    // EDIT DOCTOR
    // =========================================

    const handleEdit = (doctor) => {
        setEditingId(doctor.id);

        setFormData({
            first_name:
                doctor.first_name || "",

            last_name:
                doctor.last_name || "",

            email:
                doctor.email || "",

            phone:
                doctor.phone || "",

            password: "",

            // New image is optional during edit
            profile_image: null,

            license_number:
                doctor.license_number || "",

            qualification:
                doctor.qualification || "",

            specialization:
                doctor.specialization || "",

            experience_years:
                doctor.experience_years ?? "",

            bio:
                doctor.bio || "",

            consultation_fee:
                doctor.consultation_fee ?? "",

            status:
                String(
                    doctor.doctor_status ??
                    doctor.status ??
                    "1"
                ),
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================
    // UPDATE DOCTOR
    // =========================================

    const handleUpdate = async (e) => {
        e.preventDefault();

        const doctor = doctors.find(
            (item) =>
                Number(item.id) ===
                Number(editingId)
        );

        if (!doctor) {
            alert(
                "Doctor data not found."
            );
            return;
        }

        try {
            // =====================================
            // STEP 1
            // UPDATE USER
            // =====================================

            const userData = new FormData();

            userData.append(
                "first_name",
                formData.first_name
            );

            userData.append(
                "last_name",
                formData.last_name
            );

            userData.append(
                "email",
                formData.email
            );

            userData.append(
                "phone",
                formData.phone
            );

            userData.append(
                "role_id",
                "2"
            );

            if (
                formData.password.trim() !== ""
            ) {
                userData.append(
                    "password",
                    formData.password
                );
            }

            if (formData.profile_image) {
                userData.append(
                    "profile_image",
                    formData.profile_image
                );
            }

            // Laravel method spoofing
            userData.append(
                "_method",
                "PUT"
            );

            console.log(
                "PROFILE IMAGE UPDATE:",
                formData.profile_image
            );

            await axios.post(
                `${API_URL}/api/users/${editingId}`,
                userData,
                config
            );

            // =====================================
            // STEP 2
            // UPDATE DOCTOR
            // =====================================

            if (doctor.doctor_id) {
                const doctorData = {
                    user_id:
                        doctor.id,

                    license_number:
                        formData.license_number,

                    qualification:
                        formData.qualification,

                    specialization:
                        formData.specialization,

                    experience_years:
                        Number(
                            formData.experience_years
                        ),

                    bio:
                        formData.bio,

                    consultation_fee:
                        Number(
                            formData.consultation_fee
                        ),

                    status:
                        Number(formData.status),
                };

                console.log(
                    "DOCTOR UPDATE DATA:",
                    doctorData
                );

                await axios.put(
                    `${API_URL}/api/doctors/${doctor.doctor_id}`,
                    doctorData,
                    config
                );
            }

            alert(
                "Doctor updated successfully"
            );

            closeForm();

            setRefresh(
                (item) => item + 1
            );

        } catch (error) {
            console.log(
                "UPDATE DOCTOR ERROR:",
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
                    error.response?.data?.errors ||
                    error.response?.data?.data,
                    null,
                    2
                )
            );

            alert(
                error.response?.data?.message ||
                "Update Doctor failed. Check Console."
            );
        }
    };

    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit = (e) => {
        if (editingId === null) {
            handleCreate(e);
        } else {
            handleUpdate(e);
        }
    };

    // =========================================
    // DELETE DOCTOR
    // =========================================

    const handleDelete = async (doctor) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this doctor?"
            );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/api/users/${doctor.id}`,
                config
            );

            alert(
                "Doctor deleted successfully"
            );

            setRefresh(
                (item) => item + 1
            );

        } catch (error) {
            console.log(
                "DELETE DOCTOR ERROR:",
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

            alert(
                error.response?.data?.message ||
                "Delete Doctor failed. Check Console."
            );
        }
    };

    return (
        <div>

            <NavbarDashboard />

            <section className="doctor-management">

                <div className="container">

                    {/* =================================
                        PAGE HEADER
                    ================================= */}

                    <div className="doctor-page-header">

                        <div className="doctor-page-title">

                            <div className="doctor-icon">

                                <i className="fa-solid fa-user-doctor"></i>

                            </div>

                            <div>

                                <h2>
                                    Doctor Management
                                </h2>

                                <p>
                                    Manage doctors and their information
                                </p>

                            </div>

                        </div>

                        <div className="doctor-header-actions">

                            <button
                                type="button"
                                className="create-doctor-btn"
                                onClick={openCreateForm}
                            >

                                <i className="fa-solid fa-plus"></i>

                                Create New Doctor

                            </button>

                            <Link
                                to="/AdminDashboard"
                                className="btn btn-dark"
                            >

                                <i className="fa-solid fa-arrow-left mr-2"></i>

                                Go back

                            </Link>

                        </div>

                    </div>


                    {/* =================================
                        FORM
                    ================================= */}

                    {showForm && (

                        <div className="doctor-form-section">

                            <div className="doctor-form-header">

                                <div>

                                    <h3>

                                        {editingId === null
                                            ? "Create New Doctor"
                                            : "Edit Doctor"}

                                    </h3>

                                    <p>

                                        {editingId === null
                                            ? "Add doctor account and professional information"
                                            : "Update doctor account and professional information"}

                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="form-close-btn"
                                    onClick={closeForm}
                                >

                                    <i className="fa-solid fa-xmark"></i>

                                </button>

                            </div>


                            <form onSubmit={handleSubmit}>

                                {/* =================================
                                    ACCOUNT INFORMATION
                                ================================= */}

                                <h4 className="doctor-form-subtitle">
                                    Account Information
                                </h4>

                                <div className="row">

                                    {/* First Name */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                value={
                                                    formData.first_name
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Last Name */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                value={
                                                    formData.last_name
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Email */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={
                                                    formData.email
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Phone */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Phone
                                            </label>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                value={
                                                    formData.phone
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Password */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>

                                                {editingId === null
                                                    ? "Password"
                                                    : "New Password"}

                                            </label>

                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={
                                                    formData.password
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required={
                                                    editingId === null
                                                }
                                                placeholder={
                                                    editingId !== null
                                                        ? "Leave empty if unchanged"
                                                        : ""
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* Profile Image */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Profile Image
                                            </label>

                                            <input
                                                type="file"
                                                name="profile_image"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={
                                                    handleImageChange
                                                }
                                                required={
                                                    editingId === null
                                                }
                                            />

                                            {editingId !== null &&
                                                formData.profile_image === null &&
                                                doctors.find(
                                                    (item) =>
                                                        Number(item.id) ===
                                                        Number(editingId)
                                                )?.profile_image && (
                                                    <img
                                                        src={getImageUrl(
                                                            doctors.find(
                                                                (item) =>
                                                                    Number(item.id) ===
                                                                    Number(editingId)
                                                            )?.profile_image
                                                        )}
                                                        alt="Current Doctor"
                                                        width="70"
                                                        height="70"
                                                        style={{
                                                            objectFit:
                                                                "cover",
                                                            borderRadius:
                                                                "50%",
                                                            marginTop:
                                                                "10px",
                                                        }}
                                                    />
                                                )}

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Status
                                            </label>

                                            <select
                                                name="status"
                                                className="form-control"
                                                value={
                                                    formData.status
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            >

                                                <option value="1">
                                                    Active
                                                </option>

                                                <option value="0">
                                                    Inactive
                                                </option>

                                            </select>

                                        </div>

                                    </div>


                                    {/* Role */}

                                    <div className="col-md-12">

                                        <div className="form-group">

                                            <label>
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value="Doctor"
                                                disabled
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* =================================
                                    PROFESSIONAL INFORMATION
                                ================================= */}

                                <h4 className="doctor-form-subtitle">
                                    Professional Information
                                </h4>

                                <div className="row">

                                    {/* License Number */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                License Number
                                            </label>

                                            <input
                                                type="text"
                                                name="license_number"
                                                className="form-control"
                                                value={
                                                    formData.license_number
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Qualification */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Qualification
                                            </label>

                                            <input
                                                type="text"
                                                name="qualification"
                                                className="form-control"
                                                value={
                                                    formData.qualification
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Specialization */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Specialization
                                            </label>

                                            <input
                                                type="text"
                                                name="specialization"
                                                className="form-control"
                                                value={
                                                    formData.specialization
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Experience */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Experience Years
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                name="experience_years"
                                                className="form-control"
                                                value={
                                                    formData.experience_years
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Consultation Fee */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Consultation Fee
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                name="consultation_fee"
                                                className="form-control"
                                                value={
                                                    formData.consultation_fee
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Bio */}

                                    <div className="col-md-12">

                                        <div className="form-group">

                                            <label>
                                                Bio
                                            </label>

                                            <textarea
                                                name="bio"
                                                className="form-control doctor-bio-input"
                                                value={
                                                    formData.bio
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                rows="4"
                                                placeholder="Write a short description about the doctor..."
                                            ></textarea>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================
                                    BUTTONS
                                ================================= */}

                                <div className="doctor-form-buttons">

                                    <button
                                        type="submit"
                                        className="save-doctor-btn"
                                    >

                                        <i className="fa-solid fa-check"></i>

                                        {editingId === null
                                            ? "Create Doctor"
                                            : "Save Changes"}

                                    </button>

                                    <button
                                        type="button"
                                        className="cancel-doctor-btn"
                                        onClick={closeForm}
                                    >

                                        Cancel

                                    </button>

                                </div>

                            </form>

                        </div>

                    )}


                    {/* =================================
                        DOCTORS TABLE
                    ================================= */}

                    <div className="doctors-section">

                        <div className="doctors-section-header">

                            <div>

                                <h3>

                                    Doctors

                                    <span className="badge badge-primary rounded-3 ml-2">
                                        {doctors.length}
                                    </span>

                                </h3>

                                <p>
                                    All doctors in the system
                                </p>

                            </div>

                        </div>


                        <div className="table-responsive">

                            <table className="table doctor-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Profile Image</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                        <th>Specialization</th>

                                        <th>Experience</th>

                                        <th>Fee</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {doctors.length > 0 ? (

                                        doctors.map(
                                            (doctor) => (

                                                <tr
                                                    key={
                                                        doctor.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            doctor.id
                                                        }
                                                    </td>

                                                    <td>

                                                        {doctor.profile_image ? (

                                                            <img
                                                                src={getImageUrl(
                                                                    doctor.profile_image
                                                                )}
                                                                alt="Doctor"
                                                                width="50"
                                                                height="50"
                                                                style={{
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius:
                                                                        "50%",
                                                                }}
                                                            />

                                                        ) : (

                                                            "No Image"

                                                        )}

                                                    </td>

                                                    <td>

                                                        <strong>

                                                            {
                                                                doctor.first_name
                                                            }{" "}

                                                            {
                                                                doctor.last_name
                                                            }

                                                        </strong>

                                                    </td>

                                                    <td>
                                                        {
                                                            doctor.email
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            doctor.phone
                                                        }
                                                    </td>

                                                    <td>

                                                        <span className="specialization-badge">

                                                            {
                                                                doctor.specialization ||
                                                                "Not specified"
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {
                                                            doctor.experience_years !==
                                                                "" &&
                                                            doctor.experience_years !==
                                                                null
                                                                ? `${doctor.experience_years} Years`
                                                                : "—"
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            doctor.consultation_fee !==
                                                                "" &&
                                                            doctor.consultation_fee !==
                                                                null
                                                                ? `${doctor.consultation_fee} EGP`
                                                                : "—"
                                                        }

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                String(
                                                                    doctor.doctor_status ??
                                                                    doctor.status
                                                                ) === "1"
                                                                    ? "status-badge active"
                                                                    : "status-badge inactive"
                                                            }
                                                        >

                                                            {
                                                                String(
                                                                    doctor.doctor_status ??
                                                                    doctor.status
                                                                ) === "1"
                                                                    ? "Active"
                                                                    : "Inactive"
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className="action-buttons">

                                                            <button
                                                                type="button"
                                                                className="edit-btn"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        doctor
                                                                    )
                                                                }
                                                                title="Edit Doctor"
                                                            >

                                                                <i className="fa-solid fa-pen"></i>

                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        doctor
                                                                    )
                                                                }
                                                                title="Delete Doctor"
                                                            >

                                                                <i className="fa-solid fa-trash"></i>

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="10"
                                                className="no-doctors"
                                            >

                                                No doctors found

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default DoctorManagement;