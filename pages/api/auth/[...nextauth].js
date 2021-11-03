import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { PrismaClient } from "@prisma/client";

import firebase from "firebase/app";
import "firebase/firestore";

const prisma = new PrismaClient();
const firebaseConfig = {};

const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
).firestore();

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: FirebaseAdapter(firestore),
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  pages: {},
  callbacks: {},
  events: {},
  theme: "dark",
  debug: false,
});
