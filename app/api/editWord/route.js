import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const URI = process.env.MONGODB_URI;

  const client = new MongoClient(URI);
  let body = await request.json();
  try {
    const database = client.db("myDictionary");
    const words = database.collection("words");

    console.log("Word Data to be updated: ", body);
    if (body) {
      await words.updateOne(
        { word: body.word },
        {
          $set: {
            meaning: body.meaning,
            sentences: body.sentences,
            createdAt: new Date(),
          },
        }
      );
      return NextResponse.json({
        ok: true,
        message: "Word updated successfully."
      });
    } else {
      return NextResponse.json({
        ok: false,
        message: "Did not receive body to be updated"
      });
    }
  } finally {
    await client.close();
  }
}
