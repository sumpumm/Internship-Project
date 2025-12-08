import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Welcome to the AI Chatbot
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8">
          Ask me anything! I can answer questions, help with tasks, and assist you with your project.
        </p>

        {/* Chat Box */}
        <div className="border rounded-lg p-4 bg-gray-50 h-64 overflow-y-auto mb-4">
          <p className="text-gray-400 text-sm text-center mt-20">
            Chat messages will appear here...
          </p>
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
