import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use Outlook, SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,     // your email (example@gmail.com)
    pass: process.env.EMAIL_PASS      // app password (not your main password)
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `Course Platform Admin <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent:", result.response);
    return result;
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
};
