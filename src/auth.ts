import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "./lib/mongodb";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(async () => (await clientPromise)),
  session: { strategy: "database" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (creds) => {
        const { users } = await (await import("./lib/db")).getDb();
        const user = await users.findOne({ email: (creds?.email || "").toLowerCase().trim() });
        if (!user) return null;
        const ok = await bcrypt.compare(creds!.password!, user.passwordHash);
        if (!ok) return null;
        return { id: String(user._id), email: user.email, name: user.name || null };
      }
    })
  ],

  pages: {
    signIn: "/signin"
  }
});
