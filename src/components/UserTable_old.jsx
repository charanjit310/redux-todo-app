import React, { useState, useContext } from 'react'
import { ACTIONS, UserDataContext } from '../App';

function UserTable(props) {
  const { userDataState, dispatch } = props;
  const value = useContext(UserDataContext);
  console.log(value);
  const handleDelete = (user_id) => {
    dispatch({ type: ACTIONS.TODO_DELETE, payload: { id: user_id } });
  }
  const handleEdit = (user) => {
    console.log(user);
    value.setEditing({ status: true, userId: user.id });
    value.setEditUser({ id: user.id, fname: user.fname, lname: user.lname });
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            value.userData.map((user) => {
              return <tr key={user.id}>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="btn btn-primary" >Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger" style={{ marginLeft: 10 }}>Delete</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
