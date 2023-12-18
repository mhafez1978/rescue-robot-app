import { DefaultSession, DefaultUser } from "next-auth";
import { Session } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      firstname: string;
      lastname: string;
      username: string;
      firstName: string;
      lastName: string;
      password: string;
      email: string;
      password: string;
      image: string;
      role: string;
      phone: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
    phone: string;
    firstname: string;
    lastname: string;
    firstName: string;
    lastName: string;
    passsword: string;
    email: string;
    image: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    phone: string;
    firstname: string;
    lastname: string;
    firstName: string;
    lastName: string;
    passsword: string;
    email: string;
    image: string;
    name: string;
  }
}
