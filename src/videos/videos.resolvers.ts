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
    allComments: async ({ id }, { lastId }, { client }) =>
      client.comment.findMany({
        where: { videoId: id },
        take: 4,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: "desc" },
      }),
    isMine: async ({ userId }, _, { loggedinUser }) => {
      if (!loggedinUser) {
        return false;
      }
      return userId === loggedinUser.id;
    },
  },
};

export default resolvers;
