import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    myProfile: async (_, __, { client, loggedinUser, protectedUser }) => {
      protectedUser(loggedinUser);
      return client.user.findUnique({ where: { id: loggedinUser.id } });
    },
  },
};

export default resolvers;
