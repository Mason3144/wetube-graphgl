import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    verifyEmail(code: String!): MutationResult
  }
`;
