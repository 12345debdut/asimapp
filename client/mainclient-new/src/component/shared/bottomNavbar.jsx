import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { logout } from "../util/logout";
import { useNavigate } from "react-router-dom";
export default function BottomNavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigateTo = useNavigate();
  if (auth.isLoggedIn) {
    return (
      <React.Fragment>
        <div style={{ width: "100%", height: 200 }}></div>
        <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark navbar-bottom-custom-container">
          {auth.isAdmin ? (
            <div className="navbar-bottom-custom">
              <div className="navbar-bottom-custom-item">
                <Link to="/userList">
                  <i className="fa fa-users"></i>
                  <p>UserList</p>
                </Link>
              </div>
              <div className="navbar-bottom-custom-item">
                <Link to="/paymentInfo">
                  <i className="far fa-money-bill-alt"></i>
                  <p>Payments</p>
                </Link>
              </div>
              <div className="navbar-bottom-custom-item">
                <Link to="/userCreation">
                  <i className="fa fa-question-circle"></i>
                  <p>User Creation</p>
                </Link>
              </div>
              <div className="navbar-bottom-custom-item">
                <Link to="/jeemainquestionupload">
                  <i className="fa fa-question-circle"></i>
                  <p>Jeemain</p>
                </Link>
              </div>
              <div className="navbar-bottom-custom-item">
                <Link to="/hsquestionupload">
                  <i className="fa fa-question-circle"></i>
                  <p>Hs</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar-bottom-custom">
              <div className="navbar-bottom-custom-item">
                <Link to="/userprofile">
                  <i className="fa fa-users"></i>
                  <p>Profile</p>
                </Link>
              </div>
              <div className="navbar-bottom-custom-item">
                <a href="/exam/home">
                  <i className="fa fa-question-circle"></i>
                  <p>Exam</p>
                </a>
              </div>
              <div className="navbar-bottom-custom-item">
                <Link to="/allNoticesUsers">
                  <i className="fa fa-question-circle"></i>
                  <p>Notices</p>
                </Link>
              </div>
              <div
                className="navbar-bottom-custom-item"
                onClick={() => {
                  logout(setAuth);
                  navigateTo("/login");
                }}
              >
                <i className="far fa-money-bill-alt"></i>
                <p>Logout</p>
              </div>
            </div>
          )}
        </nav>
      </React.Fragment>
    );
  }
  return <div></div>;
}
