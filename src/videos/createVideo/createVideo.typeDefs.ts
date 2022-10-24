import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type Mutation {
    createVideo(
      video: Upload!
      videoName: String!
      description: String!
      chennelId: Int!
    ): MutationResult
  }
`;
