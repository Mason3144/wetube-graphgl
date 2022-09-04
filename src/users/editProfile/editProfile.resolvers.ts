import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import { uploadToS3, deleteToS3 } from "../../shared/shared.uploads";

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
        let newAvatar = null;
        if (password) {
          newPassword = await bcrypt.hash(password, 10);
        }
        if (avatar) {
          newAvatar = await uploadToS3(avatar, loggedinUser.id, "avatar");
        }
        const previousAvatar = await client.user.findUnique({
          where: { id: loggedinUser.id },
          select: { avatar: true },
        });
        if (previousAvatar.avatar) {
          deleteToS3(previousAvatar.avatar);
        }

        await client.user.update({
          where: { id: loggedinUser.id },
          data: {
            email,
            firstName,
            lastName,
            ...(newPassword && { password: newPassword }),
            ...(newAvatar && { avatar: newAvatar }),
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
