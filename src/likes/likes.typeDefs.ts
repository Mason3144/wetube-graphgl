import { gql } from "apollo-server-express";

export default gql`
  type VideoLikes {
    id: Int!
    video: Video!
    users: [User!]!
    createdAt: String!
    updatedAt: String!
  }
`;

