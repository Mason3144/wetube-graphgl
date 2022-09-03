import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { password, email, firstName, lastName },
      { client }
    ) => {
      try {
        const exist = await client.user.findUnique({
          where: { email },
          select: { socialLogin: true },
        });
        if (exist) {
          if (!exist.socialLogin) {
            return {
              ok: false,
              error: "Email already taken,Please try to login",
            };
          } else {
            return {
              ok: false,
              error: "Email already taken,Please try social login",
            };
          }
        }
        const hash = await bcrypt.hash(password, 10);
        await client.user.create({
          data: { password: hash, email, firstName, lastName },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
