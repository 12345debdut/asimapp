import React, { useContext } from "react";
import { Link } from "react-router-dom";
import jscookie from "js-cookie";
import { AuthContext } from "../../context/authContext";
import logo from "../../image/logo.png";
const Header = (props) => {
  const [auth, setAuth] = useContext(AuthContext);
  const logout = () => {
    jscookie.remove("admin");
    jscookie.remove("email");
    const authTemp = {
      isAdmin: false,
      isLoggedIn: false,
    };
    setAuth(authTemp);
  };
  return (
    <header className="header_area">
      <div className="main-menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="mr-auto"></div>
            <ul className="navbar-nav">
              <li
                className={
                  props.title === "home" ? "nav-item active" : "nav-item"
                }
              >
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={
                  props.title === "AboutUs" ? "nav-item active" : "nav-item"
                }
              >
                <Link className="nav-link" to="/aboutus">
                  about
                </Link>
              </li>
              {auth.isAdmin && (
                <li
                  className={
                    props.title === "UserCreation"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/userCreation">
                    UserCreation
                  </Link>
                </li>
              )}
              {auth.isAdmin && (
                <li
                  className={
                    props.title === "SearchUser"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/searchUsers">
                    UserSearch
                  </Link>
                </li>
              )}
              {auth.isAdmin && (
                <li
                  className={
                    props.title === "NoticeUpload"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/noticeUpload">
                    NoticeUpload
                  </Link>
                </li>
              )}
              {auth.isAdmin && (
                <li
                  className={
                    props.title === "AllNotices"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/allNotices">
                    Notices
                  </Link>
                </li>
              )}
              {!auth.isLoggedIn && (
                <li
                  className={
                    props.title === "login" ? "nav-item active" : "nav-item"
                  }
                >
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {auth.isLoggedIn && (
                <li
                  className={
                    props.title === "login" ? "nav-item active" : "nav-item"
                  }
                >
                  <Link className="nav-link" onClick={logout} to="/">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
