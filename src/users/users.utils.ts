import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import client from "../client";
import * as mailgun from "mailgun-js";

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

export const sendEmail = async (
  email: string,
  username: string,
  code: string
) => {
  try {
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
    const data = {
      from: "Wetube Clone with GraphQL <mailgun@mailgun-test.com>",
      to: `${email}`,
      subject: "Email confirmation with Mailgun",
      template: "verify-email",
      "v:username": `${username}`,
      "v:code": `${code}`,
    };
    await mg.messages().send(data, function (error, body) {
      if (error) {
        return { ok: false, error };
      }
    });
  } catch (error) {
    return { ok: false, error };
  }
};
