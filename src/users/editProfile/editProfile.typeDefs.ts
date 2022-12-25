import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    editProfile(
      email: String
      password: String
      avatar: Upload
      firstName: String
      lastName: String
    ): MutationResult
  }
`;
