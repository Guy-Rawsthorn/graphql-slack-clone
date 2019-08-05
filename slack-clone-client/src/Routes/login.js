import React, { Component } from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import {
  Message,
  Container,
  Header,
  Input,
  Button,
  Form,
  Checkbox
} from "semantic-ui-react";
import { loginMutation } from "../Queries/users";
import { graphql } from "react-apollo";

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: "",
      password: "",
      errors: {}
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    console.log(email, password);
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);
    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };
  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError }
    } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Form>
          <Header as="h2">Login</Header>

          <label>Email</label>
          <Form.Field error={!!emailError}>
            <Input
              placeholder="Email"
              name="email"
              onChange={this.onChange}
              value={email}
              fluid
            />
          </Form.Field>

          <label>Password</label>
          <Form.Field error={!!passwordError}>
            <Input
              placeholder="Password"
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              fluid
            />
          </Form.Field>

          <Button onClick={this.onSubmit}>Login</Button>
        </Form>

        {errorList.length ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

export default graphql(loginMutation)(observer(Login));
