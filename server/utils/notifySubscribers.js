import Subscriber from "../models/Subscriber.js";
import { sendMail } from "./sendEmail.js";

const notifySubscribers = async (blog) => {
  const subscribers = await Subscriber.find({}, "email");

  const emailTemplate = (email) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>New Blog Published</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f3f4f6;">

    <div style="padding:40px 0;">
      <div style="
        max-width:600px;
        margin:auto;
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 10px 25px rgba(0,0,0,0.08);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
      ">

        <!-- HEADER -->
        <div style="
          background:#4f46e5;
          padding:28px;
          text-align:center;
          color:#ffffff;
        ">
          <h1 style="margin:0; font-size:22px; font-weight:600;">
            🚀 New Blog Published
          </h1>
          <p style="margin-top:8px; font-size:14px; opacity:0.9;">
            Fresh content is live on our website
          </p>
        </div>

        <!-- CONTENT -->
        <div style="padding:32px;">
          <h2 style="
            color:#111827;
            font-size:20px;
            margin-bottom:12px;
            font-weight:600;
          ">
            ${blog.title}
          </h2>

          <p style="
            color:#4b5563;
            line-height:1.7;
            font-size:15px;
            margin-bottom:24px;
          ">
            ${blog.subTitle}
          </p>

          <!-- INFO CARD (NO LINK, NO CTA) -->
          <div style="
            border:1px solid #e5e7eb;
            border-radius:10px;
            padding:20px;
            background:#f9fafb;
          ">
            <p style="
              margin:0;
              font-size:14px;
              color:#6b7280;
            ">
              A new article is now available on our website.
            </p>

            <h3 style="
              margin-top:8px;
              font-size:17px;
              color:#111827;
              font-weight:600;
            ">
              ${blog.title}
            </h3>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="
          background:#f9fafb;
          padding:20px;
          text-align:center;
          font-size:13px;
          color:#6b7280;
        ">
          <p style="margin-bottom:8px;">
            You’re receiving this email because you subscribed to our newsletter.
          </p>

          <a href="https://yourfrontend.com/unsubscribe?email=${email}"
            style="color:#4f46e5; text-decoration:none;">
            Unsubscribe
          </a>

          <p style="margin-top:12px; font-size:12px;">
            © ${new Date().getFullYear()} Quick Blog. All rights reserved.
          </p>
        </div>

      </div>
    </div>

  </body>
  </html>
  `;

  for (const sub of subscribers) {
    await sendMail(
      sub.email,
      "New Blog Published 🚀",
      emailTemplate(sub.email)
    );
  }
};

export default notifySubscribers;