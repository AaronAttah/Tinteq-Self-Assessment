import nodemailer from "nodemailer";
import { PASSMAILER, MAIL_FROM } from "../../config";



export const welcomeUser = async (email: any, full_name:any) => {
 
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        pass: PASSMAILER,
        user: "infodevhorizon@gmail.com", // USER
      },
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: "TINTEQ Welcomes You 🫵",
      html: ` <b>  Hi, ${full_name} </b></br>
            <p>
           Your account has been be successfully created, make sure you subscribe to recieve our daily newsletter!
            </p>
            
            </br>
            <b>
          
            <p>Best regards,</p>
            <p>TINTEQ Team </p>
            </b>
          `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
