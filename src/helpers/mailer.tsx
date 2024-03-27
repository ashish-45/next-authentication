import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {connect} from '@/DBConfig/DBConfig';


connect();

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if ((emailType = "RESET")) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: "harsalpatil512@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify Your email" : "Verify Your Password"
      } 
      or copy and paste the link below in your Browser. <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailReponse = await transport.sendMail(mailOptions);

    return mailReponse;
    
  } catch (err: any) {
    throw new Error(err.message);
  }
};
