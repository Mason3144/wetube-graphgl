import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editVideo: async (
      _,
      { id, videoName, description },
      { loggedinUser, client, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);

        //Hashtag in description
        const video = await client.video.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!video) {
          return { ok: false, error: "Video not found" };
        }
        if (video.userId !== loggedinUser.id) {
          return { ok: false, error: "You have no authority of this video" };
        }
        await client.video.update({
          where: { id },
          data: { videoName, description },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
