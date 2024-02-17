import { NextResponse } from "next/server";
import { conntectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";



export const GET = async () =>{
    try {
        await conntectMongoDB();
        
        const users = await User.find()

        return new NextResponse(JSON.stringify(users), {status: 200})

    } catch (error) {
        return new NextResponse("error" + error, {status: 500})
        
    }
}