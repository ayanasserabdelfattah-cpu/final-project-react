
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./PublicProfile.css";

function PublicProfile() {

  // =============================
  // Profile Data
  // =============================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // =============================
  // Image Preview
  // =============================

  const [profileImage, setProfileImage] = useState("/img/3.avif");
  const [savedImage, setSavedImage] = useState("/img/3.avif");


  // =============================
  // Last Saved Data
  // =============================

  const [savedProfile, setSavedProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "/img/3.avif"
  });


  // =============================
  // Form / Actions
  // =============================

  const [isEditing, setIsEditing] = useState(true);


  // =============================
  // Image Preview
  // =============================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }

  };


  // =============================
  // Save
  // =============================

  const handleSave = () => {

    // حفظ آخر صورة
    setSavedImage(profileImage);

    // حفظ آخر بيانات
    setSavedProfile({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      image: profileImage
    });

    // إخفاء الـ form
    setIsEditing(false);
  };


  // =============================
  // Edit
  // =============================

  const handleEdit = () => {

    // بيانات البروفايل المحفوظة تظل موجودة
    setName(savedProfile.name);
    setEmail(savedProfile.email);
    setPassword(savedProfile.password);
    setConfirmPassword(savedProfile.confirmPassword);

    // إظهار الصورة الحالية
    setProfileImage(savedImage);

    // فتح التعديل
    setIsEditing(true);
  };


  // =============================
  // Cancel
  // =============================

  const handleCancel = () => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your changes?"
    );

    if (!confirmCancel) {
      return;
    }

    // رجوع لآخر بيانات محفوظة
    setName(savedProfile.name);
    setEmail(savedProfile.email);
    setPassword(savedProfile.password);
    setConfirmPassword(savedProfile.confirmPassword);

    // رجوع لآخر صورة محفوظة
    setProfileImage(savedImage);

    // إخفاء الـ form
    setIsEditing(false);
  };


  return (
    <div>

      <Navbar />

      {/* <!-- start profile section --> */}

      <section className="profile py-5">

        <div className="container">

          <div className="profile-card">

            <div className="text-center">

              <h2 className="profile-title mb-4">
                My Profile
              </h2>


              {/* <!-- Profile Image --> */}

              <div className="profile-image-container">

                <img
                  id="profileImage"
                  src={profileImage}
                  className="profile-image"
                  alt="Profile"
                />

              </div>


              {/* <!-- Choose Image --> */}

              <div className="choose-image mt-3">

                <label
                  htmlFor="imageInput"
                  className="choose-btn"
                >
                  <i className="fa-solid fa-camera"></i>
                  Choose File
                </label>

                <input
                  type="file"
                  id="imageInput"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <p className="image-hint">
                  Choose a profile picture
                </p>

              </div>


              {/* <!-- Profile Form --> */}

              <div
                className="profile-form"
                style={{
                  display: isEditing ? "block" : "none"
                }}
              >

                <div className="form-group">

                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirm_password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />

                </div>


                <button
                  type="button"
                  id="saveProfile"
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

              </div>


              {/* <!-- Profile Actions --> */}

              <div
                className="profile-actions"
                style={{
                  display: isEditing ? "none" : "flex"
                }}
              >

                <button
                  type="button"
                  id="editProfile"
                  className="edit-btn"
                  onClick={handleEdit}
                >
                  <i className="fa-solid fa-pen"></i>
                  Edit
                </button>


                <button
                  type="button"
                  id="cancelProfile"
                  className="delete-btn"
                  onClick={handleCancel}
                >
                  <i className="fa-solid fa-xmark"></i>
                  Cancel
                </button>

              </div>


            </div>

          </div>

        </div>

      </section>

      {/* <!-- end profile section --> */}

    </div>
  );
}

export default PublicProfile;

