import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    chennel: ({ id }) => client.user.findUnique({ where: { id } }).chennel(),
  },
};

export default resolvers;
