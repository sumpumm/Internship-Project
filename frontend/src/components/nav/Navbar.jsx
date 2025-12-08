import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-2xl font-bold">
         Professional AI ChatBot
        </h1>

        <div className="flex space-x-6 text-lg">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/signin" className="hover:text-gray-200">Login</a>
          <a href="/signup" className="hover:text-gray-200">Signup</a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
