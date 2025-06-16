import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const URI = process.env.MONGODB_URI;
  const client = new MongoClient(URI);

  try {
    // await client.connect();
    const db = client.db("myDictionary");
    const collection = db.collection("words");

    const {word} = await params

    // console.log("Dynamic word:",word);
    
    const wordData = await collection.findOne({ word: word });
   

    return NextResponse.json({ ok: true, word: wordData });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "API error" }, { status: 500 });
  }
}
