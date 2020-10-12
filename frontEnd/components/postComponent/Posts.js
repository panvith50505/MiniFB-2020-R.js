import React, { Component } from "react";
import Data from "../userContext";
import Axios from "axios";
import "./post.css";
import Player from "react-player";

export class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: "",
      desc: "",
      db: [],
      user: [],
    };
  }
  static contextType = Data;

  componentDidMount = () => {
    this.fetchposts();
    this.getUserData();
  };

  getUserData = () => {
    const { id } = this.context.state;
    Axios.post("/fetch/userData", { id: id })
      .then((res) => {
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchposts = () => {
    Axios.get("fetch/posts")
      .then((res) => {
        this.setState({
          db: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submit = async (e) => {
    e.preventDefault();
    const { name, id, profilePath } = this.state.user;
    const data = new FormData();
    data.append("pic", this.state.file);
    data.append("desc", this.state.desc);
    data.append("id", id);
    data.append("name", name);
    data.append("profilePath", profilePath);
    data.append("date", new Date());
    try {
      await Axios.post("/new/post", data)
        .then((res) => {
          this.resetForm();
          this.fetchposts();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  resetForm = () => {
    this.setState({
      file: "",
      desc: "",
    });
  };
  handlefile = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { desc, db } = this.state;
    return (
      <div className="postsContainer">
        <div className="postWrapper">
          <form onSubmit={this.submit}>
            <h1>Start Here!</h1>
            <input
              type="text"
              placeholder="Start here by writing latest updates..."
              name="desc"
              value={desc}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="file"
              id="file"
              name="file"
              onChange={this.handlefile}
              hidden
            />
            <label htmlFor="file">Photo</label>
            <label htmlFor="file">Video</label>
            <button type="submit">Post</button>
          </form>
          <h3>Latest posts</h3>
          <div>
            {db.length ? (
              db.map((i) => (
                <div key={i._id} className="postContainer">
                  <div className="info">
                    {i.profilePath === "undefined" ? (
                      <img src="/uploadedImages/defaultpic.jpg" alt="" />
                    ) : (
                      <img src={i.profilePath} alt="" />
                    )}
                    <h3>{i.name}</h3>
                  </div>
                  {
                    <div className="desc">
                      {i.desc ? <p>{i.desc}</p> : null}
                    </div>
                  }
                  <div className="photoVideoContainer">
                    <div className="photoVideoWrapper">
                      {i.photoPath ? <img src={i.photoPath} alt="" /> : null}
                      {i.videoPath ? (
                        <Player
                          width="550px"
                          height="220px"
                          controls
                          url={i.videoPath}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>No latest posts</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
