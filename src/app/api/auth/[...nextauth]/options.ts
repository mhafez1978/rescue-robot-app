import bcrypt from "bcrypt";
import User from "@/database/models/User";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { adminUsers } from "./users";
import CredentialsProvider from "next-auth/providers/credentials";

import sequelize from "@/database/sequelize";
interface UserProps {
  id: number | string;
  name: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string; // Additional fields that might be expected
  phone: string;
  image: string;
}

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        console.log(profile);
        let userRole = "user" as string;
        let userPhone = "" as string;
        //console.log(userPhone);
        if (profile?.login === process.env.AdminLogin) {
          userRole = "admin";
          userPhone = "+19788887688";
          //console.log(userPhone);
        }
        //console.log("#######################");
        //console.log(profile.user);
        //console.log("#######################");
        const myuser = {
          id: profile.id.toString(),
          username: profile?.login,
          firstname: profile?.name?.split(" ")[0] ?? "No firstname found",
          lastname: profile?.name?.split(" ")[1] ?? "No lastname found",
          name: profile?.name ?? "No name found",
          email: `${profile?.login}@gmail.com` ?? "No email found on github",
          image: profile?.avatar_url ?? "",
          role: userRole, // Default role
          phone: userPhone,
        };
        console.log(myuser);
        return {
          // ...profile,
          // id: profile.id.toString(),
          // name: profile?.name,
          // email: profile?.email ?? "No email found on github",
          // image: profile?.avatar_url ?? "",
          // username: profile?.login,
          // role: userRole, // Default role
          // phone: (myuser.phone as string) ?? "No phone found", //Default phone
          ...myuser,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        //console.log(profile);
        let userPhone = "" as string;
        if (profile?.email === process.env.Admin_Email) {
          //console.log("#######################");
          //console.log(userPhone);
          //console.log("#######################");
          userPhone = process.env.AdminPhone as string;
          //console.log("#######################");
          //console.log(userPhone);
          // console.log("#######################");
          return {
            ...profile,
            id: profile.sub.substring(0, 5),
            name: profile?.name,
            email: profile?.email ?? "No email found on google",
            image: profile?.picture ?? "",
            role: "admin",
            phone: userPhone,
            username: profile?.email?.split("@")[0] ?? "No username found",
            firstname: profile?.name?.split(" ")[0] ?? "No firstname found",
            lastname: profile?.name?.split(" ")[1] ?? "No lastname found",
          };
        }

        return {
          ...profile,
          id: profile.sub.substring(0, 5),
          name: profile?.name,
          email: profile?.email ?? "No email found on google",
          image: profile?.picture ?? "",
          role: "user",
          phone: userPhone,
          username: profile?.email?.split("@")[0] ?? "No username found",
          firstname: profile?.name?.split(" ")[0] ?? "No firstname found",
          lastname: profile?.name?.split(" ")[1] ?? "No lastname found",
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials.username || !credentials.password) {
            return null;
          }

          const user = await User.findOne({
            where: { username: credentials?.username },
          });

          if (!user) {
            return null; // User not found
          }

          // Check the password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            console.log("passwords do not match");
            return null; // Passwords do not match
          }
          console.log("passwords match");
          // // Return user data without sensitive information
          // q: can you chec my return statement

          return {
            ...user,
            id: user.id.toString(),
            username: user?.username,
            firstname: user?.firstName,
            lastname: user?.lastName,
            name: user?.firstName + " " + user?.lastName ?? "app user",
            email: user?.email ?? "No email found.",
            image: user?.image ?? "",
            role: user.role ?? "user",
            phone: user.phone ?? "No phone found",
          };
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),
  ],
  //to help make roles presist on the server
  // we only need session if we doing a client component
  callbacks: {
    // server handling
    // to use roles in server components
    async jwt({ token, user }) {
      if (user) {
        //console.log(token.sub)
        token.role = user.role;
        token.sub = user.id;
        token.phone = user.phone;
        token.name = user.name;
        token.username = user.username;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    // client handling
    // to use roles in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.id = Number(token.sub);
      }
      return session;
    },
  },
};
