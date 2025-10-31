import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiSearch, FiCheck, FiCheckDouble } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { format } from "date-fns";

// Mock doctors with new profile photos
const doctors = [
  {
    id: 1,
    name: "Dr. Priya Natarajan",
    specialty: "Cardiologist",
    avatar: "https://i.ibb.co/Hpqz7zrz/doctor1.jpg",
    lastMessage: "Let’s schedule your next follow-up.",
    lastActive: "Online",
  },
  {
    id: 2,
    name: "Dr. Amit Sharma",
    specialty: "Physician",
    avatar: "https://i.ibb.co/PHfnXCf/doctor2.jpg",
    lastMessage: "Your reports look good! 👍",
    lastActive: "Last seen yesterday",
  },
];

// Initial mock chat data
const initialMessages = {
  1: [
    { id: 1, sender: "doctor", text: "Hello, how are you feeling today?", time: "09:10 AM", read: true },
    { id: 2, sender: "patient", text: "Feeling better, thank you doctor!", time: "09:12 AM", read: true },
  ],
  2: [
    { id: 1, sender: "doctor", text: "Good morning! Did you take your meds?", time: "08:45 AM", read: true },
  ],
};

export default function Messages() {
  const { darkMode, accentColor } = useTheme();
  const [selectedChat, setSelectedChat] = useState(doctors[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat, typing]);

  const handleSend = () => {
    if (!input.trim() && !file) return;

    const newMsg = {
      id: Date.now(),
      sender: "patient",
      text: input || file?.name,
      file: file || null,
      time: format(new Date(), "hh:mm a"),
      read: false,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));
    setInput("");
    setFile(null);

    // Simulate typing + reply
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = {
        id: Date.now() + 1,
        sender: "doctor",
        text: "Got it! I'll review and get back to you shortly. 😊",
        time: format(new Date(), "hh:mm a"),
        read: true,
      };
      setMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), reply],
      }));
    }, 1800);
  };

  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) setFile(uploaded);
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chatBg = darkMode ? "bg-gray-900" : "bg-white";
  const msgBgDoctor = darkMode ? "bg-gray-700" : "bg-gray-100";

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] rounded-xl overflow-hidden shadow-md border dark:border-gray-700 transition-all">
      {/* Chat List */}
      <div
        className={`w-full md:w-1/3 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        } border-r dark:border-gray-700 flex flex-col`}
      >
        <div className="p-4 text-lg font-semibold border-b dark:border-gray-700 flex items-center justify-between">
          Chats
          <FiSearch className="text-gray-400" />
        </div>
        <div className="p-2">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border dark:border-gray-600 outline-none dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="overflow-y-auto flex-1">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedChat(doc)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-opacity-70 transition ${
                selectedChat.id === doc.id
                  ? darkMode
                    ? "bg-gray-700"
                    : "bg-teal-100"
                  : ""
              }`}
            >
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {doc.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {doc.lastMessage}
                </p>
              </div>
              <p className="text-[10px] text-gray-400">{doc.lastActive}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex flex-col flex-1 ${chatBg}`}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700 sticky top-0 z-10 backdrop-blur">
          <img
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {selectedChat.name}
            </p>
            <p className="text-xs text-gray-500">
              {typing ? "typing..." : selectedChat.lastActive}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {(messages[selectedChat.id] || []).map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`flex ${
                m.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl shadow text-sm relative ${
                  m.sender === "patient"
                    ? "text-white"
                    : "text-gray-900 dark:text-gray-100"
                }`}
                style={{
                  backgroundColor:
                    m.sender === "patient" ? accentColor : msgBgDoctor,
                }}
              >
                {m.file ? (
                  <FilePreview file={m.file} />
                ) : (
                  <p>{m.text}</p>
                )}
                <div className="flex items-center justify-end mt-1 gap-1 text-[10px] opacity-70">
                  <span>{m.time}</span>
                  {m.sender === "patient" &&
                    (m.read ? (
                      <FiCheckDouble size={12} className="text-blue-400" />
                    ) : (
                      <FiCheck size={12} className="text-gray-400" />
                    ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-2xl inline-flex gap-1">
                <Dot /> <Dot delay={0.2} /> <Dot delay={0.4} />
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 flex items-center gap-2 border-t dark:border-gray-700 bg-opacity-90 backdrop-blur sticky bottom-0">
          <label className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <FiPaperclip size={18} />
            <input type="file" hidden onChange={handleFileUpload} />
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-full text-sm outline-none border dark:border-gray-700 dark:bg-gray-800"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            style={{ backgroundColor: accentColor }}
            className="p-2 rounded-full text-white flex items-center justify-center"
          >
            <FiSend />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

const Dot = ({ delay = 0 }) => (
  <motion.span
    className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full"
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ duration: 1, repeat: Infinity, delay }}
  />
);

const FilePreview = ({ file }) => {
  if (!file) return null;
  if (file.type.startsWith("image/")) {
    return (
      <img
        src={URL.createObjectURL(file)}
        alt="upload"
        className="w-32 h-32 rounded-lg object-cover"
      />
    );
  }
  if (file.type === "application/pdf") {
    return <p className="text-xs italic">📄 {file.name}</p>;
  }
  return <p className="text-xs">{file.name}</p>;
};
