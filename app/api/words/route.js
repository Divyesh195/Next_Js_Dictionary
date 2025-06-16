import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const URI = process.env.MONGODB_URI;

  const client = new MongoClient(URI);
  try {
    const database = client.db("myDictionary");
    const words = database.collection("words");

    const myWords = await words
      .find()
      .sort({ createdAt: 1 })
      .limit(5)
      .toArray();
    return NextResponse.json({ ok: true, myWords });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const URI = process.env.MONGODB_URI;

  const client = new MongoClient(URI);
  let body = await request.json();
  try {
    const database = client.db("myDictionary");
    const words = database.collection("words");

    const ArrayOfWords = await words.find().toArray();
    const wordExists = ArrayOfWords.some((word) => word.word === body.word);


    // Adding date object here, so it will not be converted into string 
    body.createdAt = new Date()


    console.log("Word exists:", wordExists);
    if (wordExists === true) {
      return NextResponse.json({ ok: false, message: "Word already exists" });
    } else if (body.word === "") {
      return NextResponse.json({ ok: false, message: "Word is missing" });
    } else if (body.meaning === "") {
      return NextResponse.json({ ok: false, message: "Meaning is missing" });
    } else if (body.sentences.length === 0) {
      return NextResponse.json({
        ok: false,
        message: "No Examples are provided",
      });
    } else {
      const newWord = await words.insertOne(body);
      return NextResponse.json({ ok: true, message: "Word added successfully", newWord });
    }
  } finally {
    await client.close();
  }
}
