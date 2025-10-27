import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiArrowLeft, FiSearch } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Messages = () => {
  const { darkMode } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Chats data (mock)
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      online: true,
      lastMessage: "Please check your BP logs today.",
      messages: [
        { text: "Hello, Doctor!", sender: "user", time: "10:00 AM" },
        { text: "Please check your BP logs today.", sender: "doctor", time: "10:05 AM" },
      ],
    },
    {
      id: 2,
      name: "John Doe",
      role: "Patient",
      online: false,
      lastMessage: "Sure, I’ll do that now.",
      messages: [
        { text: "Hi John, how are you feeling today?", sender: "doctor", time: "9:00 AM" },
        { text: "Much better! Thanks, Doctor.", sender: "user", time: "9:03 AM" },
      ],
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat]);

  // Handle send message
  const handleSend = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage = {
      text: messageText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: messageText }
          : chat
      )
    );

    setMessageText("");
    setTyping(false);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate typing indicator
  useEffect(() => {
    if (!selectedChat) return;
    const timeout = setTimeout(() => setTyping(false), 2000);
    return () => clearTimeout(timeout);
  }, [typing, selectedChat]);

  return (
    <div
      className={`flex h-[calc(100vh-4rem)] transition-colors duration-500 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Chat List Sidebar */}
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } md:flex flex-col w-full md:w-1/3 xl:w-1/4 border-r ${
          darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        <div className="p-4 border-b flex items-center gap-2 font-semibold text-lg">
          Messages
        </div>

        {/* Search bar */}
        <div className="px-4 py-2 border-b">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <FiSearch className="opacity-70" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chats..."
              className={`w-full bg-transparent outline-none text-sm ${
                darkMode ? "placeholder-gray-400" : "placeholder-gray-600"
              }`}
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="overflow-y-auto flex-1">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-blue-500 hover:text-white transition-all ${
                  selectedChat?.id === chat.id
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  {/* 🖼️ Paste online image link below */}
                  {/* Example: https://via.placeholder.com/48 */}
                  <img
                    src="https://via.placeholder.com/48" // <-- replace with actual doctor/patient image URL
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.online && (
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">{chat.name}</h4>
                  <p className="text-sm opacity-70 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-sm opacity-70">No chats found</div>
          )}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${
                darkMode ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <FiArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  <p
                    className={`text-xs ${
                      selectedChat.online ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {selectedChat.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                darkMode ? "bg-gray-950" : "bg-gray-100"
              }`}
            >
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                      msg.sender === "user"
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-[10px] opacity-70 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className={`flex items-center gap-3 px-4 py-3 border-t ${
                darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="text"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  setTyping(true);
                }}
                placeholder="Type a message..."
                className={`flex-1 rounded-full px-4 py-2 focus:outline-none ${
                  darkMode
                    ? "bg-gray-800 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="p-3 rounded-full bg-blue-500 text-white hover:opacity-90 transition-all"
              >
                <FiSend size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
