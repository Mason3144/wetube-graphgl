require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import schema from "./schema";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import client from "./client";
import { loggedinUser, protectedUser } from "./users/users.utils";

async function startServer() {
  const server = new ApolloServer({
    schema,
    // Using graphql-upload without CSRF prevention is very insecure.
    csrfPrevention: true,
    cache: "bounded",
    context: async ({ req }) => {
      return {
        client,
        protectedUser,
        loggedinUser: await loggedinUser(req.headers.token),
      };
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();

// const server = new ApolloServer({
//   schema,
//   context: async ({ req }) => {
//     return {
//       client,
//       loggedinUser: await loggedinUser(req.headers.token),
//       protectedUser,
//     };
//   },
//   csrfPrevention: true,
//   cache: "bounded",
//   plugins: [],
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });
