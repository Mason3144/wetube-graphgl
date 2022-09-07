import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editVideo(id: Int!, videoName: String, description: String): MutationResult!
  }
`;
