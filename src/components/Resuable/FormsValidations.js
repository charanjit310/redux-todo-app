import * as yup from "yup";

export const userFormValidate = {
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required').min(6).max(8),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  user_type: yup.string().required('PLease select'),
  profile_pic: yup.mixed().required('please select Image')
  // .test('fileType', 'Unsupported File Format', function (value) {
  //   const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  //   return SUPPORTED_FORMATS.includes(value.type)
  // })
  // .test('fileSize', "File Size is too large", value => {
  //   const sizeInBytes = 500000;//0.5MB
  //   return value.size <= sizeInBytes;
  // })
}

export const formValidations = {
  userFormValidate
}