import React from 'react'
import { Link } from 'react-router-dom';
import "../assets/Register.css";

function Register() {
  return (
    <div>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6 login-form-1 ">
            <h3>Sign up </h3>
            <form>
              <div className="form-group mb-3">
                <input type="text" className="form-control" placeholder="Your Name *" value="" />
              </div>

              <div className="form-group mb-3">
                <input type="text" className="form-control" placeholder="Your Email *" value="" />
              </div>

              <div className="form-group mb-3">
                <input type="password" className="form-control" placeholder="Your Password *" value="" />
              </div>
              <div className="form-group mb-3">
                <input type="submit" className="btnSubmit" value="Sign up" />
              </div>
              <div className="form-group text-center ">
                <span>Already have account? </span><Link className="ForgetPwd" to="/">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
