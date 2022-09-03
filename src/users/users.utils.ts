import * as jwt from "jsonwebtoken";
import client from "../client";
import { LoggedinUser, ProtectedUser } from "../types";

export const loggedinUser: LoggedinUser = async (token) => {
  try {
    const userVerify = await jwt.verify(token, process.env.SECRET_KEY);
    if (!userVerify) {
      return null;
    }
    const user = client.user.findUnique({ where: { id: userVerify.id } });
    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

export const protectedUser: ProtectedUser = (user) => {
  if (!user) {
    throw new Error("Pls login first");
  }
};
