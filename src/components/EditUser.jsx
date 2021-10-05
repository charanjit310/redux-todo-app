import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router';
import { AuthsService } from '../Services/auth.service';
import { DashboardServices } from '../Services/dashboard.service';
import ErrorMessage from './ErrorMessage';
import Forms from './Resuable/Forms';
import { formValidations } from './Resuable/FormsValidations';


function EditUser({ match }) {
  const { id } = match.params; // get parameters
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // Server side errors
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({})

  const { getUserById } = DashboardServices;

  useEffect(() => {
    // console.log(`id ${id}`);
    getUserById(id).then((response) => {
      console.log(response);
      if (!response.data.data.length) {
        setErrorMsg('Invalid User')
        return false;
      }
      setUserData(response.data.data[0]);
    }).catch((error) => {
      console.log(error.response);
      // setLoader(false);
    });
  }, [])
  // console.log('userData');
  // console.log(userData);

  const submitForm = (data) => {
    console.log('edit-submitForm');
    console.log('edit-submitForm');
    console.log('edit-submitForm');
    console.log(data);
    // history.replace('/home')
    return false;
  }


  const template = {
    title: "Edit User",
    fields: [
      {
        title: 'name',
        type: "text",
        name: "name",
      },
      {
        title: 'email',
        type: "email",
        name: "email",
      },
      {
        title: 'user_type',
        type: "select",
        name: "user_type",
        values: ["Doctor", "Patient"],
        selectedValue: "Doctor"
      },
      {
        title: 'image',
        type: "image",
        name: "image",
      },
      {
        title: 'profile_pic',
        type: "file",
        name: "profile_pic",
      },
    ]
  }
  const otherData = {
    loader,
    errorMsg,
    formType: 'edit',
    userData,
  }
  const view = Object.keys(userData).length !== 0 ? (
    <div>
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
          formValidations={formValidations.editUserFormValidate}
        />
      </div>
    </div>
  ) : (
    <div>
      {(errorMsg != '') ? <ErrorMessage errorMsg={errorMsg} /> : <h2>Loading..</h2>}
    </div>
  )

  return view
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

export default EditUser
