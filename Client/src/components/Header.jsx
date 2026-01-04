import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { motion, scale } from "motion/react";
import { useAppContext } from "../context/AppContext";
const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmithandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  const onClear = async (e) => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary"
        >
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </motion.div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span> <br />{" "}
          platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is a space where you can freely express your thoughts, ideas, and
          experiences. Write without hesitation—whether it's a single line or a
          full story, this is where your voice begins.
        </p>
        <form
          onSubmit={onSubmithandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            className="w-full pl-4 outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute - top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
