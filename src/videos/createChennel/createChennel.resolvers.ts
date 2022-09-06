import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createChennel: async (
      _,
      { chennelName },
      { client, loggedinUser, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        const chennel = await client.chennel.count({ where: { chennelName } });
        if (chennel) {
          return { ok: false, error: "The chennel name already taken" };
        }
        const chennelNumber = await client.chennel.count({
          where: { userId: loggedinUser.id },
        });
        if (chennelNumber) {
          return { ok: false, error: "Only one chennel availible" };
        }
        await client.chennel.create({
          data: { chennelName, user: { connect: { id: loggedinUser.id } } },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
