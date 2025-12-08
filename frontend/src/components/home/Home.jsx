import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Call backend API
      const res = await axios.post("http://localhost:8000/chat", {
        query: input,
      });

      const botMessage = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        sender: "bot",
        text: "Oops! Something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 flex flex-col">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Welcome to the AI Chatbot
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6">
          Ask me anything! I can answer questions, help with tasks, and assist you with your project.
        </p>

        {/* Chat Box */}
        <div
          ref={chatBoxRef}
          className="flex-1 border rounded-lg p-4 bg-gray-50 overflow-y-auto mb-4 min-h-[300px] max-h-[500px]"
        >
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-20">
              Chat messages will appear here...
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
