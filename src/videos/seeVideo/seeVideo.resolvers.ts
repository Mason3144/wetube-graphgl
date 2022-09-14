import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeVideo: async (_, { id }, { client }) => {
      await client.video.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
      return client.video.findUnique({
        where: { id },
        include: { chennel: true, comment: true },
      });
    },
  },
};

export default resolvers;
