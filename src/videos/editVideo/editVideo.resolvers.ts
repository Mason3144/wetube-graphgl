import { Resolvers } from "../../types";
import { handleHashtags } from "../videos.utils";

const resolvers: Resolvers = {
  Mutation: {
    editVideo: async (
      _,
      { id, videoName, description },
      { loggedinUser, client, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);

        const video = await client.video.findUnique({
          where: { id },
          include: { hashtags: { select: { hashtag: true } } },
        });
        console.log(video.hashtags);
        if (!video) {
          return { ok: false, error: "Video not found" };
        }
        if (video.userId !== loggedinUser.id) {
          return { ok: false, error: "You have no authority of this video" };
        }
        await client.video.update({
          where: { id },
          data: {
            videoName,
            description,
            hashtags: {
              ...(description && {
                disconnect: video.hashtags,
                connectOrCreate: handleHashtags(description),
              }),
            },
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
