import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    videoLikes(id: Int!): MutationResult!
  }
`;
