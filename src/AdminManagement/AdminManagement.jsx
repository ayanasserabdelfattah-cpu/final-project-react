
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDashboard from "../NavbarDashboard/NavbarDashboard";
import { Link } from "react-router-dom";
import "./AdminManagement.css";

function AdminManagement() {

    // =========================================================
    // 1. ADMINS
    // =========================================================

    const [admins, setAdmins] = useState([]);

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
    // 3. GET ADMINS
    // =========================================================

    useEffect(() => {

        axios
            .get(
                "http://127.0.0.1:8000/api/users",
                config
            )
            .then((item) => {

                setAdmins(
                    (item.data.data || item.data).filter(
                        (user) => user.role_id === 1
                    )
                );

            })
            .catch((error) => {

                console.log("GET ADMINS ERROR:", error);
                console.log(
                    "ERROR RESPONSE:",
                    error.response?.data
                );

            });

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

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // =========================================================
    // 5. FORM VISIBILITY
    // =========================================================

    const [showForm, setShowForm] = useState(false);

    // =========================================================
    // 6. EDITING ID
    // =========================================================

    const [editingId, setEditingId] = useState(null);

    // =========================================================
    // 7. RESET FORM
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
    // 8. OPEN CREATE FORM
    // =========================================================

    const openCreateForm = () => {

        resetForm();

        setShowForm(true);

    };

    // =========================================================
    // 9. CLOSE FORM
    // =========================================================

    const closeForm = () => {

        resetForm();

        setShowForm(false);

    };

    // =========================================================
    // 10. CREATE ADMIN
    // =========================================================

    const handleCreate = (e) => {

        e.preventDefault();

        const adminData = {

            first_name: formData.first_name,

            last_name: formData.last_name,

            email: formData.email,

            phone: formData.phone,

            password: formData.password,

            // 1 = Active
            // 0 = Inactive
            status: formData.status,

            // Admin
            role_id: 1,
        };

        console.log("CREATE DATA:", adminData);

        axios
            .post(
                "http://127.0.0.1:8000/api/users",
                adminData,
                config
            )
            .then((response) => {

                console.log(
                    "CREATE RESPONSE:",
                    response.data
                );

                alert("Admin created successfully");

                closeForm();

                setRefresh((item) => item + 1);

            })
            .catch((error) => {

                console.log("CREATE ERROR:", error);

                console.log(
                    "ERROR RESPONSE:",
                    error.response?.data
                );

                console.log(
                    "ERROR STATUS:",
                    error.response?.status
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to create admin"
                );

            });

    };

    // =========================================================
    // 11. EDIT ADMIN
    // =========================================================

    const handleEdit = (admin) => {

        setEditingId(admin.id);

        setFormData({

            first_name: admin.first_name || "",

            last_name: admin.last_name || "",

            email: admin.email || "",

            phone: admin.phone || "",

            password: "",

            status: String(
                admin.status ?? "1"
            ),

        });

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    // =========================================================
    // 12. UPDATE ADMIN
    // =========================================================

    const handleUpdate = (e) => {

        e.preventDefault();

        const adminData = {

            first_name: formData.first_name,

            last_name: formData.last_name,

            email: formData.email,

            phone: formData.phone,

            // Convert "0"/"1" from select
            // to number 0/1
            status: formData.status,

            // Keep Admin role
            role_id: 1,
        };

        // Add password only if user entered a new one

        if (formData.password.trim() !== "") {

            adminData.password =
                formData.password;

        }

        console.log("UPDATE DATA:", adminData);

        axios
            .put(
                `http://127.0.0.1:8000/api/users/${editingId}`,
                adminData,
                config
            )
            .then((response) => {

                console.log(
                    "UPDATE RESPONSE:",
                    response.data
                );

                alert("Admin updated successfully");

                closeForm();

                setRefresh((item) => item + 1);

            })
            .catch((error) => {

                console.log("UPDATE ERROR:", error);

                console.log(
                    "ERROR RESPONSE:",
                    error.response?.data
                );

                console.log(
                    "ERROR STATUS:",
                    error.response?.status
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to update admin"
                );

            });

    };

    // =========================================================
    // 13. FORM SUBMIT
    // =========================================================

    const handleSubmit = (e) => {

        if (editingId === null) {

            handleCreate(e);

        } else {

            handleUpdate(e);

        }

    };

    // =========================================================
    // 14. DELETE ADMIN
    // =========================================================

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this admin?"
        );

        if (!confirmDelete) {
            return;
        }

        axios
            .delete(
                `http://127.0.0.1:8000/api/users/${id}`,
                config
            )
            .then((response) => {

                console.log(
                    "ADMIN DELETED:",
                    response.data
                );

                alert("Admin deleted successfully");

                setRefresh((item) => item + 1);

            })
            .catch((error) => {

                console.log("DELETE ERROR:", error);

                console.log(
                    "ERROR RESPONSE:",
                    error.response?.data
                );

                console.log(
                    "ERROR STATUS:",
                    error.response?.status
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to delete admin"
                );

            });

    };

    // =========================================================
    // 15. PAGE
    // =========================================================

    return (
        <div>

            <NavbarDashboard />

            <section className="AdminManagement">

                <div className="container">

                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="admin-page-header">

                        <div className="admin-page-title">

                            <div className="admin-icon">

                                <i className="fa-solid fa-user-shield"></i>

                            </div>

                            <div>

                                <h2>
                                    Admin Management
                                </h2>

                                <p>
                                    Manage system administrators
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="create-admin-btn"
                            onClick={openCreateForm}
                        >

                            <i className="fa-solid fa-plus"></i>

                            Create New Admin

                        </button>

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

                            <div className="admin-form-header">

                                <div>

                                    <h3>

                                        {editingId === null
                                            ? "Create New Admin"
                                            : "Edit Admin"}

                                    </h3>

                                    <p>

                                        {editingId === null
                                            ? "Add a new administrator account"
                                            : "Update administrator information"}

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
                                                placeholder={
                                                    editingId !== null
                                                        ? "Leave empty if unchanged"
                                                        : ""
                                                }
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

                                    {/* ROLE */}

                                    <div className="col-md-12">

                                        <div className="form-group">

                                            <label>
                                                Role
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value="Admin"
                                                disabled
                                            />

                                        </div>

                                    </div>

                                </div>

                                {/* FORM BUTTONS */}

                                <div className="admin-form-buttons">

                                    <button
                                        type="submit"
                                        className="save-admin-btn"
                                    >

                                        <i className="fa-solid fa-check"></i>

                                        {editingId === null
                                            ? "Create Admin"
                                            : "Save Changes"}

                                    </button>

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
                        ADMINS TABLE
                    ================================================= */}

                    <div className="admins-section">

                        <div className="admins-section-header">

                            <div>

                                <h3 className="admins-title">

                                    Admins

                                    <span className="badge badge-primary ml-2">

                                        {admins.length}

                                    </span>

                                </h3>

                                <p>
                                    All administrators in the system
                                </p>

                            </div>

                        </div>

                        <div className="table-responsive">

                            <table className="table admin-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>First Name</th>

                                        <th>Last Name</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                        <th>Role</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {admins.length > 0 ? (

                                        admins.map((admin) => (

                                            <tr key={admin.id}>

                                                <td>
                                                    {admin.id}
                                                </td>

                                                <td>
                                                    {admin.first_name}
                                                </td>

                                                <td>
                                                    {admin.last_name}
                                                </td>

                                                <td>
                                                    {admin.email}
                                                </td>

                                                <td>
                                                    {admin.phone}
                                                </td>

                                                <td>

                                                    <span className="role-badge">
                                                        Admin
                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            String(
                                                                admin.status
                                                            ) === "1"

                                                                ? "status-badge active"

                                                                : "status-badge inactive"
                                                        }
                                                    >

                                                        {String(
                                                            admin.status
                                                        ) === "1"

                                                            ? "Active"

                                                            : "Inactive"}

                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            type="button"
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    admin
                                                                )
                                                            }
                                                        >

                                                            <i className="fa-solid fa-pen"></i>

                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    admin.id
                                                                )
                                                            }
                                                        >

                                                            <i className="fa-solid fa-trash"></i>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="no-admins"
                                            >

                                                No admins found

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

export default AdminManagement;

