import React, { Component }from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import createTeam from './createTeam';

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/createTeam" exact component={createTeam} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Index
