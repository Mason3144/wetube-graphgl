import { PrismaClient, User } from "@prisma/client";

type Context = {
  client: PrismaClient;
  protectedUser?: any;
  loggedinUser?: User;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type Resolvers = {
  [key: string]: { [key: string]: Resolver };
};
