import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { Link } from "react-router-dom";
import "./ReceptionManagment.css";

function ReceptionManagement() {

    // =========================================================
    // 1. API DATA
    // =========================================================

    const [receptions, setReceptions] = useState([]);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    // =========================================================
    // 2. REFRESH
    // =========================================================

    const [refresh, setRefresh] = useState(0);


    // =========================================================
    // 3. GET RECEPTIONS
    // =========================================================

    useEffect(() => {

        const getData = async () => {

            try {

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/users",
                    config
                );


                console.log(
                    "GET USERS SUCCESS:",
                    response.data
                );


                const allUsers =
                    response.data.data ||
                    response.data ||
                    [];


                // role_id = 3 => Reception
                const receptionUsers =
                    allUsers.filter(
                        (user) =>
                            Number(user.role_id) === 3
                    );


                setReceptions(receptionUsers);


            } catch (error) {

                console.log(
                    "GET RECEPTIONS ERROR:",
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


        getData();

    }, [refresh]);


    // =========================================================
    // 4. FORM DATA
    // =========================================================

    const [formData, setFormData] = useState({

        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        status: "1",

    });


    // =========================================================
    // 5. HANDLE CHANGE
    // =========================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    // =========================================================
    // 6. FORM VISIBILITY
    // =========================================================

    const [showForm, setShowForm] = useState(false);


    // =========================================================
    // 7. EDITING ID
    // =========================================================

    const [editingId, setEditingId] = useState(null);


    // =========================================================
    // 8. RESET FORM
    // =========================================================

    const resetForm = () => {

        setFormData({

            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            status: "1",

        });

        setEditingId(null);

    };


    // =========================================================
    // 9. OPEN CREATE FORM
    // =========================================================

    const openCreateForm = () => {

        resetForm();

        setShowForm(true);

    };


    // =========================================================
    // 10. CLOSE FORM
    // =========================================================

    const closeForm = () => {

        resetForm();

        setShowForm(false);

    };


    // =========================================================
    // 11. CREATE RECEPTION
    // =========================================================

    const handleCreate = async (e) => {

        e.preventDefault();


        try {

            const userData = {

                first_name:
                    formData.first_name,

                last_name:
                    formData.last_name,

                email:
                    formData.email,

                phone:
                    formData.phone,

                password:
                    formData.password,

                // role_id = 3 => Reception
                role_id: 3,

                status:
                    formData.status,

            };


            console.log(
                "Data sent to User API:",
                userData
            );


            const response =
                await axios.post(

                    "http://127.0.0.1:8000/api/users",

                    userData,

                    config

                );


            console.log(
                "CREATE RECEPTION SUCCESS:",
                response.data
            );


            alert(
                "Reception created successfully"
            );


            closeForm();

            setRefresh(
                (item) => item + 1
            );


        } catch (error) {

            console.log(
                "CREATE RECEPTION ERROR:",
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

            console.log(
                "VALIDATION ERRORS:",
                error.response?.data?.errors ||
                error.response?.data?.data
            );


            alert(
                error.response?.data?.message ||
                error.message ||
                "Create Reception failed. Check Console."
            );

        }

    };


    // =========================================================
    // 12. EDIT RECEPTION
    // =========================================================

    const handleEdit = (reception) => {

        setEditingId(
            reception.id
        );


        setFormData({

            first_name:
                reception.first_name || "",

            last_name:
                reception.last_name || "",

            email:
                reception.email || "",

            phone:
                reception.phone || "",

            password: "",

            status:
                String(
                    reception.status ?? "1"
                ),

        });


        setShowForm(true);


        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    };


    // =========================================================
    // 13. UPDATE RECEPTION
    // =========================================================

    const handleUpdate = async (e) => {

        e.preventDefault();


        try {

            const userData = {

                first_name:
                    formData.first_name,

                last_name:
                    formData.last_name,

                email:
                    formData.email,

                phone:
                    formData.phone,

                // Keep Reception role
                role_id: 3,

                status:
                    formData.status,

            };


            if (
                formData.password.trim() !== ""
            ) {

                userData.password =
                    formData.password;

            }


            console.log(
                "Data sent for User UPDATE:",
                userData
            );


            await axios.put(

                `http://127.0.0.1:8000/api/users/${editingId}`,

                userData,

                config

            );


            alert(
                "Reception updated successfully"
            );


            closeForm();

            setRefresh(
                (item) => item + 1
            );


        } catch (error) {

            console.log(
                "UPDATE RECEPTION ERROR:",
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

            console.log(
                "VALIDATION ERRORS:",
                error.response?.data?.errors ||
                error.response?.data?.data
            );


            alert(
                error.response?.data?.message ||
                "Update Reception failed. Check Console."
            );

        }

    };


    // =========================================================
    // 14. FORM SUBMIT
    // =========================================================

    const handleSubmit = (e) => {

        if (editingId === null) {

            handleCreate(e);

        } else {

            handleUpdate(e);

        }

    };


    // =========================================================
    // 15. DELETE RECEPTION
    // =========================================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this reception?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            await axios.delete(

                `http://127.0.0.1:8000/api/users/${id}`,

                config

            );


            alert(
                "Reception deleted successfully"
            );


            setRefresh(
                (item) => item + 1
            );


        } catch (error) {

            console.log(
                "DELETE RECEPTION ERROR:",
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
                "Delete Reception failed. Check Console."
            );

        }

    };


    // =========================================================
    // 16. RETURN
    // =========================================================

    return (

        <div>

            <NavbarDashboard />


            {/* =================================================
                RECEPTION MANAGEMENT
            ================================================= */}

            <section className="AdminManagement">

                <div className="container">


                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="admin-page-header">

                        <div className="admin-page-title">

                            <div className="admin-icon">

                                <i className="fa-solid fa-user-tie"></i>

                            </div>


                            <div>

                                <h2>
                                    Reception Management
                                </h2>

                                <p>
                                    Manage reception staff and their information
                                </p>

                            </div>

                        </div>


                        {/* CREATE BUTTON */}

                        <button
                            type="button"
                            className="create-admin-btn"
                            onClick={openCreateForm}
                        >

                            <i className="fa-solid fa-plus"></i>

                            Create New Reception

                        </button>


                        {/* GO BACK */}

                        <Link
                            to="/AdminDashboard"
                            className="btn btn-dark"
                        >

                            <i className="fa-solid fa-arrow-left mr-2"></i>

                            Go back

                        </Link>

                    </div>


                    {/* =================================================
                        CREATE / EDIT FORM
                    ================================================= */}

                    {showForm && (

                        <div className="admin-form-section">


                            {/* FORM HEADER */}

                            <div className="admin-form-header">

                                <div>

                                    <h3>

                                        {editingId === null
                                            ? "Create New Reception"
                                            : "Edit Reception"}

                                    </h3>


                                    <p>

                                        {editingId === null
                                            ? "Add a new reception account"
                                            : "Update reception information"}

                                    </p>

                                </div>


                                {/* CLOSE */}

                                <button
                                    type="button"
                                    className="form-close-btn"
                                    onClick={closeForm}
                                >

                                    <i className="fa-solid fa-xmark"></i>

                                </button>

                            </div>


                            {/* =================================================
                                FORM
                            ================================================= */}

                            <form onSubmit={handleSubmit}>


                                {/* =================================================
                                    PERSONAL INFORMATION
                                ================================================= */}

                                <h4 className="mb-3">
                                    Personal Information
                                </h4>


                                <div className="row">


                                    {/* FIRST NAME */}

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


                                    {/* LAST NAME */}

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


                                    {/* EMAIL */}

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


                                    {/* PHONE */}

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


                                    {/* PASSWORD */}

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
                                                minLength="8"
                                                placeholder={
                                                    editingId !== null
                                                        ? "Leave empty if unchanged"
                                                        : ""
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* ROLE */}

                                    <div className="col-md-6">

                                        <div className="form-group">

                                            <label>
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value="Reception"
                                                disabled
                                            />

                                        </div>

                                    </div>


                                    {/* STATUS */}

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

                                </div>


                                {/* =================================================
                                    FORM BUTTONS
                                ================================================= */}

                                <div className="admin-form-buttons">


                                    {/* SAVE */}

                                    <button
                                        type="submit"
                                        className="save-admin-btn"
                                    >

                                        <i className="fa-solid fa-check"></i>


                                        {editingId === null
                                            ? "Create Reception"
                                            : "Save Changes"}

                                    </button>


                                    {/* CANCEL */}

                                    <button
                                        type="button"
                                        className="cancel-admin-btn"
                                        onClick={closeForm}
                                    >

                                        Cancel

                                    </button>

                                </div>

                            </form>

                        </div>

                    )}


                    {/* =================================================
                        RECEPTIONS TABLE
                    ================================================= */}

                    <div className="admins-section">


                        {/* TABLE HEADER */}

                        <div className="admins-section-header">

                            <div>

                                <h3 className="admins-title">

                                    Receptions

                                    <span className="badge badge-primary ml-2">

                                        {receptions.length}

                                    </span>

                                </h3>


                                <p>
                                    All reception staff in the system
                                </p>

                            </div>

                        </div>


                        {/* TABLE */}

                        <div className="table-responsive">

                            <table className="table admin-table">


                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>


                                    {receptions.length > 0 ? (

                                        receptions.map(
                                            (reception) => (

                                                <tr
                                                    key={
                                                        reception.id
                                                    }
                                                >

                                                    {/* ID */}

                                                    <td>
                                                        {
                                                            reception.id
                                                        }
                                                    </td>


                                                    {/* NAME */}

                                                    <td>

                                                        {
                                                            `${reception.first_name || ""} ${reception.last_name || ""}`
                                                        }

                                                    </td>


                                                    {/* EMAIL */}

                                                    <td>

                                                        {
                                                            reception.email ||
                                                            "N/A"
                                                        }

                                                    </td>


                                                    {/* PHONE */}

                                                    <td>

                                                        {
                                                            reception.phone ||
                                                            "N/A"
                                                        }

                                                    </td>


                                                    {/* ROLE */}

                                                    <td>

                                                        <span className="badge badge-primary">

                                                            Reception

                                                        </span>

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span
                                                            className={
                                                                String(
                                                                    reception.status
                                                                ) === "1"

                                                                    ? "status-badge active"

                                                                    : "status-badge inactive"
                                                            }
                                                        >

                                                            {
                                                                String(
                                                                    reception.status
                                                                ) === "1"

                                                                    ? "Active"

                                                                    : "Inactive"
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="action-buttons">


                                                            {/* EDIT */}

                                                            <button
                                                                type="button"
                                                                className="edit-btn"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        reception
                                                                    )
                                                                }
                                                            >

                                                                <i className="fa-solid fa-pen"></i>

                                                            </button>


                                                            {/* DELETE */}

                                                            <button
                                                                type="button"
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        reception.id
                                                                    )
                                                                }
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
                                                className="no-admins"
                                            >

                                                No reception staff found

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


export default ReceptionManagement;