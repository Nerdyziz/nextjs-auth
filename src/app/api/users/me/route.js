import { NextRequest , NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(req = NextRequest) {
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json({user}, {status: 200});
    } catch (error) {
        console.error("Error in me route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}