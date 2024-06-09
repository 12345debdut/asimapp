import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';

export default function CommonUserNavBar(){
    return(
<nav className="navbar navbar-expand-lg navbar-light common-nav-bar">
  <Link className="navbar-brand common-nav-bar-text" to="/">Asim Math</Link>
  <button className="navbar-toggler background-icon" type="button"  data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link className="nav-link common-nav-bar-text" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/aboutus">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/allGalleries">Gallery</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/videos">Videos</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link common-nav-bar-text" href="/practice/">Practice exam</a>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/contactus">Contact us</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/review">Review us</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/faq">Faq</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link common-nav-bar-text" to="/courses">Courses</Link>
      </li>
    </ul>
    <Link  to="/login" style={{textDecoration:"none"}}><div className="my-2 my-lg-0 login-div">
     <span className="login-text" >Login</span>
    </div></Link>
  </div>
</nav>
    );
}