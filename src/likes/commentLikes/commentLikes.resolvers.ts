import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    commentLikes: async (
      _,
      { id },
      { client, protectedUser, loggedinUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        const exist = await client.comment.count({ where: { id } });
        if (!exist) {
          return { ok: false, error: "Comment not found" };
        }
        const checkUser = await client.commentLikes.count({
          where: {
            AND: [
              { commentId: id },
              { users: { some: { id: loggedinUser.id } } },
            ],
          },
        });
        if (checkUser) {
          await client.commentLikes.update({
            where: { id },
            data: { users: { disconnect: { id: loggedinUser.id } } },
          });
          return { ok: true };
        }

        await client.commentLikes.upsert({
          where: { commentId: id },
          update: { users: { connect: { id: loggedinUser.id } } },
          create: {
            users: { connect: { id: loggedinUser.id } },
            comment: { connect: { id } },
          },
        });

        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
