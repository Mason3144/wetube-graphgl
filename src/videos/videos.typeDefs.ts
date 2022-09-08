import { gql } from "apollo-server-express";

export default gql`
  type Video {
    id: Int!
    videoName: String!
    description: String!
    views: Int!
    user: User!
    chennel: Chennel!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    videos: [Video!]!
    createdAt: String!
    updatedAt: String!
  }
`;
