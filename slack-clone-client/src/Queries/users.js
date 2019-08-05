import gql from "graphql-tag";

export const registerMutation = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password){
      ok
      errors {
        path
        message
      }
    }
}
`;


export const allUsersQuery = gql`
  {
    allUsers {
      id
      username
      email
    }
  }
`;

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password:$password){
      ok
      refreshToken
      token
      errors {
        path
        message
      }
    }
  }
`;

