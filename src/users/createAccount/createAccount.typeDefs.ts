import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      email: String!
      firstName: String!
      lastName: String
      password: String!
    ): MutationResult
  }
`;
