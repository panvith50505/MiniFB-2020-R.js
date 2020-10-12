import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/registerComponent/Register";
import Login from "./components/LoginComponent/Login";
import Header from "./components/headerComponent/header";
import { AuthProvider } from "./components/userContext";
import Posts from "./components/postComponent/Posts";
import Profile from "./components/profileComponent/Profile";
import EditPage from "./components/editComponent/EditPage";
import Gallary from "./components/gallaryComponent/Gallary";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <AuthProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/posts" component={Posts} />
              <Route path="/profile" component={Profile} />
              <Route path="/editProfile" component={EditPage} />
              <Route path="/gallary" component={Gallary} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
