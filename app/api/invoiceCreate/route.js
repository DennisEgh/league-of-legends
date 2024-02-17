// api/invoiceCreate.js

import { conntectMongoDB } from "@/lib/mongodb";
import Invoice from "@/models/invoice";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { OCR, email, BankGiro, Due_Date } = await req.json();
    await conntectMongoDB();

    const newInvoice = await Invoice.create({ OCR, email, BankGiro, Due_Date });

    return new NextResponse(JSON.stringify(newInvoice), { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);

    console.error(error.message);
    console.error(error.stack);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
