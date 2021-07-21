import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-sm bg-light">
            <h2 className='col-md-2' style={{ color: 'red' }}>Redux-Todo </h2>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">SIgn up</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
