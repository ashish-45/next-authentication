import { connect } from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import crypto from 'crypto';
import { sendMail } from '@/helpers/mailer'; 

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ err: "User not found" }, { status: 400 });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; 

        // Save the reset token and expiry date in the database
        user.forgotPasswordToken = resetToken;
        user.forgotPasswordTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send an email to the user with a link containing the reset token
        await sendMail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ err: err.message });
    }
}
