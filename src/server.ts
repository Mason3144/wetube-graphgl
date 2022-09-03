require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return { client: new PrismaClient() };
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
