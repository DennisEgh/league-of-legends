import mongoose, { Schema, models } from "mongoose";

const invoiceSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    OCR: {
      type: String,
      required: true,
    },
    BankGiro:{
      type: String,
      required: true,
    },
    Due_Date: {
      type: Date,
      require
    },
   
  },
  { timestamps: true }
);

const Invoice = models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
