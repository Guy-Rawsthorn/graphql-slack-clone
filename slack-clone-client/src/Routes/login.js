import React, { Component } from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import { Container, Header, Input, Button } from "semantic-ui-react";
import {loginMutation} from '../Queries/users';
import {graphql} from 'react-apollo';

  class Login extends Component {
    constructor(props) {
      super(props);

      extendObservable(this, {
        email: "",
        password: ""
      });
    }

    onSubmit = async () => {
      const { email, password } = this;
      console.log(email, password);
      const response = await this.props.mutate({
        variables: {email, password}
      }) 
      console.log(response)
      const {ok, token, refreshToken} = response.data.login

      if (ok) {
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
      }
    };

    onChange = e => {
      const { name, value } = e.target;
      this[name] = value;
    };
    render() {
      const { email, password } = this;

      return (
        <Container text>
          <Header as="h2">Login</Header>
          <Input
            placeholder="Email"
            name="email"
            onChange={this.onChange}
            value={email}
            fluid
          />
          <Input
            placeholder="Password"
            name="password"
            onChange={this.onChange}
            value={password}
            type="password"
            fluid
          />
          <Button onClick={this.onSubmit}>Register</Button>
        </Container>
      );
    }
  };

  export default graphql(loginMutation)(observer(Login));
