import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    totalLikes: async ({ id }, _, { client }) =>
      client.commentLikes.findUnique({
        where: { id },
        select: { _count: { select: { users: true } } },
      }),
  },
};

export default resolvers;
