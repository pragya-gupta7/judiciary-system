import React, { Component } from "react";
import axios from "axios";

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      type: "",
      password: "",
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      type: this.state.type,
    };

    console.log(user);

    axios.post("http://localhost:5000/users/add", user)
      .then((res) => {
        console.log(res.data);
        alert("User added successfully");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });

    this.setState({
      username: "",
      password: "",
      type: "",
    });
  }

  render() {
    return (
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <h2 className="heading">Register User</h2>
            <form className="login" onSubmit={this.onSubmit}>
              <div className="login__field">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={this.onChangeType}
                  value={this.state.type}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Registrar">Registrar</option>
                  <option value="Judge">Judge</option>
                </select>
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button
                className="button login__submit"
                type="submit"
                value="Create User"
              >
                <span className="button__text">Register User</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    );
  }
}
