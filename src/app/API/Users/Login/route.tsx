import { connect } from "@/DBConfig/DBConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user Exists

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { err: "User does not Exists" },
        { status: 400 }
      );
    }

    //    password Match

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return NextResponse.json({ err: "Invalid Password" }, { status: 400 });
    }

    // create Token Data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    };

    // Create Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    
    return response;

  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
