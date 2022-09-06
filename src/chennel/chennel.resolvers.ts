import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Chennel: {
    user: async ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
  },
};
export default resolvers;
