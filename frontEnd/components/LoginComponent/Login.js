import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Data from "../userContext";
import "./log.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      status: [],
    };
  }

  static contextType = Data;

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    Axios.post("/reg/login", { email, password })
      .then((res) => {
        const { id, name } = res.data;
        this.context.fetchUserData(id, name);
        this.props.history.push("/posts");
      })
      .catch((err) => {
        this.setState({
          status: err.response.data,
        });
      });
  };

  resetforum = () => {
    this.setState({
      email: "",
      password: "",
      status: "",
    });
  };
  render() {
    const { email, password, status } = this.state;
    return (
      <div className="loginContainer">
        <div className="wrapper">
          <h1>Welcome !</h1>
          {status ? (
            status.msg ? (
              <h4>{status.msg}</h4>
            ) : (
              <h4>{status.rel}</h4>
            )
          ) : null}

          <form onSubmit={this.submit}>
            <input
              placeholder="Enter email_id"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <br />

            <input
              placeholder="Enter password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <br />

            <button type="submit">Sign In</button>
          </form>
          <p>
            Dont have account? <Link to="/register">Click here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
