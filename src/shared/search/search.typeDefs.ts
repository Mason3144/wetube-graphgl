import { gql } from "apollo-server-express";

export default gql`
  type Query {
    search(title: String!): searchResult
  }
  type searchResult {
    videos: [Video]
    chennel: Chennel
  }
`;
