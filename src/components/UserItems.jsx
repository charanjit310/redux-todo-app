import React, { Fragment } from 'react'

const UserLists = ({ handleEdit, handleDelete, list }) => {
  return (
    <Fragment>
      {
        list.map((list) => {
          return (
            <tr key={list.id}>
              <td>{list.id}</td>
              <td>{list.name}</td>
              <td>{list.email}</td>
              <td>{list.dummy_phone}</td>
              <td className="text-center">
                <button onClick={() => handleEdit(list.id)} className="btn btn-primary" >Edit</button>
                <button onClick={() => handleDelete(list.id)} className="btn btn-danger" style={{ marginLeft: 10 }}>Delete</button>
              </td>
            </tr>
          )
        })
      }
    </Fragment>
  )
}

export default UserLists