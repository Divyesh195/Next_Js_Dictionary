import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const URI = process.env.MONGODB_URI;
  const client = new MongoClient(URI);

  try {
    const db = client.db("myDictionary");
    const words = db.collection("words");

    // Fetch the earliest created word (lowest createdAt timestamp)
    const NextWord = await words
      .find({})
      .sort({ createdAt: 1 })
      .limit(1)
      .toArray();

    console.log("Next Word from API:", NextWord);

    return NextResponse.json({ ok: true, NextWord });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "API error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
