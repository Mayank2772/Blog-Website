import { sendMail } from "./sendEmail.js";

const sendWelcomeEmail = async (email) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Our Newsletter</title>
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
        font-family: ui-sans-serif, system-ui, -apple-system;
      ">

        <!-- HEADER -->
        <div style="
          background:#4f46e5;
          padding:28px;
          text-align:center;
          color:white;
        ">
          <h1 style="margin:0; font-size:22px;">
            🎉 Welcome!
          </h1>
          <p style="margin-top:8px; font-size:14px; opacity:0.9;">
            You’re now subscribed to our newsletter
          </p>
        </div>

        <!-- CONTENT -->
        <div style="padding:32px;">
          <p style="
            color:#4b5563;
            line-height:1.7;
            font-size:15px;
          ">
            Thank you for subscribing!  
            You’ll now receive updates whenever we publish new blogs,
            share tech insights, and post exclusive content.
          </p>

          <div style="
            margin-top:24px;
            padding:20px;
            border-radius:10px;
            background:#f9fafb;
            border:1px solid #e5e7eb;
          ">
            <p style="margin:0; font-size:14px; color:#6b7280;">
              You’re all set 🚀  
              No action required.
            </p>
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
            You can unsubscribe anytime from our emails.
          </p>

          <p style="margin-top:12px; font-size:12px;">
            © ${new Date().getFullYear()} Quick Blog
          </p>
        </div>

      </div>
    </div>

  </body>
  </html>
  `;

  await sendMail(email, "Welcome to Our Newsletter 🎉", html);
};

export default sendWelcomeEmail;