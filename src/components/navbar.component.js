import React, { Component } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
  }
  logout = () => {
    localStorage.setItem("username", "notexists");
    window.location = "/";
  };
  showAlert(e) {
    const type = localStorage.getItem("type");
    console.log("hellooooo");
    if (type === "Lawyer") {
      alert("You have pay $50 to view the cases");
    }
  }
  render() {
    const user = localStorage.getItem("username");
    const registrar = localStorage.getItem("registrar");
    const type = localStorage.getItem("type");
    console.log(user);
    console.log(registrar);
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ background: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Judiciary Information System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav"
              style={{ alignItems: "center", width: "100%" }}
            >
              {user === "exists" && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/caseList"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    {type === "Registrar" && (
                      <Link className="nav-link" to="/create">
                        Create Cases
                      </Link>
                    )}
                  </li>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={this.showAlert}
                    >
                      View Cases
                    </button>
                    <ul className="dropdown-menu">
                      {type === "Registrar" && (
                        <>
                          <li>
                            <a className="dropdown-item" href="/upcomingCase">
                              Upcoming Cases
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/pendingCase">
                              Pending Cases
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        <a className="dropdown-item" href="/pastCase">
                          Resolved Cases
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to="/searchcase">
                      Search past cases
                    </Link>
                  </li>
                </>
              )}
              {user !== "exists" && (
                <div style={{ display: "flex", marginLeft: "auto" }}>
                  <li className="nav-item">
                    <a className="nav-link" href="/RegisterUser">
                      Register User
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Login
                    </a>
                  </li>
                </div>
              )}
            </ul>
            {user === "exists" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                  gap: "2em",
                }}
              >
                {/* <form className="form-inline my-2 my-lg-0">
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "5%" }}>
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                    <div style={{ marginRight: "auto" }}>
                      <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form> */}
                <Link onClick={this.logout} className="btn ">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
