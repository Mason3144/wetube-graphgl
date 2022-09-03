import { PrismaClient, User } from "@prisma/client";
import { protectedUser } from "./users/users.utils";

type ProtectedUser = (user: User) => any;
type LoggedinUser = (token: string) => any;

type Context = {
  client: PrismaClient;
  protectedUser?: ProtectedUser;
  loggedinUser?: LoggedinUser;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type Resolvers = {
  [key: string]: { [key: string]: Resolver };
};
