import connectDB from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse} from "next/server";

connectDB();

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return NextResponse.json({message: "User created successfully"}, {status: 201});
    } catch (error) {
        console.error("Error in signup route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }   
}
