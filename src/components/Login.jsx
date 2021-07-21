import React from 'react'
import "../assets/Register.css";

function Login() {
  return (
    <div>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6 login-form-1 ">
            <h3>Login</h3>
            <form>
              <div className="form-group mb-3">
                <input type="text" className="form-control" placeholder="Your Email *" value="" />
              </div>

              <div className="form-group mb-3">
                <input type="password" className="form-control" placeholder="Your Password *" value="" />
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
