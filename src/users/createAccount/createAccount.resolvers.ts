import { Resolvers } from "../../types";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { sendEmail } from "../users.utils";

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
        const user = await client.user.create({
          data: { password: hash, email, firstName, lastName },
        });
        const code = uuidv4();
        await client.verificationCode.create({
          data: { code, user: { connect: { id: user.id } } },
        });
        await sendEmail(user.email, user.firstName, code);
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
