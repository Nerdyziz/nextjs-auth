import connectDB from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse} from "next/server";
import jwt from "jsonwebtoken";


connectDB();

export async function POST(req) {
    try {
        const {email, password } = await req.json();
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return NextResponse.json({message: "Invalid credentials"}, {status: 400});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return NextResponse.json({message: "Invalid credentials"}, {status: 400});
        }
        const response = NextResponse.json({message: "Login successful"}, {status: 200});
        if(!existingUser.isVerfied){
            return NextResponse.json({message: "Please verify your email to login"}, {status: 401});
        }
        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"});
        response.cookies.set("token", token, 
            {httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 1 day in seconds

            });

        return response;
    } catch (error) {
        console.error("Error in login route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}

