import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const URI = process.env.MONGODB_URI;
  const client = new MongoClient(URI);

  try {
    // await client.connect();
    const db = client.db("myDictionary");
    const words = db.collection("words");

    const {word} = await params

    const currentWord = await words.findOne({word: word})

    console.log('Current word:',currentWord.word);

    const NextWord = await words
    .find({ createdAt: { $lt : new Date(currentWord.createdAt) } })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray();

    console.log("Next Word from API:",NextWord);
   

    return NextResponse.json({ ok: true, NextWord });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "API error" }, { status: 500 });
  }
}
