import React from "react";

const Input = ({ Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
       <Icon className="size-5 text-blue-500" />
      </div>
      <input
         {...props}
         className="w-full h-10 pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 hover:border-blue-700
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-600 text-white placeholder-blue-600
                    duration-200"
      />
    </div>
  );
};

export default Input;
