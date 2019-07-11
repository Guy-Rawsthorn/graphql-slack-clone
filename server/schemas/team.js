export default `
  type Team {
    owner: User!
    name: String!
    channels: [Channel!]!
    members: [User!]!
  }

  type Mutation {
    createTeam(name: String!): Boolean!
  }
`