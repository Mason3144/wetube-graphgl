import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Video: {
    user: async ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    totalLikes: async ({ id }, _, { client }) => {
      const { _count } = await client.videoLikes.findUnique({
        where: { videoId: id },
        select: { _count: { select: { users: true } } },
      });
      return _count.users;
    },
  },
};

export default resolvers;
