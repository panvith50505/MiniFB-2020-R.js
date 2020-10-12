import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./reg.css";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
toast.configure()
class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      status: [],
    };
  }

  notify = (e) =>
  {
    toast(e,{
      type : "error",
      
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    Axios.post("/reg/register", { email, password, name })
      .then((res) => {
        this.setState({
          status: res.data,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          status: err.response.data,
           
        });
        this.notify(`${this.state.status.msg}`)
      });
  };


  render() {
    
    const { name, email, password} = this.state;
    
    return (
      <div className="registerContainer">
        <div className="wrapper">
          <h1>Join Here !</h1>
        

          <form onSubmit={this.submit }>
            <input
              placeholder="Enter your name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <br />
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

            <button type="submit">Sign Up</button>

          </form>
         
          <p>
            Already have account? <Link to="/">Click here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
