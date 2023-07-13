import crypto from "crypto";
import nodemailer from 'nodemailer'
import * as dotenv from "dotenv";
dotenv.config();

export const generateSecretKey = () => {
  const secret = crypto.randomBytes(64).toString("hex");
  return secret;
};

export const listCompilers = async () => {
  const result = await axios.get(`${process.env.SPHERE_ENDPOINT}/compilers`, {
    params: {
      access_token: process.env.SPHERE_PROBLEM_TOKEN,
    },
  });

  console.log(result.data);
};

export const sendMail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_ID,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    return new Error(error);
  }
};
