import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import Login from "./login";
import createTeam from './createTeam';
import decode from 'jwt-decode';
import viewTeam from './viewTeam';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token)
    decode(refreshToken)
  } catch (err) {
    console.log(err);
    return false
  }
  return true;
}

    function PrivateRoute({ component: Component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }

    export default () => (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/viewTeam" exact component={viewTeam} />
          <PrivateRoute path="/createTeam" exact component={createTeam} />
        </Switch>
      </BrowserRouter>
    );

