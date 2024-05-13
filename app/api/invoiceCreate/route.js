import { conntectMongoDB } from "@/lib/mongodb";
import Invoice from "@/models/invoice";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { OCR, email, BankGiro, Due_Date, Amount_Due, Name } = await req.json();
    await conntectMongoDB();

    const newInvoice = await Invoice.create({ OCR, email, BankGiro, Due_Date, Amount_Due, Name });

    return new NextResponse(JSON.stringify(newInvoice), { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);


    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export const dynamic = "force-dynamic"