import React, { useState, useEffect, useCallback } from 'react'
import "../assets/CustomTables.css";
import { useSelector, useDispatch } from 'react-redux'
import { DashboardServices } from '../Services/dashboard.service';
import Pagination from 'react-js-pagination';
import UserLists from './UserItems';

function Home() {
  const dispatch = useDispatch();
  const [pageRenderCount, setPageRenderCount] = useState(1)
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

  const handleEdit = useCallback( // useCallback memoize function and re-create function when UserList updated
    (id) => {
      console.log('handleEdit');
      setPageRenderCount(pageRenderCount + 1);
    },
    [userList],
  )

  const handleDelete = useCallback(
    (id) => {
      console.log('handleDelete');
    },
    [userList],
  )

  const renderPagination = ({ current_page, total, per_page }) => {
    return (
      <div className="col-12 mt-4">
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

  // https://academind.com/tutorials/reactjs-pagination/
  // https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-3/
  // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-react
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
                {loading && <tr><td colSpan="5" className="text-center"><span className="spinner-grow text-primary"> </span></td></tr>}
                <UserLists handleEdit={handleEdit} handleDelete={handleDelete} list={userList} />
              </tbody>
            </table>
            {!loading && renderPagination(paginationData)}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home
