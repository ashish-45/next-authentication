import { connect } from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import * as bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ err: "Invalid Token" }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password,10)

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password Changed Successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
}
