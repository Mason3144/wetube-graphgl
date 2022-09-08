import { uploadToS3 } from "../../shared/shared.uploads";
import { Resolvers } from "../../types";
import { handleHashtags } from "../videos.utils";

const resolvers: Resolvers = {
  Mutation: {
    createVideo: async (
      _,
      { video, videoName, description, chennelId },
      { client, loggedinUser, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);

        const location = await uploadToS3(video, loggedinUser.id, "video");

        await client.video.create({
          data: {
            video: location,
            videoName,
            description,
            hashtags: {
              ...(description && {
                connectOrCreate: handleHashtags(description),
              }),
            },
            user: { connect: { id: loggedinUser.id } },
            chennel: { connect: { id: chennelId } },
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
