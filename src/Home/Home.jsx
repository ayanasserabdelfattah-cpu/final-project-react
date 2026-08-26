import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <div>

    <Navbar />



      {/* ==================== HOME SECTION ==================== */}
      <main className="home">
        <div className="container">
          <div className="row">
            <div className="col-md-12 medical">

              <img
                src="/img/section-img.png"
                className="img-fluid"
                alt="section"
              />

              <h5 className="d-inline-block">
                WE GIVE YOU THE BEST
              </h5>

              <h2>
                We Provide <span>Medical</span> Services <br />
                That You Can <span>Trust</span>
              </h2>

              <p>
                We are dedicated to providing high-quality <br />
                healthcare services with experienced doctors
                <br />
                and advanced medical care.
              </p>

              <Link
                to="/Contact"
                className="btn btn-primary me-3"
              >
                Get Appointment
              </Link>

              <Link
                to="/Contact"
                className="btn btn-dark"
              >
                Contact Now
              </Link>

            </div>
          </div>
        </div>
      </main>


      {/* ==================== ABOUT HOME SECTION ==================== */}
      <section className="about-home">

        <div className="container pe-5 ps-5">

          <div className="row">

            <div className="col-md-12">

              <div className="text-center">

                <h2>
                  We Offer Different Services To <br />
                  Improve Your Health
                </h2>

                <img
                  src="/img/section-img.png"
                  className="img-fluid mb-3 mt-3"
                  alt="section"
                />

                <h6>
                  Our medical services are designed to meet your needs
                  <br />
                  and provide you with the best care possible.
                </h6>

              </div>

            </div>

          </div>


          <div className="row mt-5">

            {/* ABOUT TEXT */}
            <div className="col-md-6">

              <h2 className="know">
                Who We Are
              </h2>

              <hr />

              <p>
                We are a trusted healthcare center dedicated to providing
                high-quality medical care and putting our patients’ health
                and comfort first.
              </p>

              <p className="mt-3">
                Our team of experienced doctors and healthcare professionals
                is committed to delivering personalized care using modern
                medical services and technology.
              </p>


              <div className="d-flex mt-4 mb-5">

                <div className="me-5">

                  <p>
                    <i
                      className="fa-solid fa-circle-chevron-right"
                      style={{ color: "rgb(116, 192, 252)" }}
                    ></i>{" "}
                    Experienced Doctors
                  </p>

                  <p>
                    <i
                      className="fa-solid fa-circle-chevron-right"
                      style={{ color: "rgb(116, 192, 252)" }}
                    ></i>{" "}
                    High-Quality Healthcare
                  </p>

                  <p>
                    <i
                      className="fa-solid fa-circle-chevron-right"
                      style={{ color: "rgb(116, 192, 252)" }}
                    ></i>{" "}
                    Modern Technology
                  </p>

                </div>


                <div>

                  <p>
                    <i
                      className="fa-solid fa-circle-chevron-right"
                      style={{ color: "rgb(116, 192, 252)" }}
                    ></i>{" "}
                    Patient-Centered Care
                  </p>

                  <p>
                    <i
                      className="fa-solid fa-circle-chevron-right"
                      style={{ color: "rgb(116, 192, 252)" }}
                    ></i>{" "}
                    Easy Appointment
                  </p>

                  <p>
                    <i
                      className="fa-solid fa-circle-chevron-right"
                      style={{ color: "rgb(116, 192, 252)" }}
                    ></i>{" "}
                    Medical Services
                  </p>

                </div>

              </div>

            </div>


            {/* ABOUT IMAGE */}
            <div className="col-md-6 text-center">

              <img
                src="/img/blog-2.jpeg"
                className="img-fluid wow animate__animated animate__backInRight"
                width="550"
                alt="medical"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================== INFO HOME SECTION ==================== */}
      <section className="info_home">

        <div className="container">

          <div className="row">

            <div className="col-md-3 icon text-center">

              <img
                src="/img/png-clipart-hospital-logo-clinic-health-care-physician-business.png"
                className="img-fluid w-50 rounded-5 wow animate__animated animate__bounce"
                alt="hospital"
              />

            </div>


            <div className="col-md-3 icon text-center">

              <img
                src="/img/Ayurveda-MadhavbaugClinic-Thane-7fb9a6.jpg"
                className="img-fluid w-50 rounded-5 wow animate__animated animate__bounce"
                alt="clinic"
              />

            </div>


            <div className="col-md-3 icon text-center">

              <img
                src="/img/pngtree-simple-and-atmospheric-hand-drawn-heart-shaped-line-hospital-logo-png-image_4241033.png"
                className="img-fluid w-50 rounded-5 wow animate__animated animate__bounce"
                alt="hospital"
              />

            </div>


            <div className="col-md-3 icon text-center">

              <img
                src="/img/doctor-3.avif"
                className="img-fluid w-50 rounded-5 wow animate__animated animate__bounce"
                alt="doctor"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================== VIDEO HOME SECTION ==================== */}
      <section className="video_home">

        <div className="container">

          <div className="row">

            <div className="col-md-12">

              <div className="text-center">

                <h2>
                  Learn More About Our Medical Services
                </h2>

                <img
                  src="/img/section-img.png"
                  className="img-fluid mb-3 mt-3"
                  alt="section"
                />

              </div>

            </div>

          </div>


          <div className="row mt-5">

            {/* VIDEO */}
            <div className="col-md-12 col-lg-6">

              <div className="text-center">

                <video
                  controls
                  autoPlay
                  muted
                  loop
                  className="img-fluid"
                >

                  <source
                    src="/videos/stock-footage-anatomy-word-concept-animation-human-organs-physiology-medical-science-biology-dynamic-text.webm"
                    type="video/webm"
                  />

                  Your browser does not support the video tag.

                </video>


                {/* LIKE / UNLIKE */}
                <div className="d-flex justify-content-center mb-3 mt-3 text-center">

                  <div className="like-unlike-radio">

                    <div>

                      <input
                        defaultChecked
                        id="like"
                        name="feedback"
                        value="like"
                        className="custom-radio-fb"
                        type="radio"
                      />

                      <label
                        htmlFor="like"
                        className="feedback-label"
                      >

                        <svg
                          className="icon"
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >

                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.7229 26.5H5.92292V10.9008H0.7229V26.5ZM26.6299 15.2618L24.372 23.7566C23.9989 25.3696 22.5621 26.5 20.9072 26.5H8.52293V10.9278L10.7573 2.87293C10.9669 1.50799 12.1418 0.5 13.524 0.5C15.0699 0.5 16.323 1.7527 16.323 3.29837V10.8998H23.1651C25.4519 10.9009 27.1453 13.0335 26.6299 15.2618Z"
                            fill="currentColor"
                          />

                        </svg>

                        {" "}Like

                      </label>

                    </div>


                    <div>

                      <input
                        name="feedback"
                        value="unlike"
                        id="unlike"
                        className="custom-radio-fb"
                        type="radio"
                      />

                      <label
                        htmlFor="unlike"
                        className="feedback-label"
                      >

                        <svg
                          className="icon"
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >

                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.7229 0.5L21.5229 0.5L21.5229 16.0992L26.7229 16.0992L26.7229 0.5ZM0.815853 11.7382L3.07376 3.24339C3.44687 1.63037 4.88372 0.500027 6.53861 0.500027L18.9229 0.500028L18.9229 16.0722L16.6885 24.1271C16.4789 25.492 15.304 26.5 13.9218 26.5C12.3759 26.5 11.1228 25.2473 11.1228 23.7016L11.1228 16.1002L4.28068 16.1002C1.99391 16.0991 0.300502 13.9664 0.815853 11.7382Z"
                            fill="currentColor"
                          />

                        </svg>

                        {" "}Unlike

                      </label>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* NEWS / SERVICE */}
            <div className="col-md-12 col-lg-6 text-center">

              <div className="d-flex flex-column align-items-start time text-center">

                <img
                  src="/img/blog-3.jpg"
                  className="img-fluid mb-4 img"
                  alt="medical service"
                />

                <button
                  type="button"
                  className="btn btn-primary mb-2 rounded-3"
                >
                  22 Aug, 2023
                </button>

                <h4 className="mt-3">
                  We have <span>announced</span> our new product
                </h4>

                <p>
                  We are excited to announce the launch of our new medical
                  service, developed in partnership with our trusted healthcare
                  partners to provide better care and improved services
                  for our patients.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================== CALL HOME SECTION ==================== */}
      <section className="call_home">

        <div className="container">

          <div className="row">

            <div className="col-md-12">

              <div className="text-center">

                <h2 className="mb-5">
                  Do You Need Emergency Medical Care?
                  <br />
                  Call : 1234 56789
                </h2>

                <Link
                  to="/contact"
                  className="btn btn-primary mt-3 me-4 fw-bolder"
                >
                  Contact Now
                </Link>


                <Link
                  className="learn-more"
                  to="/About"
                >

                  <span
                    className="circle"
                    aria-hidden="true"
                  >

                    <span className="icon arrow"></span>

                  </span>

                  <span className="button-text">
                    Learn More
                  </span>

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================== OPINIONS HOME SECTION ==================== */}
      <section
        className="opinion-home"
        id="testimonials"
      >

        <div className="container">

          <div className="row">

            <div className="col-md-12">

              <h2 className="text-center">
                WHAT OUR CLIENTS SAY
              </h2>

            </div>

          </div>


          <div className="row">

            {/* CLIENT 1 */}
            <div className="col-lg-4 col-md-6">

              <div className="text-center cards">

                <img
                  src="/img/person1.jpg"
                  className="img-fluid"
                  alt="client"
                />

                <h5 className="mb-3">
                  Mohamed Ramadan
                </h5>

                <p>
                  The doctors were very professional and caring. The staff
                  was friendly, the service was excellent, and I felt
                  comfortable throughout my entire visit!
                </p>

              </div>

            </div>


            {/* CLIENT 2 */}
            <div className="col-lg-4 col-md-6">

              <div className="text-center cards">

                <img
                  src="/img/person2.jpg"
                  className="img-fluid"
                  alt="client"
                />

                <h5 className="mb-3">
                  Islam Mohamed
                </h5>

                <p>
                  I had a great experience at this medical center. The doctor
                  listened carefully, explained everything clearly, and the
                  staff made my visit very comfortable!
                </p>

              </div>

            </div>


            {/* CLIENT 3 */}
            <div className="col-lg-4 col-md-6">

              <div className="text-center cards">

                <img
                  src="/img/person3.jpg"
                  className="img-fluid"
                  alt="client"
                />

                <h5 className="mb-3">
                  Mostafa Ashraf
                </h5>

                <p>
                  Excellent service and a very professional team. The
                  appointment was well organized, the doctor was helpful,
                  and I received the care I needed!
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================== REVIEW SECTION ==================== */}
      <section className="review_home">

        <div className="container ps-5 pe-5">

          <div className="row justify-content-center">

            {/* REVIEW FORM */}
            <div className="col-md-6 mb-5">

              <div className="card">

                <div className="bg">

                  <div className="text-center p-2 review">

                    <h5>
                      Leave Your Review
                    </h5>

                    <hr />

                    <p>
                      Your feedback means a lot to us.
                    </p>


                    <form
                      action="#"
                      method="post"
                      target="_self"
                    >

                      {/* STAR RATING */}
                      <div className="rating">

                        <input
                          type="radio"
                          id="star5"
                          name="rate"
                          value="5"
                        />

                        <label
                          htmlFor="star5"
                          title="5 stars"
                        >

                          <svg
                            viewBox="0 0 576 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="star-solid"
                          >

                            <path
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />

                          </svg>

                        </label>


                        <input
                          type="radio"
                          id="star4"
                          name="rate"
                          value="4"
                          required
                        />

                        <label
                          htmlFor="star4"
                          title="4 stars"
                        >

                          <svg
                            viewBox="0 0 576 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="star-solid"
                          >

                            <path
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 8-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />

                          </svg>

                        </label>


                        <input
                          type="radio"
                          id="star3"
                          name="rate"
                          value="3"
                        />

                        <label
                          htmlFor="star3"
                          title="3 stars"
                        >

                          <svg
                            viewBox="0 0 576 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="star-solid"
                          >

                            <path
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 0-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />

                          </svg>

                        </label>


                        <input
                          type="radio"
                          id="star2"
                          name="rate"
                          value="2"
                        />

                        <label
                          htmlFor="star2"
                          title="2 stars"
                        >

                          <svg
                            viewBox="0 0 576 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="star-solid"
                          >

                            <path
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 0-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />

                          </svg>

                        </label>


                        <input
                          type="radio"
                          id="star1"
                          name="rate"
                          value="1"
                        />

                        <label
                          htmlFor="star1"
                          title="1 star"
                        >

                          <svg
                            viewBox="0 0 576 512"
                            height="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            className="star-solid"
                          >

                            <path
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 0-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />

                          </svg>

                        </label>

                      </div>


                 
    <textarea name="message" placeholder="comment.." rows="1" cols="18" class="ml-2"></textarea>

    <input type="submit" class="btn btn-primary  rounded-3"  value="Send" ></input>

                    </form>

                  </div>

                </div>

                <div className="blob"></div>

              </div>

            </div>


            {/* REVIEW IMAGE */}
            <div className="col-md-6">

              <img
                src="/img/about-img.jpeg"
                className="img-fluid"
                alt="about"
              />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;