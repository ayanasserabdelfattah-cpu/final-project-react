import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  // لما المستخدم يكتب في الـ inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // لما المستخدم يعمل Sign In
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      console.log("LOGIN SUBMIT WORKED");
      console.log("SENDING LOGIN REQUEST...");

      console.log(
        "EMAIL SENT:",
        JSON.stringify(formData.email)
      );

      console.log(
        "PASSWORD SENT:",
        JSON.stringify(formData.password)
      );

      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log("LOGIN RESPONSE RECEIVED");
      console.log("STATUS:", response.status);
      console.log("API Response:", response.data);

      // =========================================
      // SAVE USER
      // =========================================

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // =========================================
      // SAVE TOKEN
      // =========================================

      if (response.data.token) {

        localStorage.setItem(
          "token",
          response.data.token
        );

      }

      // =========================================
      // CHECK IF USER WAS TRYING TO BOOK
      // =========================================

      const redirectAfterLogin =
        localStorage.getItem("redirectAfterLogin");

      if (redirectAfterLogin) {

        // Remove it after reading it
        localStorage.removeItem("redirectAfterLogin");

        // Return user to the page he wanted
        navigate(redirectAfterLogin);

        return;
      }

      // =========================================
      // NORMAL LOGIN
      // =========================================

      if (response.data.user.role_id === 1) {

        navigate("/AdminDashboard");

      }
      else if (response.data.user.role_id === 2) {

        navigate("/DoctorAvailiability");

      }
      else if (response.data.user.role_id === 3) {

        navigate("/RepceptionDashboard");

      }
      else if (response.data.user.role_id === 4) {

        navigate("/Home");

      }

    } catch (error) {

      console.log("LOGIN ERROR:", error);

      if (error.response) {

        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "ERROR RESPONSE:",
          error.response.data
        );

        setError(
          error.response.data.message ||
          "Invalid email or password"
        );

      } else {

        setError(
          "Cannot connect to the server"
        );

      }
    }
  };

  return (

    <div>

      <section className="login-section">

        <div className="container pl-5 pr-5">

          <div className="row">

            <div className="col-md-12">

              <div className="d-flex align-items-center justify-content-center">

                <div className="login-box">

                  <div className="login-heading">
                    Sign In
                  </div>

                  <form
                    className="login-form"
                    onSubmit={handleSubmit}
                  >

                    <input
                      required
                      className="login-input"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <input
                      required
                      className="login-input"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <span className="login-forgot-password">

                      <Link to="/#">
                        Forgot Password ?
                      </Link>

                    </span>

                    {error && (
                      <div className="text-danger mt-2">
                        {error}
                      </div>
                    )}

                    <input
                      className="login-button"
                      type="submit"
                      value="Sign In"
                    />

                  </form>

                  <span className="login-agreement">

                    <Link to="/#">
                      Learn user licence agreement
                    </Link>

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;