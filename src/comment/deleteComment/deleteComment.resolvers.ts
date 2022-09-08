import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: async (
      _,
      { id },
      { client, loggedinUser, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        const exist = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!exist) {
          return { ok: false, error: "Comment not found" };
        }
        if (exist.userId !== loggedinUser.id) {
          return { ok: false, error: "Not your comment" };
        }
        await client.comment.delete({ where: { id } });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
