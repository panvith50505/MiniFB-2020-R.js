import Axios from "axios";
import React, { Component } from "react";
import Data from "../userContext";
import "./gallary.css";
import Player from "react-player";

export class Gallary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gallary: [],
    };
  }
  static contextType = Data;

  componentDidMount = () => {
    this.fetchGallary();
  };

  fetchGallary = () => {
    const { id } = this.context.state;
    console.log(id);
    Axios.post("fetch/gallary", { id: id })
      .then((res) => {
        this.setState({
          gallary: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { gallary } = this.state;
    return (
      <div className="gallaryContainer">
        <div className="gallaryWrapper">
          <h1> Your activities </h1>

          {gallary.length ? (
            gallary.map((i) => (
              <div key={i._id} className="mediaContainer">
                <div className="info">
                  {i.profilePath === "undefined" ? (
                    <img src="/uploadedImages/defaultpic.jpg" alt="" />
                  ) : (
                    <img src={i.profilePath} alt="" />
                  )}
                  <h3>{i.name}</h3>
                </div>
                <div className="desc">{i.desc ? <p>{i.desc}</p> : null}</div>

                <div className="photoVideoContainer">
                  <div className="photoVideoWrapper">
                    {i.photoPath ? (
                      <div>
                        <img width="200px" src={i.photoPath} alt="" />
                      </div>
                    ) : null}
                    {i.videoPath ? (
                      <div>
                        <Player
                          width="550px"
                          height="220px"
                          url={i.videoPath}
                          controls
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No photos and videos</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Gallary;
