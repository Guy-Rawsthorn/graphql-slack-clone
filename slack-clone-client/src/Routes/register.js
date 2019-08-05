import React, { Component } from "react";
import {
  Form,
  Message,
  Container,
  Header,
  Input,
  Button
} from "semantic-ui-react";
import { registerMutation } from "../Queries/users";
import { graphql } from "react-apollo";

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: ""
    });

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }

    console.log(response);
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Form>
          <Header as="h2">Register</Header>

          <Form.Field error={!!usernameError}>
            <label>Username</label>
            <Input
              placeholder="Username"
              name="username"
              onChange={this.onChange}
              value={username}
              fluid
            />
          </Form.Field>

          <Form.Field error={!!emailError}>
            <label>Email</label>
            <Input
              placeholder="Email"
              name="email"
              onChange={this.onChange}
              value={email}
              fluid
            />
          </Form.Field>

          <Form.Field error={!!passwordError}>
            <label>Password</label>
            <Input
              placeholder="Password"
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              fluid
            />
          </Form.Field>

          <Button onClick={this.onSubmit}>Register</Button>
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

export default graphql(registerMutation)(Register);
// export default Register
