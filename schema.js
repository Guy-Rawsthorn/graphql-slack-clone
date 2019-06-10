import { gql } from 'apollo-server-express';

const schema = gql `
  type Query {
    me: User
  }

  type User {
      username: String!
  }
`;

export default schema