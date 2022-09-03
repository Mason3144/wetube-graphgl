import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: async (
      _,
      { email, password, firstName, lastName, avatar },
      { client, loggedinUser, protectedUser }
    ) => {
      try {
        protectedUser(loggedinUser);
        let newPassword = null;
        if (password) {
          newPassword = await bcrypt.hash(password, 10);
        }
        //Avatar field needs to be added
        await client.user.update({
          where: { id: loggedinUser.id },
          data: {
            email,
            firstName,
            lastName,
            ...(newPassword && { password: newPassword }),
          },
        });
        return { ok: true };
      } catch (error) {
        return { ok: true, error };
      }
    },
  },
};

export default resolvers;
