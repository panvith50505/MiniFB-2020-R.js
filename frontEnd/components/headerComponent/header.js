import React, { Component } from "react";
import { Link } from "react-router-dom";
import Data from "../userContext";
import "./header.css";

export class Header extends Component {
  static contextType = Data;

  render() {
    const { state } = this.context;
    return (
      <div className="navbar">
        <div className="logo">
          <h2>MicroFB</h2>
        </div>
        {state.id && state.name ? (
          <div className="nav-content">
            <Link to="/posts">Posts</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/gallary">gallary</Link>
          </div>
        ) : (
          <div className="buttons">
            <p>
              <Link to="/register">Sign Up</Link>
            </p>
            <p>
              <Link to="/">Sign In</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
