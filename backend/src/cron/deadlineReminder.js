import cron from "node-cron";
import Event from "../models/event.model.js";
import {User} from "../models/user.model.js";
import { sendEmail } from "../utils/emailService.js";

// Run this job every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("📅 Running daily event deadline reminder job");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const events = await Event.find({
    status: "approved",
    date: {
      $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
      $lt: new Date(tomorrow.setHours(23, 59, 59, 999))
    }
  }).populate("provider", "email fullname");

  for (const event of events) {
    const students = await User.find({ role: "student" });
    
    students.forEach(async (student) => {
      await sendEmail({
        to: student.email,
        subject: `Reminder: "${event.title}" is happening tomorrow 🎉`,
        html: `<p>Hi ${student.fullname},</p>
               <p>This is a reminder that the event <strong>${event.title}</strong> by ${event.provider.fullname} is scheduled for <strong>${new Date(event.date).toLocaleDateString()}</strong>.</p>
               <p>See you there!</p>`
      });
    });
  }

  console.log("📧 Reminders sent for events happening tomorrow.");
});
