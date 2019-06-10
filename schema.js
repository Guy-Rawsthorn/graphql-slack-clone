import { ggl } from 'apollo-server-express';

const query = ggl `
  type Query {
    hi: String
  }
`;

export default query