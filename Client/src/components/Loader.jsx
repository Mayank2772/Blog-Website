import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-white">
      
      {/* Animated Circle */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-primary/30"></div>
        <div className="absolute h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-primary font-semibold text-lg tracking-wide">
        Loading blogs
        <span className="animate-pulse">...</span>
      </p>

    </div>
  );
};

export default Loader;