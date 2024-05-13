import { NextResponse } from "next/server";
import { conntectMongoDB } from "@/lib/mongodb";
import Invoice from "@/models/invoice";

export const GET = async () => {
  await conntectMongoDB();
  const invoice = await Invoice.find();

  return new NextResponse(JSON.stringify(invoice), { status: 200 });
};
export const dynamic = "force-dynamic"