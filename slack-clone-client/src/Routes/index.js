import React, { Component }from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Index
