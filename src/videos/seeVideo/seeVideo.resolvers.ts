import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeVideo: async (_, { id }, { client }) =>
      client.video.findUnique({
        where: { id },
        include: { chennel: true, comment: true },
      }),
  },
};

export default resolvers;
