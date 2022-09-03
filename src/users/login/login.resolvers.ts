import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client }) => {
      const user = await client.user.findUnique({
        where: { email },
        select: { password: true, socialLogin: true, id: true },
      });
      if (!user) {
        return { ok: false, error: "Account does not exsist" };
      }
      if (user.socialLogin) {
        return { ok: false, error: "Pls use social login" };
      }
      const hash = await bcrypt.compare(password, user.password);
      if (!hash) {
        return { ok: false, error: "Password does not match" };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return { ok: true, token };
    },
  },
};

export default resolvers;
