import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { formValidations } from './FormsValidations';
const schema = yup.object().shape(formValidations.userFormValidate);

// Resuable Form Component
function Forms({ template, submitForm }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { title, fields, } = template;

  return (
    <div className="col-md-8 login-form-1 ">
      <h3 className="float-start">{title} </h3>
      <form onSubmit={handleSubmit(submitForm)}>
        {
          fields.map((field) => {
            const { title, type, fieldName } = field;

            switch (type) {
              case "text":
                return (
                  <div className="form-group mb-3" key={fieldName}>
                    <input type={type} {...register(fieldName)} className="form-control" placeholder={`Your ${fieldName} *`} />
                    <span className="red">{errors[fieldName] && errors[fieldName].message}</span>
                  </div>
                )
              case "email":
                return (
                  <div className="form-group mb-3" key={fieldName}>
                    <input type={type} {...register(fieldName)} className="form-control" placeholder={`Your ${fieldName} *`} />
                    <span className="red">{errors[fieldName] && errors[fieldName].message}</span>
                  </div>
                )
              case "password":
                return (
                  <div className="form-group mb-3" key={fieldName}>
                    <input type={type} {...register(fieldName)} className="form-control" placeholder={`Your ${fieldName} *`} />
                    <span className="red">{errors[fieldName] && errors[fieldName].message}</span>
                  </div>
                )
              case "select":
                return (
                  <div className="form-group mb-3" key={fieldName}>
                    <select className="form-control" {...register('user_type')} >
                      <option value="">Select Profile</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                    </select>
                    <span className="red">{errors.user_type && errors.user_type.message}</span>
                  </div>
                )
              default:
                return (
                  <div className="form-group mb-3" key={fieldName}>
                    <span className="red">Invalid Field Added</span>
                  </div>
                )
            }
          })
        }

        <button className="btn btn-primary btnSubmit float-end" >Add</button>
        {/* {console.log(errors)} */}








        {/* <div className="form-group mb-3">
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

        <button className="btn btn-primary btnSubmit" >
          Add
        </button> */}

      </form>
    </div>
  )
}



export default Forms
