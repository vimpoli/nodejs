import config from "../config/config.js";
import { Resend } from "resend";

const resend = new Resend(config.emailApiKey);

async function sendEmail(recepient, { subject, body }) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [recepient],
    subject,
    html: body,
  });

  if (error) throw error;

  return data;
}

export default sendEmail;
