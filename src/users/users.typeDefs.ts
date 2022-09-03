import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
    avatar: String
    firstName: String!
    lastName: String
    createdAt: String!
    updatedAt: String!
  }
`;
