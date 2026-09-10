
import React, { useState } from "react";
import "./Register.css";

function Register() {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        role_id: 4
    });

    // ===============================
    // Handle Inputs
    // ===============================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // ===============================
    // Handle Register
    // ===============================

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("SUBMIT WORKED");
        console.log("SENDING REQUEST...");

        // Check Password
        if (formData.password !== formData.confirm_password) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {

            // ===============================
            // Send Request to Laravel API
            // ===============================

          console.log("BEFORE FETCH");

const response = await fetch(
    "http://localhost:8000/api/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify({
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password,
                        role_id: formData.role_id
                    })
                }
            );

            // ===============================
            // Check Response
            // ===============================

            console.log("RESPONSE RECEIVED");
            console.log("STATUS:", response.status);

            const data = await response.json();

            console.log("API Response:", data);


            // ===============================
            // Success
            // ===============================

            if (response.ok) {

                alert("User Registered Successfully");

                console.log("REGISTER SUCCESS");

            }

            // ===============================
            // Error
            // ===============================

            else {

                console.log("Validation errors:", data.data);

                alert(data.message || "Registration failed");

            }

        }

        // ===============================
        // Fetch / Connection Error
        // ===============================

        catch (error) {

            console.error("REGISTER ERROR:", error);

            alert(error.message);

        }
    };


    // ===============================
    // JSX
    // ===============================

    return (

        <div>

            <section className="register">

                <div className="container">

                    <div className="row">

                        <div className="col-md-12">

                            <div className="d-flex justify-content-center align-items-center mt-5">

                                <form
                                    className="form"
                                    id="registerForm"
                                    onSubmit={handleSubmit}
                                >

                                    <p className="title">
                                        Register
                                    </p>

                                    <p className="message">
                                        Signup now and get full access to our app.
                                    </p>


                                    {/* First Name + Last Name */}

                                    <div className="flex">

                                        <label>

                                            <input
                                                className="input"
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                required
                                            />

                                            <span>
                                                Firstname
                                            </span>

                                        </label>


                                        <label>

                                            <input
                                                className="input"
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                            />

                                            <span>
                                                Lastname
                                            </span>

                                        </label>

                                    </div>


                                    {/* Email */}

                                    <label>

                                        <input
                                            className="input"
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />

                                        <span>
                                            Email
                                        </span>

                                    </label>


                                    {/* Phone */}

                                    <label>

                                        <input
                                            className="input"
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                        <span>
                                            Phone
                                        </span>

                                    </label>


                                    {/* Password */}

                                    <label>

                                        <input
                                            className="input"
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                        <span>
                                            Password
                                        </span>

                                    </label>


                                    {/* Confirm Password */}

                                    <label>

                                        <input
                                            className="input"
                                            type="password"
                                            name="confirm_password"
                                            id="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            required
                                        />

                                        <span>
                                            Confirm password
                                        </span>

                                    </label>


                                    {/* Submit */}

                                    <button
                                        className="submit"
                                        type="submit"
                                    >
                                        Submit
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Register;
