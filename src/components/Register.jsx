import React from 'react'
import { Link } from 'react-router-dom';
import "../assets/Register.css";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required('Name is required'),
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(8),
});

function Register() {
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
            <h3>Sign up </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="form-group mb-3">
                <input type="text" {...register('fullname')} className="form-control" autoComplete="off" placeholder="Your Name *" />
                <span className="red">{errors.fullname && errors.fullname.message}</span>
              </div>

              <div className="form-group mb-3">
                <input type="text" {...register('email')} className="form-control" autoComplete="off" placeholder="Your Email *" />
                <span className="red">{errors.email && errors.email.message}</span>
              </div>

              <div className="form-group mb-3">
                <input type="password" {...register('password')} className="form-control" autoComplete="off" placeholder="Your Password *" />
                <span className="red">{errors.password && errors.password.message}</span>
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
