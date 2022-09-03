import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import client from "../client";

export const loggedinUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const userVerify = await jwt.verify(token, process.env.SECRET_KEY);
    if (!userVerify) {
      return null;
    }
    const user = await client.user.findUnique({ where: { id: userVerify.id } });
    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const protectedUser = (user: User) => {
  if (!user) {
    throw new Error("Pls login first");
  }
};
