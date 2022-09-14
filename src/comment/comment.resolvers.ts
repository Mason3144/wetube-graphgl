import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    user: async ({ userId }, _, { client }) =>
      client.user.findUnique({
        where: { id: userId },
      }),

    totalLikes: async ({ id }, _, { client }) => {
      const { _count } = await client.commentLikes.findUnique({
        where: { id },
        select: { _count: { select: { users: true } } },
      });
      return _count.users;
    },
  },
};

export default resolvers;
