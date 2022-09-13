import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    videoLikes: async (_, { id }, { client, protectedUser, loggedinUser }) => {
      try {
        protectedUser(loggedinUser);
        const exist = await client.video.count({
          where: { id },
        });

        if (!exist) {
          return { ok: false, error: "Video not found" };
        }
        const checkUser = await client.videoLikes.count({
          where: {
            AND: [
              { videoId: id },
              { users: { some: { id: loggedinUser.id } } },
            ],
          },
        });

        if (checkUser) {
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
