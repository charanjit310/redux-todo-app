import React, { useState } from 'react'
import "../assets/Register.css";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from '../Services/axiosInstance';
import { login } from '../Redux/Actions/ActionCreator';
import ErrorMessage from './ErrorMessage';

const schema = yup.object().shape({
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(8),
});

function Login() {
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
    axios.post('/login', data)
      .then((response) => {
        if (response.data.statusCode == 200) {
          dispatch(login(response.data))
          history.push('/home')
        }
      }).catch((error) => {
        console.log(error);
        if (error.response) {
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
            <h3>Login </h3>
            <div className="form-group text-center">
              <span>Don't have an account ? </span>
              <Link className="linkbtn" to="/register">Sign up</Link>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>

              {(errorMsg != '') ? <ErrorMessage errorMsg={errorMsg} /> : ''}

              <div className="form-group mb-3">
                <input type="text" {...register('email')} className="form-control" placeholder="Your Email *" />
              </div>
              <span className="red">{errors.email && errors.email.message}</span>

              <div className="form-group mb-3">
                <input type="password" {...register('password')} className="form-control" placeholder="Your Password *" />
              </div>
              <span className="red">{errors.password && errors.password.message}</span>

              <button className="btn btn-primary btnSubmit" disabled={loader}>
                {!loader || <span className="spinner-border spinner-border-sm " style={{ marginRight: '11px' }}> </span>}
                Login
              </button>

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
