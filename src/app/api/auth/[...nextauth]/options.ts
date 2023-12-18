import bcrypt from "bcrypt";
import User from "@/database/models/User";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string; // Additional fields that might be expected
    phone: string;
    image: string;
  }
}
export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      name: "Github",
      profile(profile: GithubProfile) {
        //console.log(profile);
        let userRole = "user" as string;
        let userPhone = "" as string;

        if (profile?.login === process.env.AdminLogin) {
          userRole = "admin";
          userPhone = "+19788887688";
        }

        const myuser = {
          id: profile.id,
          username: profile?.login,
          firstName: profile?.name?.split(" ")[0] ?? "No firstname found",
          lastName: profile?.name?.split(" ")[1] ?? "No lastname found",
          firstname: profile?.name?.split(" ")[0] ?? "No firstname found",
          lastname: profile?.name?.split(" ")[1] ?? "No lastname found",
          name: profile?.name ?? "No name found",
          email: `${profile?.login}@gmail.com` ?? "No email found on github",
          image: profile?.avatar_url ?? "",
          role: userRole, // Default role
          phone: userPhone,
        };
        //console.log(myuser);
        return {
          ...myuser,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      name: "Google",
      profile(profile: GoogleProfile) {
        //console.log(profile);
        const adminPhone = process.env.AdminPhone as string;
        if (profile?.email === process.env.Admin_Email) {
          profile.phone === adminPhone;

          return {
            ...profile,
            id: profile.sub,
            name: profile?.name,
            email: profile?.email ?? "No email found on google",
            image: profile?.picture ?? "",
            role: "admin",
            phone: adminPhone,
            username: profile?.email?.split("@")[0] ?? "No username found",
            firstName: profile?.name?.split(" ")[0] ?? "No firstname found",
            lastName: profile?.name?.split(" ")[1] ?? "No lastname found",
            firstname: profile?.name?.split(" ")[0] ?? "No firstname found",
            lastname: profile?.name?.split(" ")[1] ?? "No lastname found",
          };
        }

        return {
          ...profile,
          id: profile.sub,
          name: profile?.name,
          email: profile?.email ?? "No email found ...",
          image: profile?.picture ?? "Image not set ...",
          role: "user",
          phone: profile.phone ?? "No phone found ...",
          username: profile?.email?.split("@")[0] ?? "No username found",
          firstname: profile?.name?.split(" ")[0] ?? "No firstname found",
          lastname: profile?.name?.split(" ")[1] ?? "No lastname found",
          firstName: profile?.name?.split(" ")[0] ?? "No firstname found",
          lastName: profile?.name?.split(" ")[1] ?? "No lastname found",
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
          if (!credentials) {
            return null;
          }

          const user: any = await User.findOne({
            where: { username: credentials?.username },
          });

          if (!user) {
            return null; // User not found
          }

          // Check the password
          const passwordMatch = await bcrypt
            .compare(credentials.password, user.password)
            .then((passwordMatch) => {
              if (!passwordMatch) {
                console.log("passwords do not match");
                return null; // Passwords do not match
              }
            });

          console.log("passwords match");

          return {
            ...user,
            id: user?.id,
            username: user?.username,
            firstname: user?.firstName,
            lastname: user?.lastName,
            name: user?.firstName + " " + user?.lastName ?? "app user",
            email: user?.email ?? "No email found.",
            image: user?.image ?? "",
            role: user.role ?? "user",
            phone: user.phone ?? "No phone found",
          } as any;
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
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("####################");
      // console.log(user?.email);
      // console.log(user?.name);
      // console.log(user?.image);
      // console.log(user?.role);
      // console.log(user?.firstname);
      // console.log(user?.lastname);
      // console.log(user?.phone);
      // console.log(account?.provider);
      // console.log("####################");

      console.log(profile);

      const foundUser = await User.findOne({
        where: {
          email: user.email,
        },
      });

      if (!foundUser) {
        if (account?.provider === "google" || "github") {
          try {
            const saltRounds = 10; // You can adjust the salt rounds as needed
            const hashedPassword = await bcrypt.hash(user?.email, saltRounds);
            // console.log("##############");
            // console.log(hashedPassword);
            // console.log("##############");
            console.log("will start to create user");
            await fetch("http://localhost:3000/api/users/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname: user?.firstName,
                lastname: user?.lastname,
                username: user?.email,
                email: user?.email,
                phone: user?.phone,
                password: hashedPassword,
                role: user?.role,
                image: user?.image,
              }),
            })
              // .then((data) => data.json())
              .then((results) => {
                const data = results.json();
                console.log(data);
                console.log(
                  "user creation should be done password for this user will be their firstname,username is email "
                );
                return true;
              })
              .catch((err) => {
                console.log(err);
                return false;
              });
          } catch (err) {
            console.log(err);
            return false;
          }
        } else if (account?.provider === "credentials") {
          return true;
        }
      }
      // if user is found just login
      // return true to allow in
      return true;
    },

    // server handling
    // to use roles in server components
    async jwt({ token, user }) {
      if (user) {
        //console.log(token.sub)
        token.role = user.role;
        token.sub = user.id as string;
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
        session.user.username = token.username as string;
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

export default NextAuth(options);
