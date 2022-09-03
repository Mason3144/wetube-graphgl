import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      email: String
      password: String
      avatar: String
      firstName: String
      lastName: String
    ): MutationResult
  }
`;
