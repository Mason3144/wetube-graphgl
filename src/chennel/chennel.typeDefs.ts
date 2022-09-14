import { gql } from "apollo-server-express";

export default gql`
  type Chennel {
    id: Int!
    user: User!
    chennelName: String!
    videos: [Video!]!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }
`;
