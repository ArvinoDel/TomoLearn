import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getDb } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (creds) => {
        const { users } = await getDb();
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
