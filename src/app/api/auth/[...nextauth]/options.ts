import bcrypt from "bcrypt";
import User from "@/database/models/User";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    password: string;
    username: string;
    email: string;
    role: string;
    phone: string;
    image: string;
  }
}
export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      name: "Github",
      profile(profile) {
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
      profile(profile) {
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
            firstname: user?.firstname,
            lastname: user?.lastname,
            name: user?.firstname + " " + user?.lastname ?? "app user",
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
    async signIn({ user, account, credentials }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const foundUser = await User.findOne({
            where: { email: user.email },
          });

          if (foundUser) {
            console.log("user already exists");
            return true;
          } else {
            // Generate a secure password here instead of using the user's email
            const saltRounds = 10;
            const securePassword = user?.email; // Implement this function
            const hashedPassword = await bcrypt.hash(
              securePassword,
              saltRounds
            );

            const response = await fetch(
              "http://localhost:3000/api/users/create",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  firstname: user?.firstname,
                  lastname: user?.lastname,
                  username: user?.email,
                  email: user?.email,
                  phone: user?.phone,
                  password: hashedPassword,
                  role: user?.role,
                  image: user?.image,
                }),
              }
            );

            if (response.ok) {
              console.log("User creation successful");
              return true;
            } else {
              console.log("Failed to create user");
              return false;
            }
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }

      if (account?.provider === "credentials") {
        const appUser = await User.findOne({
          where: {
            username: credentials?.username,
          },
        });

        if (!appUser) {
          console.log("user does not exist");
          return false;
        }

        const checkPassword = await bcrypt.compare(
          credentials?.password as string,
          appUser.getDataValue("password")
        );
        if (!checkPassword) {
          console.log("passwords do not match");
          return false;
        }

        console.log("user exists and passwords match");
        return true;
      }
    },

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
