import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editComment: async (
      _,
      { id, comment },
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
          return { ok: false, error: "Authority needed on the comment" };
        }
        await client.comment.update({ where: { id }, data: { comment } });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
