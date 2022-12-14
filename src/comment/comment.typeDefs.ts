import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    comment: String!
    user: User!
    video: Video!
    totalLikes: Int!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }
`;
