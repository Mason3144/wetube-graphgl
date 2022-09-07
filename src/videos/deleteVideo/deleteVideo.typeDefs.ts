import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    deleteVideo(id: Int!): MutationResult
  }
`;
