import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminUsers } from "./users";
import { NextRequest } from "next/server";

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
          login: profile?.login,
          name: profile?.name,
          email: profile?.email ?? "No email found on github",
          image: profile?.avatar_url ?? "",
          role: userRole, // Default role
          phone: userPhone,
        };

        console.log("##################");
        console.log(myuser);
        console.log("##################");
        return {
          ...profile,
          id: profile.id.toString(),
          name: profile?.name,
          email: profile?.email ?? "No email found on github",
          image: profile?.avatar_url ?? "",
          role: userRole, // Default role
          phone: (myuser.phone as string) ?? "No phone found", //Default phone
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
          };
        }
        console.log(profile);
        return {
          ...profile,
          id: profile.sub.substring(0, 5),
          name: profile?.name,
          email: profile?.email ?? "No email found on google",
          image: profile?.picture ?? "",
          role: "user",
          phone: userPhone ?? "No phone found",
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
      async authorize(credentials) {
        // console.log(credentials);
        try {
          const user = adminUsers.find((user) => {
            if (
              (credentials?.username === user.name &&
                credentials?.password === user.password) ||
              (credentials?.username === user.email &&
                credentials?.password === user.password)
            ) {
              return {
                ...user,
                image: `https://robohash.org/${encodeURIComponent(
                  user.name
                )}.png`,
              };
            }
          });

          if (!user) {
            return null;
          }
          return user;
        } catch (error) {
          console.error("Error in authorization:", error);
          return error;
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
      }
      return token;
    },

    // client handling
    // to use roles in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.id = Number(token.sub);
      }
      return session;
    },
  },
};
