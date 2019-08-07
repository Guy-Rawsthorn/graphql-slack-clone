export default `
  type Team {
    owner: User!
    name: String!
    channels: [Channel!]!
    members: [User!]!
  }

  type CreateTeamResponse {
    ok: Boolean!
    errors: [Error!]
}

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`