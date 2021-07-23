import React from 'react'
import "../assets/Register.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6 login-form-1 ">
            <h3>Login </h3>
            <div className="form-group text-center">
              <span>Don't have an account ? </span>
              <Link className="linkbtn" to="/register">Sign up</Link>
            </div>
            <form>
              <div className="form-group mb-3">
                <input type="text" name="email" className="form-control" placeholder="Your Email *" value="" />
              </div>

              <div className="form-group mb-3">
                <input type="password" name="password" className="form-control" placeholder="Your Password *" value="" />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
              <div className="form-group text-end">
                <a href="#" className="ForgetPwd">Forget Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
