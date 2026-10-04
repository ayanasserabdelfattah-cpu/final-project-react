
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavReceptionDashboard from "../NavReceptionDashboard/NavReceptionDashboard";
import { Link } from "react-router-dom";
import "./PatientReceptionManagement.css";

function PatientReceptionManagement() {

    const API_URL = "http://127.0.0.1:8000";

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    /* =================================
       STATES
    ================================= */

    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [doctorSchedules, setDoctorSchedules] = useState([]);

    const [refresh, setRefresh] = useState(0);

    const [showPatientForm, setShowPatientForm] =
        useState(false);

    const [showAppointmentForm, setShowAppointmentForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [search, setSearch] =
        useState("");

    /* =================================
       PATIENT FORM
    ================================= */

    const [patientFormData, setPatientFormData] =
        useState({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            profile_image: null,
            status: "1",
        });

    /* =================================
       APPOINTMENT FORM
    ================================= */

    const [appointmentFormData, setAppointmentFormData] =
        useState({
            patient_id: "",
            doctor_id: "",
            doctor_schedule_id: "",
            appointment_date: "",
            appointment_time: "",
            status: "pending",
            notes: "",
        });

    /* =================================
       IMAGE URL
    ================================= */

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

    /* =================================
       GET DATA
    ================================= */

    useEffect(() => {

        const fetchData = async () => {

            /* =================================
               GET USERS + PATIENTS
            ================================= */

            try {

                const usersResponse =
                    await axios.get(
                        `${API_URL}/api/users`,
                        config
                    );

                const users =
                    usersResponse.data.data ||
                    usersResponse.data ||
                    [];

                const patientUsers =
                    users.filter(
                        (user) =>
                            Number(user.role_id) === 4
                    );

                try {

                    const patientsResponse =
                        await axios.get(
                            `${API_URL}/api/patients`,
                            config
                        );

                    const patientRecords =
                        patientsResponse.data.data ||
                        patientsResponse.data ||
                        [];

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

                                user_id: user.id,

                                patient_id:
                                    patient?.id || null,

                            };

                        });

                    setPatients(
                        combinedPatients
                    );

                } catch (error) {

                    console.error(
                        "Error fetching patients:",
                        error.response?.data || error
                    );

                    /*
                     * Keep role 4 users visible
                     * even if /api/patients fails.
                     */

                    const fallbackPatients =
                        patientUsers.map((user) => ({

                            ...user,

                            user_id: user.id,

                            patient_id:
                                user.patient_id ||
                                null,

                        }));

                    setPatients(
                        fallbackPatients
                    );

                }

            } catch (error) {

                console.error(
                    "Error fetching users:",
                    error.response?.data || error
                );

                setPatients([]);

            }


            /* =================================
               GET APPOINTMENTS
            ================================= */

            try {

                const appointmentsResponse =
                    await axios.get(
                        `${API_URL}/api/appointments`,
                        config
                    );

                const appointmentRecords =
                    appointmentsResponse.data.data ||
                    appointmentsResponse.data ||
                    [];

                setAppointments(
                    appointmentRecords
                );

            } catch (error) {

                console.error(
                    "Error fetching appointments:",
                    error.response?.data || error
                );

                setAppointments([]);

            }


            /* =================================
               GET DOCTORS
            ================================= */

            try {

                const doctorsResponse =
                    await axios.get(
                        `${API_URL}/api/doctors`,
                        config
                    );

                const doctorRecords =
                    doctorsResponse.data.data ||
                    doctorsResponse.data ||
                    [];

                setDoctors(
                    doctorRecords
                );

            } catch (error) {

                console.error(
                    "Error fetching doctors:",
                    error.response?.data || error
                );

                setDoctors([]);

            }


            /* =================================
               GET DOCTOR SCHEDULES
            ================================= */

            try {

                const schedulesResponse =
                    await axios.get(
                        `${API_URL}/api/doctor-schedules`,
                        config
                    );

                const scheduleRecords =
                    schedulesResponse.data.data ||
                    schedulesResponse.data ||
                    [];

                setDoctorSchedules(
                    scheduleRecords
                );

            } catch (error) {

                console.error(
                    "Error fetching doctor schedules:",
                    error.response?.data || error
                );

                setDoctorSchedules([]);

            }

        };

        fetchData();

    }, [refresh]);

    /* =================================
       SEARCH
    ================================= */

    const filteredPatients =
        patients.filter((patient) => {

            const fullName =
                `${patient.first_name || ""} ${patient.last_name || ""}`
                    .toLowerCase();

            const searchValue =
                search.toLowerCase();

            return (

                fullName.includes(
                    searchValue
                ) ||

                (patient.email || "")
                    .toLowerCase()
                    .includes(searchValue) ||

                (patient.phone || "")
                    .toLowerCase()
                    .includes(searchValue) ||

                String(
                    patient.id || ""
                ).includes(searchValue)

            );

        });

    /* =================================
       PATIENT FORM CHANGE
    ================================= */

    const handlePatientChange = (e) => {

        const {
            name,
            value,
            files
        } = e.target;

        setPatientFormData(
            (prev) => ({

                ...prev,

                [name]:
                    files
                        ? files[0]
                        : value,

            })
        );

    };

    /* =================================
       APPOINTMENT FORM CHANGE
    ================================= */

    const handleAppointmentChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setAppointmentFormData(
            (prev) => ({

                ...prev,

                [name]: value,

                /*
                 * When doctor changes,
                 * reset doctor schedule.
                 */

                ...(name === "doctor_id"
                    ? {
                        doctor_schedule_id: ""
                    }
                    : {}),

            })
        );

    };

    /* =================================
       ADD PATIENT
    ================================= */

    const handleAddPatient = () => {

        setEditingId(null);

        setPatientFormData({

            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            profile_image: null,
            status: "1",

        });

        setShowAppointmentForm(false);

        setShowPatientForm(true);

    };

    /* =================================
       EDIT PATIENT
    ================================= */

    const handleEditPatient = (
        patient
    ) => {

        setEditingId(
            patient.id
        );

        setPatientFormData({

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

        setShowAppointmentForm(false);

        setShowPatientForm(true);

    };

    /* =================================
       CLOSE PATIENT FORM
    ================================= */

    const closePatientForm = () => {

        setShowPatientForm(false);

        setEditingId(null);

    };

    /* =================================
       SUBMIT PATIENT
    ================================= */

    const handlePatientSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const data =
                    new FormData();

                data.append(
                    "first_name",
                    patientFormData.first_name
                );

                data.append(
                    "last_name",
                    patientFormData.last_name
                );

                data.append(
                    "email",
                    patientFormData.email
                );

                data.append(
                    "phone",
                    patientFormData.phone
                );

                data.append(
                    "status",
                    patientFormData.status
                );

                /*
                 * New patient needs password.
                 */

                if (
                    patientFormData.password
                ) {

                    data.append(
                        "password",
                        patientFormData.password
                    );

                }

                if (
                    patientFormData.profile_image
                ) {

                    data.append(
                        "profile_image",
                        patientFormData.profile_image
                    );

                }

                if (editingId) {

                    data.append(
                        "_method",
                        "PUT"
                    );

                    await axios.post(

                        `${API_URL}/api/users/${editingId}`,

                        data,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "multipart/form-data",
                            },
                        }

                    );

                    alert(
                        "Patient updated successfully."
                    );

                } else {

                    /*
                     * Reception creates Patient
                     * with role_id = 4.
                     */

                    data.append(
                        "role_id",
                        "4"
                    );

                    await axios.post(

                        `${API_URL}/api/users`,

                        data,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "multipart/form-data",
                            },
                        }

                    );

                    alert(
                        "Patient added successfully."
                    );

                }

                closePatientForm();

                setRefresh(
                    (prev) => prev + 1
                );

            } catch (error) {

                console.error(
                    "Error saving patient:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.message ||
                    "Something went wrong."
                );

            }

        };

    /* =================================
       ADD APPOINTMENT
    ================================= */

    const handleAddAppointment = () => {

        setShowPatientForm(false);

        setEditingId(null);

        setAppointmentFormData({

            patient_id: "",
            doctor_id: "",
            doctor_schedule_id: "",
            appointment_date: "",
            appointment_time: "",
            status: "pending",
            notes: "",

        });

        setShowAppointmentForm(true);

    };

    /* =================================
       CLOSE APPOINTMENT FORM
    ================================= */

    const closeAppointmentForm = () => {

        setShowAppointmentForm(false);

    };

    /* =================================
       SUBMIT APPOINTMENT
    ================================= */

    const handleAppointmentSubmit =
        async (e) => {

            e.preventDefault();

            /*
             * Make sure required IDs exist.
             */

            if (
                !appointmentFormData.patient_id
            ) {

                alert(
                    "Please select a patient."
                );

                return;

            }

            if (
                !appointmentFormData.doctor_id
            ) {

                alert(
                    "Please select a doctor."
                );

                return;

            }

            if (
                !appointmentFormData.doctor_schedule_id
            ) {

                alert(
                    "Please select a doctor schedule."
                );

                return;

            }

            try {

                const data = {

                    patient_id:
                        Number(
                            appointmentFormData.patient_id
                        ),

                    doctor_id:
                        Number(
                            appointmentFormData.doctor_id
                        ),

                    doctor_schedule_id:
                        Number(
                            appointmentFormData.doctor_schedule_id
                        ),

                    appointment_date:
                        appointmentFormData.appointment_date,

                    appointment_time:
                        appointmentFormData.appointment_time,

                    status:
                        appointmentFormData.status,

                    notes:
                        appointmentFormData.notes,

                };

                console.log(
                    "Appointment data:",
                    data
                );

                await axios.post(

                    `${API_URL}/api/appointments`,

                    data,

                    config

                );

                alert(
                    "Appointment created successfully."
                );

                closeAppointmentForm();

                setRefresh(
                    (prev) => prev + 1
                );

            } catch (error) {

                console.error(
                    "Error creating appointment:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.message ||
                    "Something went wrong."
                );

            }

        };

    /* =================================
       DELETE PATIENT
    ================================= */

    const handleDeletePatient =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this patient?"
                );

            if (!confirmDelete) {
                return;
            }

            try {

                await axios.delete(

                    `${API_URL}/api/users/${id}`,

                    config

                );

                alert(
                    "Patient deleted successfully."
                );

                setRefresh(
                    (prev) => prev + 1
                );

            } catch (error) {

                console.error(
                    "Error deleting patient:",
                    error
                );

                console.error(
                    error.response?.data
                );

                alert(
                    error.response?.data?.message ||
                    "Something went wrong."
                );

            }

        };

    /* =================================
       GET APPOINTMENTS FOR PATIENT
    ================================= */

    const getPatientAppointments =
        (patient) => {

            if (!patient.patient_id) {
                return [];
            }

            return appointments.filter(
                (appointment) =>
                    Number(
                        appointment.patient_id
                    ) ===
                    Number(
                        patient.patient_id
                    )
            );

        };

    /* =================================
       FILTER SCHEDULES BY DOCTOR
    ================================= */

    const filteredSchedules =
        doctorSchedules.filter(
            (schedule) =>
                Number(
                    schedule.doctor_id
                ) ===
                Number(
                    appointmentFormData.doctor_id
                )
        );

    return (

        <>

            <NavReceptionDashboard />

            <div className="patient-management">

                {/* =================================
                    PAGE HEADER
                ================================= */}

                <div className="patient-page-header">

                    <div>

                        <Link
                            to="/RepceptionDashboard"
                            className="back-link"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Back
                        </Link>

                        <div className="patient-title">

                            <i className="fa-solid fa-hospital-user"></i>

                            <h2>
                                Patient Management
                            </h2>

                        </div>

                    </div>

                    <div className="page-header-buttons">

                        <button
                            type="button"
                            className="add-patient-btn"
                            onClick={
                                handleAddPatient
                            }
                        >
                            <i className="fa-solid fa-user-plus"></i>
                            Add Patient
                        </button>

                        <button
                            type="button"
                            className="add-patient-btn"
                            onClick={
                                handleAddAppointment
                            }
                        >
                            <i className="fa-solid fa-calendar-plus"></i>
                            Add Appointment
                        </button>

                    </div>

                </div>

                {/* =================================
                    ADD / EDIT PATIENT FORM
                ================================= */}

                {showPatientForm && (

                    <div className="patient-form-section">

                        <div className="form-header">

                            <h3>

                                {editingId
                                    ? "Edit Patient"
                                    : "Add Patient"}

                            </h3>

                            <button
                                type="button"
                                className="form-close-btn"
                                onClick={
                                    closePatientForm
                                }
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handlePatientSubmit
                            }
                            className="patient-form"
                        >

                            <div className="form-group">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="first_name"
                                    value={
                                        patientFormData.first_name
                                    }
                                    onChange={
                                        handlePatientChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="last_name"
                                    value={
                                        patientFormData.last_name
                                    }
                                    onChange={
                                        handlePatientChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        patientFormData.email
                                    }
                                    onChange={
                                        handlePatientChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={
                                        patientFormData.phone
                                    }
                                    onChange={
                                        handlePatientChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={
                                        patientFormData.password
                                    }
                                    onChange={
                                        handlePatientChange
                                    }
                                    required={!editingId}
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Profile Image
                                </label>

                                <input
                                    type="file"
                                    name="profile_image"
                                    accept="image/*"
                                    onChange={
                                        handlePatientChange
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        patientFormData.status
                                    }
                                    onChange={
                                        handlePatientChange
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

                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    {editingId
                                        ? "Update Patient"
                                        : "Add Patient"}
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={
                                        closePatientForm
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}

                {/* =================================
                    ADD APPOINTMENT FORM
                ================================= */}

                {showAppointmentForm && (

                    <div className="patient-form-section">

                        <div className="form-header">

                            <h3>
                                Add Appointment
                            </h3>

                            <button
                                type="button"
                                className="form-close-btn"
                                onClick={
                                    closeAppointmentForm
                                }
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleAppointmentSubmit
                            }
                            className="patient-form"
                        >

                            {/* PATIENT */}

                            <div className="form-group">

                                <label>
                                    Patient
                                </label>

                                <select
                                    name="patient_id"
                                    value={
                                        appointmentFormData.patient_id
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Patient
                                    </option>

                                    {patients
                                        .filter(
                                            (patient) =>
                                                patient.patient_id
                                        )
                                        .map(
                                            (patient) => (

                                                <option
                                                    key={
                                                        patient.patient_id
                                                    }
                                                    value={
                                                        patient.patient_id
                                                    }
                                                >

                                                    {patient.first_name}{" "}
                                                    {patient.last_name}

                                                </option>

                                            )
                                        )}

                                </select>

                            </div>

                            {/* DOCTOR */}

                            <div className="form-group">

                                <label>
                                    Doctor
                                </label>

                                <select
                                    name="doctor_id"
                                    value={
                                        appointmentFormData.doctor_id
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Doctor
                                    </option>

                                    {doctors.map(
                                        (doctor) => (

                                            <option
                                                key={
                                                    doctor.id
                                                }
                                                value={
                                                    doctor.id
                                                }
                                            >

                                                {doctor.first_name}{" "}
                                                {doctor.last_name}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* DOCTOR SCHEDULE */}

                            <div className="form-group">

                                <label>
                                    Doctor Schedule
                                </label>

                                <select
                                    name="doctor_schedule_id"
                                    value={
                                        appointmentFormData.doctor_schedule_id
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    required
                                    disabled={
                                        !appointmentFormData.doctor_id
                                    }
                                >

                                    <option value="">
                                        Select Doctor Schedule
                                    </option>

                                    {filteredSchedules.map(
                                        (schedule) => (

                                            <option
                                                key={
                                                    schedule.id
                                                }
                                                value={
                                                    schedule.id
                                                }
                                            >

                                                {schedule.day ||
                                                    schedule.date ||
                                                    `Schedule ${schedule.id}`}

                                                {schedule.start_time
                                                    ? ` - ${schedule.start_time}`
                                                    : ""}

                                                {schedule.end_time
                                                    ? ` to ${schedule.end_time}`
                                                    : ""}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* APPOINTMENT DATE */}

                            <div className="form-group">

                                <label>
                                    Appointment Date
                                </label>

                                <input
                                    type="date"
                                    name="appointment_date"
                                    value={
                                        appointmentFormData.appointment_date
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    required
                                />

                            </div>

                            {/* APPOINTMENT TIME */}

                            <div className="form-group">

                                <label>
                                    Appointment Time
                                </label>

                                <input
                                    type="time"
                                    name="appointment_time"
                                    value={
                                        appointmentFormData.appointment_time
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    required
                                />

                            </div>

                            {/* STATUS */}

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        appointmentFormData.status
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    required
                                >

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="confirmed">
                                        Confirmed
                                    </option>

                                    <option value="completed">
                                        Completed
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>

                            {/* NOTES */}

                            <div className="form-group">

                                <label>
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    value={
                                        appointmentFormData.notes
                                    }
                                    onChange={
                                        handleAppointmentChange
                                    }
                                    rows="4"
                                    placeholder="Add notes..."
                                ></textarea>

                            </div>

                            {/* ACTIONS */}

                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    <i className="fa-solid fa-calendar-check"></i>
                                    Create Appointment
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={
                                        closeAppointmentForm
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}

                {/* =================================
                    PATIENTS SECTION
                ================================= */}

                <div className="patients-section">

                    <div className="patients-header">

                        <div>

                            <h3>
                                Patients & Appointments
                            </h3>

                            <span className="patient-count">
                                {filteredPatients.length}
                            </span>

                        </div>

                        <div className="search-wrapper">

                            <i className="fa-solid fa-magnifying-glass"></i>

                            <input
                                type="text"
                                placeholder="Search patients..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* =================================
                        TABLE
                    ================================= */}

                    <div className="table-responsive">

                        <table className="table patient-table">

                            <thead>

                                <tr>

                                    <th>
                                        Patient ID
                                    </th>

                                    <th>
                                        Profile Image
                                    </th>

                                    <th>
                                        Patient Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Doctor ID
                                    </th>

                                    <th>
                                        Appointment Date
                                    </th>

                                    <th>
                                        Appointment Time
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Notes
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredPatients.map(
                                    (patient) => {

                                        const patientAppointments =
                                            getPatientAppointments(
                                                patient
                                            );

                                        /* =========================
                                           PATIENT WITH APPOINTMENTS
                                        ========================= */

                                        if (
                                            patientAppointments.length >
                                            0
                                        ) {

                                            return patientAppointments.map(
                                                (
                                                    appointment
                                                ) => (

                                                    <tr
                                                        key={`${patient.id}-${appointment.id}`}
                                                    >

                                                        <td>
                                                            {
                                                                patient.patient_id ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>

                                                            {patient.profile_image ? (

                                                                <img
                                                                    src={getImageUrl(
                                                                        patient.profile_image
                                                                    )}
                                                                    alt="Patient"
                                                                    className="patient-profile-image"
                                                                />

                                                            ) : (

                                                                <div className="patient-default-image">

                                                                    <i className="fa-solid fa-user"></i>

                                                                </div>

                                                            )}

                                                        </td>

                                                        <td>

                                                            {
                                                                patient.first_name
                                                            }{" "}

                                                            {
                                                                patient.last_name
                                                            }

                                                        </td>

                                                        <td>
                                                            {
                                                                patient.email ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                patient.phone ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                appointment.doctor_id ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                appointment.appointment_date ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                appointment.appointment_time ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>

                                                            <span
                                                                className={`status-badge ${appointment.status || ""}`}
                                                            >
                                                                {
                                                                    appointment.status ||
                                                                    "—"
                                                                }
                                                            </span>

                                                        </td>

                                                        <td>
                                                            {
                                                                appointment.notes ||
                                                                "—"
                                                            }
                                                        </td>

                                                        <td>

                                                            <div className="action-buttons">

                                                                <button
                                                                    type="button"
                                                                    className="edit-btn"
                                                                    onClick={() =>
                                                                        handleEditPatient(
                                                                            patient
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-pen"></i>
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className="delete-btn"
                                                                    onClick={() =>
                                                                        handleDeletePatient(
                                                                            patient.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )
                                            );

                                        }

                                        /* =========================
                                           PATIENT WITHOUT APPOINTMENT
                                        ========================= */

                                        return (

                                            <tr
                                                key={
                                                    patient.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        patient.patient_id ||
                                                        "—"
                                                    }
                                                </td>

                                                <td>

                                                    {patient.profile_image ? (

                                                        <img
                                                            src={getImageUrl(
                                                                patient.profile_image
                                                            )}
                                                            alt="Patient"
                                                            className="patient-profile-image"
                                                        />

                                                    ) : (

                                                        <div className="patient-default-image">

                                                            <i className="fa-solid fa-user"></i>

                                                        </div>

                                                    )}

                                                </td>

                                                <td>

                                                    {
                                                        patient.first_name
                                                    }{" "}

                                                    {
                                                        patient.last_name
                                                    }

                                                </td>

                                                <td>
                                                    {
                                                        patient.email ||
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        patient.phone ||
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    —
                                                </td>

                                                <td>
                                                    —
                                                </td>

                                                <td>
                                                    —
                                                </td>

                                                <td>

                                                    <span className="status-badge">
                                                        No Appointment
                                                    </span>

                                                </td>

                                                <td>
                                                    —
                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            type="button"
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                handleEditPatient(
                                                                    patient
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                handleDeletePatient(
                                                                    patient.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* =================================
                        EMPTY STATE
                    ================================= */}

                    {filteredPatients.length === 0 && (

                        <div className="no-patients">

                            <i className="fa-solid fa-user-slash"></i>

                            <p>
                                No patients found.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}

export default PatientReceptionManagement;
