import React, { useState } from 'react'
import "../assets/Register.css";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import axios from '../Services/axiosInstance';

import ErrorMessage from './ErrorMessage';
import { login } from '../Redux/Actions/ActionCreator';

const schema = yup.object().shape({
  email: yup.string().email('Email must be valid').required('Email is required'),
  otp: yup.string().required('OTP is required').min(5).max(8),
});

function VerifyOTP() {
  const [loader, setLoader] = useState(false);
  let [errorMsg, setErrorMsg] = useState('');
  let history = useHistory();
  const dispatch = useDispatch();


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
    setLoader(true);
    axios.post('/validate-otp', data)
      .then((response) => {
        console.log(response.data);
        setLoader(false);
        if (response.data.statusCode == 200) {
          dispatch(login(response.data))
          history.push('/')
        }
      }).catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          setErrorMsg(error.response.data.message)
        }
        setLoader(false);
      });
  }
  return (
    <div>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6 login-form-1 ">
            <h3>Verify OTP </h3>

            <form onSubmit={handleSubmit(submitForm)}>

              {(errorMsg != '') ? <ErrorMessage errorMsg={errorMsg} /> : ''}

              <div className="form-group mb-3">
                <input type="text" {...register('email')} className="form-control" placeholder="Your Email *" />
                <span className="red">{errors.email && errors.email.message}</span>
              </div>

              <div className="form-group mb-3">
                <input type="text" {...register('otp')} className="form-control" placeholder="Enter OTP *" />
                <span className="red">{errors.otp && errors.otp.message}</span>
              </div>

              <button className="btn btn-primary btnSubmit" disabled={loader}>
                {!loader || <span className="spinner-border spinner-border-sm " style={{ marginRight: '11px' }}> </span>}
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default VerifyOTP
