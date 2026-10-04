import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { Link } from "react-router-dom";
import "./PatientManagement.css";

function PatientManagement() {
    const [patients, setPatients] = useState([]);
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
    // GET PATIENTS
    // =========================================

    useEffect(() => {
        const getPatients = async () => {
            try {
                const usersResponse = await axios.get(
                    `${API_URL}/api/users`,
                    config
                );

                const patientsResponse = await axios.get(
                    `${API_URL}/api/patients`,
                    config
                );

                const users =
                    usersResponse.data.data ||
                    usersResponse.data ||
                    [];

                const patientRecords =
                    patientsResponse.data.data ||
                    patientsResponse.data ||
                    [];

                console.log(
                    "USERS API DATA:",
                    users
                );

                console.log(
                    "PATIENTS API DATA:",
                    patientRecords
                );

                // =====================================
                // Users whose role is Patient
                // role_id = 4
                // =====================================

                const patientUsers = users.filter(
                    (user) => Number(user.role_id) === 4
                );

                console.log(
                    "PATIENT USERS:",
                    patientUsers
                );

                // =====================================
                // Combine User + Patient data
                // =====================================

                const combinedPatients =
                    patientUsers.map((user) => {

                        const patient =
                            patientRecords.find(
                                (item) =>
                                    Number(item.user_id) ===
                                    Number(user.id)
                            );

                        return {
                            ...user,

                            patient_id:
                                patient?.id || null,
                        };
                    });

                setPatients(combinedPatients);

                console.log(
                    "GET PATIENTS SUCCESS:",
                    combinedPatients
                );

            } catch (error) {
                console.log(
                    "GET PATIENTS ERROR:",
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
        const file =
            e.target.files[0] || null;

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
    // CREATE PATIENT
    // =========================================

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            // =====================================
            // CREATE USER
            // role_id = 4
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
                "4"
            );

            if (formData.profile_image) {
                userData.append(
                    "profile_image",
                    formData.profile_image
                );
            }

            console.log(
                "PATIENT USER DATA:",
                formData
            );

            const userResponse =
                await axios.post(
                    `${API_URL}/api/users`,
                    userData,
                    config
                );

            console.log(
                "PATIENT USER CREATED:",
                userResponse.data
            );

            const newUser =
                userResponse.data.user ||
                userResponse.data.data;

            const newUserId =
                newUser?.id;

            console.log(
                "NEW PATIENT USER ID:",
                newUserId
            );

            if (!newUserId) {
                throw new Error(
                    "User was created but User ID was not returned."
                );
            }

            // =====================================
            // CHECK AUTO CREATED PATIENT
            // =====================================

            const patientsResponse =
                await axios.get(
                    `${API_URL}/api/patients`,
                    config
                );

            const patientRecords =
                patientsResponse.data.data ||
                patientsResponse.data ||
                [];

            console.log(
                "PATIENTS AFTER USER CREATION:",
                patientRecords
            );

            const newPatient =
                patientRecords.find(
                    (patient) =>
                        Number(patient.user_id) ===
                        Number(newUserId)
                );

            console.log(
                "NEW AUTO CREATED PATIENT:",
                newPatient
            );

            if (!newPatient) {
                throw new Error(
                    "User was created, but the Patient record was not created automatically."
                );
            }

            alert(
                "Patient created successfully"
            );

            closeForm();

            setRefresh(
                (item) => item + 1
            );

        } catch (error) {
            console.log(
                "CREATE PATIENT ERROR:",
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
                "Create Patient failed. Check Console."
            );
        }
    };

    // =========================================
    // EDIT PATIENT
    // =========================================

    const handleEdit = (patient) => {
        setEditingId(patient.id);

        setFormData({
            first_name:
                patient.first_name || "",

            last_name:
                patient.last_name || "",

            email:
                patient.email || "",

            phone:
                patient.phone || "",

            password: "",

            profile_image: null,

            status:
                String(
                    patient.status ?? "1"
                ),
        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================
    // UPDATE PATIENT
    // =========================================

    const handleUpdate = async (e) => {
        e.preventDefault();

        const patient =
            patients.find(
                (item) =>
                    Number(item.id) ===
                    Number(editingId)
            );

        if (!patient) {
            alert(
                "Patient data not found."
            );
            return;
        }

        try {
            const userData =
                new FormData();

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
                "4"
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

            userData.append(
                "_method",
                "PUT"
            );

            console.log(
                "PATIENT UPDATE DATA:",
                formData
            );

            await axios.post(
                `${API_URL}/api/users/${editingId}`,
                userData,
                config
            );

            alert(
                "Patient updated successfully"
            );

            closeForm();

            setRefresh(
                (item) => item + 1
            );

        } catch (error) {
            console.log(
                "UPDATE PATIENT ERROR:",
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
                "Update Patient failed. Check Console."
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
    // DELETE PATIENT
    // =========================================

    const handleDelete = async (patient) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this patient?"
            );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/api/users/${patient.id}`,
                config
            );

            alert(
                "Patient deleted successfully"
            );

            setRefresh(
                (item) => item + 1
            );

        } catch (error) {
            console.log(
                "DELETE PATIENT ERROR:",
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
                "Delete Patient failed. Check Console."
            );
        }
    };

    return (
        <div>

            <NavbarDashboard />

            <section className="patient-management">

                <div className="container">

                    {/* =================================
                        PAGE HEADER
                    ================================= */}

                    <div className="patient-page-header">

                        <div className="patient-page-title">

                            <div className="patient-icon">

                                <i className="fa-solid fa-hospital-user"></i>

                            </div>

                            <div>

                                <h2>
                                    Patient Management
                                </h2>

                                <p>
                                    Manage patients and their information
                                </p>

                            </div>

                        </div>

                        <div className="patient-header-actions">

                            <button
                                type="button"
                                className="create-patient-btn"
                                onClick={
                                    openCreateForm
                                }
                            >

                                <i className="fa-solid fa-plus"></i>

                                Create New Patient

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

                        <div className="patient-form-section">

                            <div className="patient-form-header">

                                <div>

                                    <h3>

                                        {editingId === null
                                            ? "Create New Patient"
                                            : "Edit Patient"}

                                    </h3>

                                    <p>

                                        {editingId === null
                                            ? "Add patient account information"
                                            : "Update patient account information"}

                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="form-close-btn"
                                    onClick={
                                        closeForm
                                    }
                                >

                                    <i className="fa-solid fa-xmark"></i>

                                </button>

                            </div>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

                                <h4 className="patient-form-subtitle">
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

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value="Patient"
                                                disabled
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* =================================
                                    BUTTONS
                                ================================= */}

                                <div className="patient-form-buttons">

                                    <button
                                        type="submit"
                                        className="save-patient-btn"
                                    >

                                        <i className="fa-solid fa-check"></i>

                                        {editingId === null
                                            ? "Create Patient"
                                            : "Save Changes"}

                                    </button>

                                    <button
                                        type="button"
                                        className="cancel-patient-btn"
                                        onClick={
                                            closeForm
                                        }
                                    >

                                        Cancel

                                    </button>

                                </div>

                            </form>

                        </div>

                    )}


                    {/* =================================
                        PATIENTS TABLE
                    ================================= */}

                    <div className="patients-section">

                        <div className="patients-section-header">

                            <div>

                                <h3>

                                    Patients

                                    <span className="badge badge-primary rounded-3 ml-2">
                                        {patients.length}
                                    </span>

                                </h3>

                                <p>
                                    All patients in the system
                                </p>

                            </div>

                        </div>


                        <div className="table-responsive">

                            <table className="table patient-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Profile Image</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {patients.length > 0 ? (

                                        patients.map(
                                            (patient) => (

                                                <tr
                                                    key={
                                                        patient.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            patient.id
                                                        }
                                                    </td>


                                                    <td>

                                                        {patient.profile_image ? (

                                                            <img
                                                                src={
                                                                    getImageUrl(
                                                                        patient.profile_image
                                                                    )
                                                                }
                                                                alt="Patient"
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
                                                                patient.first_name
                                                            }{" "}

                                                            {
                                                                patient.last_name
                                                            }

                                                        </strong>

                                                    </td>


                                                    <td>
                                                        {
                                                            patient.email
                                                        }
                                                    </td>


                                                    <td>
                                                        {
                                                            patient.phone
                                                        }
                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                String(
                                                                    patient.status
                                                                ) === "1"
                                                                    ? "status-badge active"
                                                                    : "status-badge inactive"
                                                            }
                                                        >

                                                            {
                                                                String(
                                                                    patient.status
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
                                                                        patient
                                                                    )
                                                                }
                                                                title="Edit Patient"
                                                            >

                                                                <i className="fa-solid fa-pen"></i>

                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        patient
                                                                    )
                                                                }
                                                                title="Delete Patient"
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
                                                colSpan="7"
                                                className="no-patients"
                                            >

                                                No patients found

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

export default PatientManagement;