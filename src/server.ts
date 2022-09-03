require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import client from "./client";
import { loggedinUser, protectedUser } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      client,
      loggedinUser: await loggedinUser(req.headers.token),
      protectedUser,
    };
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
