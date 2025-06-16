import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request) {
  const URI = process.env.MONGODB_URI;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const client = new MongoClient(URI);
  try {
    const database = client.db("myDictionary");
    const words = database.collection("words");

    const results = await words.find({
      word: { $regex: `^${query}`, $options: "i" },
    }).limit(10).toArray()

    // console.log(results);
    return NextResponse.json({ ok: true, Words: results });
  } finally {
    await client.close();
  }
}
