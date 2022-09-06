import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deleteChennel: async (
      _,
      { chennelName },
      { client, protectedUser, loggedinUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        const chennel = await client.chennel.findUnique({
          where: { chennelName },
          select: { userId: true },
        });
        if (!chennel) {
          return { ok: false, error: "The chennel name does not match" };
        }

        if (chennel.userId !== loggedinUser.id) {
          return {
            ok: false,
            error: "You don't have authorization of the chennel ",
          };
        }
        await client.chennel.delete({ where: { chennelName } });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
