import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const Subscribe = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/newsletter/subscribe",
        { email }
      );

      if (data.success) {
        toast.success(data.message)
        setEmail("");
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      <form onSubmit={Subscribe} className="flex max-w-2xl w-full h-12">
        <input
          className="border border-gray-300 rounded-l-md w-full px-3 outline-none"
          type="email"
          placeholder="Enter Your Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="px-10 bg-primary text-white rounded-r-md">
          Subscribe
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 ${
            message.type === "success"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default NewsLetter;