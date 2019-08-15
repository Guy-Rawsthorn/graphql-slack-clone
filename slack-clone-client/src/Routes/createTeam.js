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
} from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: "",
      errors: {}
    });
  }

  onSubmit = async () => {
    const { name } = this;
    let response = null;
    
    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (err) {
      this.props.history.push('/login');
      return;
    }
    
    console.log(response);
    const { ok, errors } = response.data.createTeam;

    if (ok) {
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
      name,
      errors: { nameError }
    } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Form>
          <Header as="h2">Create a Team</Header>

          <label>Name</label>
          <Form.Field error={!!nameError}>
            <Input
              placeholder="Name"
              name="name"
              onChange={this.onChange}
              value={name}
              fluid
            />
          </Form.Field>

          <Button onClick={this.onSubmit}>Create a Team</Button>
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

export const createTeamMutation = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
