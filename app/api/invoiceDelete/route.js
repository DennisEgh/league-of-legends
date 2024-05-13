import { conntectMongoDB } from "@/lib/mongodb";
import Invoice from "@/models/invoice";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { id } = await req.json();
  await conntectMongoDB();

  await Invoice.findByIdAndDelete(id );

  return NextResponse.json(
    { message: "Invoice deleted successfully" },
    { status: 200 }
  );
}
