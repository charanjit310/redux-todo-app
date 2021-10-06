import React, { useState, useEffect, useCallback } from 'react'
import "../assets/CustomTables.css";
import { useSelector, useDispatch } from 'react-redux'
import { DashboardServices } from '../Services/dashboard.service';
import Pagination from 'react-js-pagination';
import UserLists from './UserItems';
import { Link, useHistory } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageRenderCount, setPageRenderCount] = useState(1)
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setpaginationData] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    console.log('sssssssss');
    let isSubscribed = true
    DashboardServices.list({ 'role': 'Doctor', 'page': currentPage }).then((res) => {
      if (isSubscribed) {
        // console.log(res.data);
        setUserList(res.data.data.data)
        setpaginationData(res.data.data)
        setTotal(res.data.data.total)
        setLoading(false)
      }
    }).catch((error) => {
      // setErrorMsg(error.response.data.message)
    })

    // DashboardServices.asyncList({ 'role': 'clinic', 'page': currentPage }).then((resss) => {
    //   // console.log(resss);
    //   console.log(3)
    // }).catch((error) => {
    //   // console.log(error.response);
    // });

    return () => isSubscribed = false // cleanup function 

  }, [currentPage]);

  const handleEdit = useCallback( // useCallback memoize function and re-create function when UserList updated
    (id) => {
      history.replace(`/edit-user/${id}`)
      setPageRenderCount(pageRenderCount + 1);
    },
    [userList],
  )

  const handleDelete = useCallback(
    (id) => {
      console.log('handleDelete');
      DashboardServices.deleteItem({ user_id: id }).then((res) => {
        const result = userList.filter(item => item.id != id);
        setUserList(result)
        setTotal(prevTotal => prevTotal - 1)
      }).catch((error) => {
        // console.log(error.response);
      })
    },
    [userList],
  )
  const renderPagination = ({ current_page, per_page }) => {
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

  const handleSearch = (e) => {
    const val = e.target.value.trim();
    if (!!userList.length && !!val.length) {
      console.log(userList);
      let userListNew = userList.filter((list) => {
        if (list.name.includes(val)) { // includes() method determines whether a string contains the given characters within it or not.
          return list
        }
      })
      setUserList(userListNew)
    }
  }
  // https://academind.com/tutorials/reactjs-pagination/
  // https://hemanta.io/implement-pagination-search-and-filter-in-a-react-app-part-3/
  // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-react
  return (
    <div>
      <div className="container">
        <div className="row">
          <div>
            <div className="col-md-4 py-4 float-start">
              <h2>User Listing</h2>
            </div>
            <div className="col-md-4 py-4 float-end text-end">
              <a href="" className=""></a>
              <Link className="btn btn-primary" to="/add-user">Add User</Link>
            </div>
          </div>
          <div className="col-md-12" style={{ background: '' }}>
            <div className="form-group mb-3 col-md-3 float-end">
              <input type="search" onChange={(e) => handleSearch(e)} className="form-control" placeholder="Search.." />
            </div>

            <table className="" id="customers">
              <thead className="">
                <tr>
                  <th>S.no.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="5" className="text-center"><span className="spinner-grow text-primary"> </span></td></tr>}
                {userList && <UserLists handleEdit={handleEdit} handleDelete={handleDelete} list={userList} />}
                {
                  !userList.length && !loading && <tr><td colSpan="5" className=""><span className="text-primary"> No record found </span></td></tr>
                }
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
