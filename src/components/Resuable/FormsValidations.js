import * as yup from "yup";
export const userFormValidate = {
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(8),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  user_type: yup.string().required('PLease select'),
}

export const formValidations = {
  userFormValidate
}