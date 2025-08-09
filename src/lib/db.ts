import clientPromise from "./mongodb";

export async function getDb() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "tomolearn");
  const users = db.collection("users");
  await users.createIndex({ email: 1 }, { unique: true });
  return { db, users };
}
