import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const emailNorm = email.toLowerCase().trim();
  const { users } = await getDb();

  const exists = await users.findOne({ email: emailNorm });
  if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const { insertedId } = await users.insertOne({ name: name?.trim() || null, email: emailNorm, passwordHash, createdAt: new Date() });

  return NextResponse.json({ id: String(insertedId), email: emailNorm });
}
