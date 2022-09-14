import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    search: async (_, { title }, { client }) => {
      const chennel = await client.chennel.findUnique({
        where: { chennelName: title },
      });
      const videos = await client.video.findMany({
        where: { videoName: { contains: title } },
      });
      return { videos, chennel };
    },
  },
};

export default resolvers;
