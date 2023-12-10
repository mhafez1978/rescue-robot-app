import NextAuth from "next-auth";
import { options } from "./options";

const authHandler = NextAuth(options);
export { authHandler as GET, authHandler as POST };
