import React from 'react'
import "../assets/Register.css";
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email('Email must be valid').required('Email is required'),
  otp: yup.string().required('OTP is required').min(6).max(8),
});

function VerifyOTP() {
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
            <h3>Verify OTP </h3>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="form-group mb-3">
                <input type="text" {...register('email')} className="form-control" placeholder="Your Email *" />
              </div>
              <span className="red">{errors.email && errors.email.message}</span>

              <div className="form-group mb-3">
                <input type="text" {...register('otp')} className="form-control" placeholder="Enter OTP *" />
              </div>
              <span className="red">{errors.otp && errors.otp.message}</span>

              <div className="form-group text-center">
                <input type="submit" className="btnSubmit col-md-12" value="Verify OTP" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP
