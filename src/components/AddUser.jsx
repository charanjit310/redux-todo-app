import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { AuthsService } from '../Services/auth.service'
import { objToFormdata } from '../Services/formData.service'
import Forms from './Resuable/Forms'
import { formValidations } from './Resuable/FormsValidations';

function AddUser() {
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // Server side errors
  const history = useHistory();

  const submitForm = (data) => {
    setLoader(!loader);

    const formData = objToFormdata.fnObjToFormdata(data);
    // for (let [key, value] of formData) { // log FormData 
    //   console.log(`${key}: ${value}`)
    // }

    axios.post(`${AuthsService.baseURL}add-user`, formData, AuthsService.formDataConfig)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode == 200) {
          history.replace('/home')
        }
      }).catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.message)
        setLoader(false);
      });

    return;
  }
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
        name: "user_type",
        values: ["Doctor", "Patient"],
      },
      {
        title: 'profile_pic',
        type: "file",
        name: "profile_pic"
      },
    ]
  }
  const otherData = {
    loader,
    errorMsg,
    formType: 'create'
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
            otherData={otherData}
            formValidations={formValidations.userFormValidate}
          />
        </div>
      </div>
    </div >
  )
}

const validate = (watchEmailField, errorMethods) => {
  const { errors, setError, clearErrors } = errorMethods;
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

export default AddUser
