import React, { Component } from "react";
import Axios from "axios";
import Data from "../userContext";
import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: [],
      profilePath: "",
      status: [],
    };
  }
  static contextType = Data;

  componentDidMount() {
    this.getUserData();
  }

  // to fetch userdata
  getUserData = () => {
    const { id } = this.context.state;
    Axios.post("/fetch/userData", { id: id })
      .then((res) => {
        this.setState({
          db: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          status: err.response.data,
        });
      });
  };

  //to update profilepicure
  submit = (e) => {
    e.preventDefault();
    const { profilePath, db } = this.state;
    const data = new FormData();
    data.append("photo", profilePath);
    data.append("name", db.name);
    Axios.post("/user/updateProfilePic", data)
      .then((res) => {
        this.setState({
          status: res.data,
        });
        this.getUserData();
      })
      .catch((err) => {
        this.setState({
          status: err.response.data,
        });
      });
  };

  editProfile = () => {
    this.props.history.push("/editProfile");
  };

  logout = () => {
    this.context.logout();
    this.props.history.push("/");
  };

  handlefile = (e) => {
    this.setState({
      profilePath: e.target.files[0],
    });
  };

  render() {
    const { db, status } = this.state;
    return (
      <div className="profileContainer">
        <div className="profileWrapper">
          {
            <div>
              <h1>Welcome !</h1>
              <div className="profile">
                {db.profilePath ? (
                  <img src={db.profilePath} alt="" />
                ) : (
                  <img src="/uploadedImages/defaultpic.jpg" alt="" />
                )}
                <div>
                  {status ? (
                    <div className="errormsg">
                      {status.msg ? <p>{status.msg}</p> : <h5>{status.rel}</h5>}
                    </div>
                  ) : null}
                </div>
              </div>
              <form onSubmit={this.submit}>
                <label htmlFor="file">Edit Image</label>
                <input
                  type="file"
                  id="file"
                  onChange={this.handlefile}
                  hidden
                />
                <button type="submit">Save</button>
              </form>

              <h3>{db.name}</h3>
              <h3>{db.email}</h3>

              <button onClick={this.editProfile}>Edit Profile</button>
              <button onClick={this.logout}>Logout</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Profile;
