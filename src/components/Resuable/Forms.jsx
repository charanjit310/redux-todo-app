import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { formValidations } from './FormsValidations';
import ErrorMessage from '../ErrorMessage';
const schema = yup.object().shape(formValidations.userFormValidate);

// Resuable Form Component
function Forms({ template, submitForm, watchFields, validate, otherData }) {
  const { loader, errorMsg, formType, userData } = otherData;
  console.log('form userData');
  console.log(userData);
  let preLoadedValues = { name: 'ssssssssss', email: 'sss' }
  if (userData) {
    preLoadedValues = { name: `${userData?.name}`, email: `${userData?.email}` }
  }
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm({
    defaultValues: preLoadedValues,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  // const watchEmailField = watch(); // will watch all fields
  // const watchEmailField = watch(["name", "email"]); // watch array of fields
  const watchEmailField = watch('email'); // will watch Email field
  validate(watchEmailField, { errors, setError, clearErrors })

  const { title, fields } = template;

  return (
    <div className="col-md-8 login-form-1 ">
      <form onSubmit={handleSubmit(submitForm)} >
        {(errorMsg != '') ? <ErrorMessage errorMsg={errorMsg} /> : ''}
        <h3 className="float-start">{title} </h3>
        {
          fields.map((field) => {
            const { title, type, name: fieldName } = field; // destructuring and renaming the field as well 

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
                    <input type={type} {...register(fieldName)} name="email" className="form-control" placeholder={`Your ${fieldName} *`} />
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
                    <select className="form-control" {...register(fieldName)} >
                      <option value="">Select Profile</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                    </select>
                    <span className="red">{errors[fieldName] && errors[fieldName].message}</span>
                  </div>
                )
              case "file":
                return (
                  <div className="form-group mb-3" key={fieldName}>
                    <input type={type} {...register(fieldName)} className="form-control" />
                    <span className="red">{errors[fieldName] && errors[fieldName].message}</span>
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

        <button className="btn btn-primary btnSubmit float-end" disabled={loader}>
          {!loader || <span className="spinner-border spinner-border-sm " style={{ marginRight: '11px' }}> </span>}
          Submit
        </button>
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
