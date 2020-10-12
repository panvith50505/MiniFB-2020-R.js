import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Data from "../userContext";
import "./editPage.css";

class EditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      email: "",
      profilePath: "",
      status: [],
    };
  }
  static contextType = Data;
  componentDidMount = () => {
    this.fetchuserdata();
  };

  //to fetch details
  fetchuserdata = () => {
    Axios.post("fetch/userData", { id: this.context.state.id })
      .then((res) => {
        const { id, name, email, profilePath } = res.data;
        this.setState({
          id,
          name,
          email,
          profilePath,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //to save the details
  submit = (e) => {
    e.preventDefault();
    const { id, name, email } = this.state;
    Axios.patch("/user/updateProfile", { id, name, email })
      .then((res) => {
        this.props.history.push("/profile");
      })
      .catch((err) => {
        this.setState({
          status: err.response.data,
        });
      });
  };

  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { status, email, name, profilePath } = this.state;
    return (
      <div className="editPageContainer">
        <div className="editWrapper">
          <h1> Edit Your Profile Here!</h1>
          {
            <div className="editProfile">
              {profilePath ? (
                <img src={profilePath} alt="" />
              ) : (
                <img src="/uploadedImages/defaultpic.jpg" alt="" />
              )}
              <div className="errormsg">
                {status ? status.msg ? <p>{status.msg}</p> : null : null}
              </div>
            </div>
          }

          <form onSubmit={this.submit}>
            Name:{" "}
            <input
              placeholder="enter name"
              type="text"
              name="name"
              value={name}
              onChange={this.handlechange}
            />
            <br />
            Email_Id:{" "}
            <input
              placeholder="enter email_id"
              type="email"
              name="email"
              value={email}
              onChange={this.handlechange}
            />
            <br />
            <button type="submit">save</button>
            <br />
            <p>
              Back to Profile? <Link to="/profile">Click here</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPage;
