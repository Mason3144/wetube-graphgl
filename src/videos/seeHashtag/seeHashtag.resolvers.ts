import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({
        where: { hashtag },
        include: { videos: true },
      }),
  },
};

export default resolvers;
