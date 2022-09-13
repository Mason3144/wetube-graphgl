import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    videoLikes: async (_, { id }, { client, protectedUser, loggedinUser }) => {
      try {
        protectedUser(loggedinUser);
        const exist = await client.video.count({ where: { id } });
        if (!exist) {
          return { ok: false, error: "Video not found" };
        }
        const checkUser = await client.videoLikes
          .findUnique({
            where: { videoId: id },
          })
          .users({ select: { id: true } });
        const findUser = checkUser.find(({ id }) => id === loggedinUser.id);
        if (findUser) {
          await client.videoLikes.update({
            where: { videoId: id },
            data: { users: { disconnect: { id: loggedinUser.id } } },
          });
          return { ok: true };
        }
        await client.videoLikes.upsert({
          where: { videoId: id },
          update: {
            users: { connect: { id: loggedinUser.id } },
          },
          create: {
            video: { connect: { id } },
            users: { connect: { id: loggedinUser.id } },
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
