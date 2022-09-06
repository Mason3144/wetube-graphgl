import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteChennel(chennelName: String!): MutationResult
  }
`;
