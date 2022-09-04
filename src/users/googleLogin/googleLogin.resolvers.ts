import { Resolvers } from "../../types";
import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";

const OAuth = new OAuth2Client(process.env.GOOGLE_CLIENT);

const resolvers: Resolvers = {
  Mutation: {
    googleLogin: async (_, { idToken }, { client }) => {
      try {
        const clientId = process.env.GOOGLE_CLIENT;
        const { payload } = await OAuth.verifyIdToken({
          idToken,
          audience: clientId,
        });
        if (payload.email_verified) {
          let user = null;
          user = await client.user.findUnique({
            where: { email: payload.email },
            select: { id: true },
          });
          if (!user) {
            user = await client.user.create({
              data: {
                email: payload.email,
                avatar: payload.picture,
                firstName: payload.given_name,
                lastName: payload.family_name,
                socialLogin: true,
              },
            });
          }
          const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
          return { ok: true, token };
        }
        return { ok: false, error: "User not verified" };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
