import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createComment: async (
      _,
      { videoId, comment },
      { client, protectedUser, loggedinUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        const video = await client.video.count({ where: { id: videoId } });
        if (!video) {
          return { ok: false, error: "Video not found" };
        }
        await client.comment.create({
          data: {
            comment,
            user: { connect: { id: loggedinUser.id } },
            video: { connect: { id: videoId } },
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
