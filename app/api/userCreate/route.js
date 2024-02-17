import { conntectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    const {name, email} = await req.json();
    await conntectMongoDB();
    await User.create({name, email})
    return NextResponse.json({message: "User Registered"}, {status: 201})
}
