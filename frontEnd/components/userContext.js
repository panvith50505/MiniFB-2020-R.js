import React, { Component } from "react";
const Data = React.createContext();
export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
    };
  }

  logout = () => {
    this.setState({
      id: "",
      name: "",
    });
  };

  fetchUserData = (id, name) => {
    this.setState({
      id: id,
      name: name,
    });
  };

  render() {
    const { logout, fetchUserData, state } = this;

    return (
      <Data.Provider value={{ state, fetchUserData, logout }}>
        {this.props.children}
      </Data.Provider>
    );
  }
}

export default Data;
