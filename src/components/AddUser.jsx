import axios from 'axios'
import React from 'react'
import { AuthsService } from '../Services/auth.service'
import Forms from './Resuable/Forms'

function AddUser() {
  const template = {
    title: "Add User",
    fields: [
      {
        title: 'name',
        type: "text",
        name: "name"
      },
      {
        title: 'email',
        type: "email",
        name: "email"
      },
      {
        title: 'password',
        type: "password",
        name: "password"
      },
      {
        title: 'password_confirmation',
        type: "password",
        name: "password_confirmation"
      },
      {
        title: 'user_type',
        type: "select",
        name: "user_type"
      },
      {
        title: 'profile_pic',
        type: "file",
        name: "profile_pic"
      },
    ]
  }
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div>
            <div className="col-md-4 py-4 float-start">
            </div>
          </div>
          <Forms
            template={template}
            watchFields={["name", "email"]}
            validate={validate}
            submitForm={submitForm}
          />
        </div>
      </div >
    </div >
  )
}

const submitForm = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key][0] instanceof File) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  // for (let [key, value] of formData) { // log FormData 
  //   console.log(`${key}: ${value}`)
  // }

  axios.post(`${AuthsService.baseURL}add-user`, formData, AuthsService.formDataConfig)
    .then((response) => {
      console.log(response);
      if (response.data.statusCode == 200) {
        // dispatch(login(response.data))
        // history.push('/home')
      }
    }).catch((error) => {
      console.log(error);
      // if (error.response) {
      //   setErrorMsg(error.response.data.message)
      // }
      // setLoader(false);
    });

  return;
}

const validate = (watchEmailField, errorMethods) => {
  const { errors, setError, clearErrors } = errorMethods;
  // console.log(errors);
  if (watchEmailField === "admin@yopmail.com") {
    if (!errors['email']) {
      setError('email', {
        type: 'manual',
        message: 'You cannot use this Email'
      })
    }
  } else {
    if (errors['email'] && errors['email']['type'] === 'manual') {
      clearErrors('email')
    }
  }
}

// var formData = new FormData();
// function objectToFormData(obj, rootName) {
//   function appendFormData(data, root) {
//     root = root || '';
//     if (data instanceof File) {
//       formData.append(root, data);
//     } else if (Array.isArray(data)) {
//       for (var i = 0; i < data.length; i++) {
//         appendFormData(data[i], root + '[' + i + ']');
//       }
//     } else if (typeof data === 'object' && data) {
//       for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//           if (root === '') {
//             appendFormData(data[key], key);
//           } else {
//             appendFormData(data[key], root + '[' + key + ']');
//           }
//         }
//       }
//     } else {
//       if (data !== null && typeof data !== 'undefined') {
//         formData.append(root, data);
//       }
//     }
//   }
//   appendFormData(obj, rootName);

//   return formData;
// }

// const registration = objectToFormData(payload.registration, 'registration');

export default AddUser
