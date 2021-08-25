import React, { useState, useEffect, useCallback } from 'react'
import "../assets/CustomTables.css";
import { useSelector, useDispatch } from 'react-redux'
import { DashboardServices } from '../Services/dashboard.service';
import Pagination from 'react-js-pagination';

function Home() {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setpaginationData] = useState([])

  useEffect(() => {
    let isSubscribed = true
    DashboardServices.list({ 'role': 'clinic', 'page': currentPage }).then((res) => {
      if (isSubscribed) {
        console.log(res.data);
        setUserList(res.data.data.data)
        setpaginationData(res.data.data)
        setLoading(false)
      }
    }).catch((error) => {
      if (error.response) {
        // setErrorMsg(error.response.data.message)
      }
    })

    return () => isSubscribed = false // cleanup function 

  }, [currentPage]);

  const handleEdit = (id) => {
    alert(id)
  }

  const handleDelete = (id) => {
    alert(id)
  }

  const renderList = (list) => {
    return (
      list.map((list) => {
        return (
          <tr key={list.id}>
            <td>{list.id}</td>
            <td>{list.name}</td>
            <td>{list.email}</td>
            <td>{list.phone}</td>
            <td>
              <button onClick={() => handleEdit(list.id)} className="btn btn-primary" >Edit</button>
              <button onClick={() => handleDelete(list.id)} className="btn btn-danger" style={{ marginLeft: 10 }}>Delete</button>
            </td>
          </tr>
        )
      })
    )
  }

  const renderPaginatioin = ({ current_page, total, per_page }) => {
    return (
      <div className="col-12 mt-4 text-end">
        <Pagination
          activePage={current_page}
          totalItemsCount={total}
          itemsCountPerPage={per_page}
          itemClass='page-item'
          linkClass='page-link'
          firstPageText='First'
          lastPageText='Last'
          onChange={(pageNumber) => {
            setCurrentPage(pageNumber)
          }}
        />
      </div>
    )
  }

  // // Logic for displaying todos
  // const indexOfLastTodo = currentPage * perPage;
  // const indexOfFirstTodo = indexOfLastTodo - perPage;
  // const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  // // https://academind.com/tutorials/reactjs-pagination/
  // // https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-3/
  // // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-react
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
                {!loading && renderList(userList)}
              </tbody>
            </table>
            {!loading && renderPaginatioin(paginationData)}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home
