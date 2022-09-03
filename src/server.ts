require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import schema from "./schema";

const client = new PrismaClient();

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return { client };
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
