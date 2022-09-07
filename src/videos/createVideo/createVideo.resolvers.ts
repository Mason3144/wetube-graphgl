import { uploadToS3 } from "../../shared/shared.uploads";
import { Resolvers } from "../../types";

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

        //Hashtag in description
        await client.video.create({
          data: {
            video: location,
            videoName,
            description,
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
