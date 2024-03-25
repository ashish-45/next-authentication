import { connect } from "@/DBConfig/DBConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;
    console.log(reqBody);

    // check User Exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ err: "User Already Exists" });
    }

    // hast password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new User({
      username,
      email,
      password:hashedPassword,
    });

    const savedUser = await createUser.save();
    console.log(savedUser);

    return NextResponse.json(
      {message: "User Created Successfully",success:true,savedUser},
    );
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
