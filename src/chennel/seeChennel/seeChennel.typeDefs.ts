import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeChennel(id: Int!): Chennel!
  }
`;
