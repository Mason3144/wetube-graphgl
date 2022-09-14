import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    commentLikes(id: Int!): MutationResult!
  }
`;
