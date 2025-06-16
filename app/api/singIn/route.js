import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const URI = process.env.MONGODB_URI;

  const client = new MongoClient(URI);
  let body = await request.json();
  try {
    // console.log("Body from API", body);
    if (body.user == process.env.ADMIN_USERNAME) {
      if (body.pass == process.env.ADMIN_PASSWORD) {
        return NextResponse.json({
          ok: true,
          token: "TokenOfAdmin",
          message: "Log In successfull",
        });
      } else {
        return NextResponse.json({
          ok: false,
          message: "Password is incorrect",
        });
      }
    } else {
      return NextResponse.json({ ok: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Sing IN API Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
