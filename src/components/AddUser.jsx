import React from 'react'
import Forms from './Resuable/Forms'

function AddUser() {
  const template = {
    title: "Add User",
    fields: [
      {
        title: 'name',
        type: "text",
        fieldName: "name"
      },
      {
        title: 'email',
        type: "email",
        fieldName: "email"
      },
      {
        title: 'password',
        type: "password",
        fieldName: "password"
      },
      {
        title: 'password_confirmation',
        type: "password",
        fieldName: "password_confirmation"
      },
      {
        title: 'user_type',
        type: "select",
        fieldName: "user_type"
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
          <Forms template={template} submitForm={submitForm} />
        </div>
      </div >
    </div >
  )
}

const submitForm = (data) => {
  console.log('formdataaaa');
  console.log(data);
}
export default AddUser
