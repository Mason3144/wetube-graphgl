import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Chennel: {
    user: async ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    isMine: async ({ userId }, _, { loggedinUser }) => {
      if (!loggedinUser) {
        return false;
      }
      return userId === loggedinUser.id;
    },
  },
};
export default resolvers;
