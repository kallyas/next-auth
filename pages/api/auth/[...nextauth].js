import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  pages: {},
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  events: {},
  theme: "auto",
  debug: false,
});
