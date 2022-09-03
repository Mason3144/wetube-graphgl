import { PrismaClient } from "@prisma/client";

type Context = {
  client: PrismaClient;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type Resolvers = {
  [key: string]: { [key: string]: Resolver };
};
