import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sendEmail } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client, verifiedEmail }) => {
      const user = await client.user.findUnique({
        where: { email },
        select: {
          password: true,
          socialLogin: true,
          id: true,
          firstName: true,
        },
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

      const userVerification = await client.verificationCode.findUnique({
        where: { userId: user.id },
        select: { code: true, verified: true },
      });
      if (!userVerification.verified) {
        await sendEmail(email, user.firstName, userVerification.code);
        return {
          ok: false,
          error: "Please confirm verification on your email",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return { ok: true, token };
    },
  },
};

export default resolvers;
