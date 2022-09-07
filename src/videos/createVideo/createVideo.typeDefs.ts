import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createVideo(
      video: Upload!
      videoName: String!
      description: String!
      chennelId: Int!
    ): MutationResult
  }
`;
