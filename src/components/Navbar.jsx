import React from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import { AuthsService } from '../Services/auth.service';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Redux/Actions/ActionCreator';

function Navbar() {
  let history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault()
    const loggedIn = AuthsService.isLoggedIn()
    if (!loggedIn) {
      history.push('/login')
    }

    dispatch(logout())
    history.push('/login')
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-sm bg-light">
            <h2 className='col-md-2' style={{ color: 'red' }}>Redux-Todo </h2>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>Log out</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
