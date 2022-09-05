import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    verifyEmail: async (_, { code }, { client }) => {
      try {
        await client.verificationCode.update({
          where: { code },
          data: { verified: true },
        });

        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
