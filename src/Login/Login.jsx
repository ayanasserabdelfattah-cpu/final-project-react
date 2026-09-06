import React from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'

function Login() {
return ( <div>


  <section className="login-section">

    <div className="container pl-5 pr-5">
      <div className="row">
        <div className="col-md-12">

          <div className="d-flex align-items-center justify-content-center">

            <div className="login-box">

              <div className="login-heading">
                Sign In
              </div>

              <form action="" className="login-form">

                <input
                  required
                  className="login-input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                />

                <input
                  required
                  className="login-input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />

                <span className="login-forgot-password">
                  <Link to="/#">
                    Forgot Password ?
                  </Link>
                </span>

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

)
}

export default Login
