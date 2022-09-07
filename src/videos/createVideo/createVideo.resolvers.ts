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
        const exist = await client.video.count({ where: { videoName } });
        if (exist) {
          return { ok: false, error: "Video name already exists" };
        }

        //Hashtag in description and video upload required
        await client.video.create({
          data: {
            video,
            videoName,
            description,
            user: { connect: { id: loggedinUser.id } },
            chennel: { connect: { id: chennelId } },
          },
        });
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
