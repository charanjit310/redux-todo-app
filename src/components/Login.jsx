import React from 'react'
import "../assets/Register.css";
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(8),
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
  }
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
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="form-group mb-3">
                <input type="text" {...register('email')} className="form-control" placeholder="Your Email *" />
              </div>
              <span className="red">{errors.email && errors.email.message}</span>

              <div className="form-group mb-3">
                <input type="password" {...register('password')} className="form-control" placeholder="Your Password *" />
              </div>
              <span className="red">{errors.password && errors.password.message}</span>

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
