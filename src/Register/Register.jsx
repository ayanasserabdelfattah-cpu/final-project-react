import React from 'react'
import "./Register.css"

function Register() {
  return (
    <div>


        <section class="register">


<div class="container">
    <div class="row">
        <div class="col-md-12">

<div class="d-flex justify-content-center align-items-center mt-5">
<form class="form" id="registerForm" target="_self" method="post">

    <p class="title">Register</p>

    <p class="message">Signup now and get full access to our app.</p>

    <div class="flex">
        <label>
            <input class="input" type="text" name="first_name" id="first_name" required/>
            <span>Firstname</span>
        </label>

        <label>
            <input class="input" type="text" name="last_name" id="last_name" required/>
            <span>Lastname</span>
        </label>
    </div>

    <label>
        <input class="input" type="email" name="email" id="email" required/>
        <span>Email</span>
    </label>

    <label>
        <input class="input" type="text" name="phone" id="phone" required/>
        <span>Phone</span>
    </label>

    <label>
        <input class="input" type="password" name="password" id="password" required/>
        <span>Password</span>
    </label>

    <label>
        <input class="input" type="password" name="confirm_password"  id="confirm_password" required/>
        <span>Confirm password</span>
    </label>

    <button class="submit" type="submit">Submit</button>

</form>

</div>


        </div>
    </div>
</div>


</section>


    </div>
  )
}

export default Register