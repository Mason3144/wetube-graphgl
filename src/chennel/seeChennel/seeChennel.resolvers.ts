import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeChennel: async (_, { id }, { client }) =>
      client.chennel.findUnique({ where: { id }, include: { videos: true } }),
  },
};

export default resolvers;
