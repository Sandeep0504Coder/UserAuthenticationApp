import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link active fw-semibold px-3"
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link active fw-semibold px-3"
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-capitalize fw-normal px-3"
              to="/signup"
            >
              Registration
            </NavLink>
          </li>
          
        </>
      );
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light text-dark  p-3 ">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/">
            Mandal Technical
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu/>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
