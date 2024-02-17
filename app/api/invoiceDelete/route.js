import { conntectMongoDB } from "@/lib/mongodb";
import Invoice from "@/models/invoice";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();
    await conntectMongoDB();

    const deleteInvoice = await Invoice.findByIdAndDelete({ id });
    if (!deleteInvoice) {
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Invoice deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting invoice:", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
