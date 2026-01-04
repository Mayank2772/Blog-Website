import transporter from "../configs/nodeMailer.js"

export const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Quick Blog" ${process.env.SENDER_EMAIL}`, // must be verified in Brevo
    to,
    subject,
    html,
  });
};