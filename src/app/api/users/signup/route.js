import connectDB from "@/dbConfig/dbConfig";
import  User  from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse} from "next/server";
import { sendEmail } from "@/helpers/mail";

connectDB();

export async function POST(req = NextRequest) {
    try {
        const { username, email, password } = await req.json();

        const existingUser = await User.findOne({email});
        if (existingUser) {
            if(!existingUser.isVerified && existingUser.verifyTokenExpiry < Date.now()){
                await User.deleteOne({email});
                return NextResponse.json({message: "Previous unverified user deleted. Please signup again."}, {status: 400});
            }
            return NextResponse.json({message: "User already exists"}, {status: 400});

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("New user created:", savedUser);

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json({message: "User created successfully"}, {status: 201});
    } catch (error) {
        console.error("Error in signup route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }   
}

