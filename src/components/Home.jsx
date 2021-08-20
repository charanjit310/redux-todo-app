import React, { useState, useEffect } from 'react'
import "../assets/CustomTables.css";
import { useSelector, useDispatch } from 'react-redux'
import { DashboardServices } from '../Services/dashboard.service';

function Home() {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isSubscribed = true
    DashboardServices.list({ 'role': 'clinic' }).then((res) => {
      if (isSubscribed) {
        console.log(res.data);
        setUserList(res.data.data.data)
        setLoading(false)
      }
    }).catch((error) => {
      if (error.response) {
        // setErrorMsg(error.response.data.message)
      }
    })

    return () => isSubscribed = false // cleanup function 

  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="py-4">
            <h2>User Listing</h2>
          </div>
          <div className="col-md-12" style={{ background: '' }}>
            <table className="" id="customers">
              <thead className="">
                <tr>
                  <th>S.no.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="5" className="text-center"><span className="spinner-grow text-primary " style={{ marginRight: '11px' }}> </span></td></tr>}
                {
                  userList.map((list) => {
                    return <tr key={list.id}>
                      <td>{list.id}</td>
                      <td>{list.name}</td>
                      <td>{list.email}</td>
                      <td>{list.phone}</td>
                      <td>
                        <button className="btn btn-primary" >Edit</button>
                        <button className="btn btn-danger" style={{ marginLeft: 10 }}>Delete</button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="row" style={{ background: 'grey' }}>
          <b>TWO</b>
        </div> */}
      </div>
    </div >
  )
}

export default Home
