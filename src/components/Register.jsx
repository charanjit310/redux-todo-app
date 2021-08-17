import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import "../assets/Register.css";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { addUser } from '../Redux/Actions/ActionCreator';
import axios from '../Instances/axiosInstance';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(8),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  user_type: yup.string().required('PLease select'),
});

function Register() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
    // dispatch(addUser(data))
    axios.post('/register', data)
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <div>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6 login-form-1 ">
            <h3>Sign up </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="form-group mb-3">
                <input type="text" {...register('name')} className="form-control" placeholder="Your Name *" />
                <span className="red">{errors.name && errors.name.message}</span>
              </div>

              <div className="form-group mb-3">
                <input type="text" {...register('email')} className="form-control" placeholder="Your Email *" />
                <span className="red">{errors.email && errors.email.message}</span>
              </div>

              <div className="form-group mb-3">
                <input type="password" {...register('password')} className="form-control" placeholder="Your Password *" />
                <span className="red">{errors.password && errors.password.message}</span>
              </div>

              <div className="form-group mb-3">
                <input type="password" {...register('password_confirmation')} className="form-control" placeholder="Your Confirm Password *" />
                <span className="red">{errors.password_confirmation && errors.password_confirmation.message}</span>
              </div>

              <div className="form-group mb-3">
                <select className="form-control" {...register('user_type')}>
                  <option value="">Select Profile</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
                <span className="red">{errors.user_type && errors.user_type.message}</span>
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
