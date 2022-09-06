import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createChennel(chennelName: String!): MutationResult
  }
`;
