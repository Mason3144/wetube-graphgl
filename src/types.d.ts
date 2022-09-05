import { PrismaClient, User, VerificationCode } from "@prisma/client";

type Context = {
  client: PrismaClient;
  protectedUser?: any;
  loggedinUser?: User;
  verifiedEmail?: VerificationCode;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type Resolvers = {
  [key: string]: { [key: string]: Resolver };
};
