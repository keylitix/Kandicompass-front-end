import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).delete("_client_kandy_jwt");
  
  return NextResponse.json({ message: "Logged out" }, {
    status: 200,
  });
}
