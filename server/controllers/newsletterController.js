import Subscriber from "../models/Subscriber.js";
import sendWelcomeEmail from "../utils/sendWelcomeEmail.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const alreadySubscribed = await Subscriber.findOne({ email });
    if (alreadySubscribed) {
      return res.json({
        success: false,
        message: "You are already subscribed",
      });
    }

    await Subscriber.create({ email });

    // SEND WELCOME EMAIL
    await sendWelcomeEmail(email);

    res.json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};