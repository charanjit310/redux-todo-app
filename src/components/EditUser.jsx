import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router';
import { AuthsService } from '../Services/auth.service';
import { DashboardServices } from '../Services/dashboard.service';
import { objToFormdata } from '../Services/formData.service';
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

  const submitForm = (data) => {
    setLoader(true)
    data = { ...data, user_id: id }

    const formData = objToFormdata.fnObjToFormdata(data);
    // for (let [key, value] of formData) { // log FormData 
    //   console.log(`${key}: ${value}`)
    // }

    axios.post(`${AuthsService.baseURL}profile-update`, formData, AuthsService.formDataConfig)
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
