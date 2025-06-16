import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request,{ params }) {
  const URI = process.env.MONGODB_URI;

  const client = new MongoClient(URI);
  const { word } = await params;
  try {
    const database = client.db("myDictionary");
    const words = database.collection("words");

    if (word) {
      await words.deleteOne({ word: word });
      console.log("Word from API", word);
      return NextResponse.json({
        ok: true,
        message: "Word Deleted successfully",
      });
    } else {
      console.log("API couldn't get a word");
      return NextResponse.json({
        ok: false,
        message: "Word was failed to fetch from parameter.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
