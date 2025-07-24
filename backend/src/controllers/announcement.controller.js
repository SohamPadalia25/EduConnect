import {User} from "../models/user.model.js";
import { sendEmail } from "../utils/emailService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const sendAnnouncement = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: "Subject and message are required" });
  }

  const users = await User.find({ role: { $in: ["student", "provider"] } });

  const emailPromises = users.map((user) =>
    sendEmail({
      to: user.email,
      subject,
      html: `<p>Dear ${user.fullname},</p><p>${message}</p>`
    })
  );

  await Promise.all(emailPromises);

  res.status(200).json({
    success: true,
    message: `Announcement sent to ${users.length} users.`
  });
});
