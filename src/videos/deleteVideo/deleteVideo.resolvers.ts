import { deleteToS3 } from "../../shared/shared.uploads";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deleteVideo: async (_, { id }, { client, loggedinUser, protectedUser }) => {
      try {
        protectedUser(loggedinUser);
        const video = await client.video.findUnique({
          where: { id },
          select: { userId: true, video: true },
        });
        if (!video) {
          return { ok: false, error: "Video not found" };
        }
        if (video.userId !== loggedinUser.id) {
          return { ok: false, error: "You have no authority of this video" };
        }
        await deleteToS3(video.video);
        await client.video.delete({ where: { id } });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
