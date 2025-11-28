"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async (userMessage: string) => {
    if (!userMessage) return;

    setLoading(true);
    // Tambah pesan user
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userMessage, isUser: true },
    ]);

    try {
      // Menggunakan Hercai API (Gratis & No Key)
      const res = await fetch(
        `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(
          userMessage
        )}`
      );
      const result = await res.json();

      // Tambah respon AI
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: result.reply, isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Maaf, terjadi kesalahan. Coba lagi ya!",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input || loading) return;
    fetchAIResponse(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-black text-white p-4 pt-20 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="py-8 text-center"
        >
          <h1 className="text-4xl font-extrabold text-orange-300">KAZOR AI</h1>
          <p className="text-orange-200/80 mt-2">Tanya apa saja ke AI (Powered by Hercai)</p>
        </motion.header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.isUser ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isUser
                      ? "bg-orange-600/30 border border-orange-400/20"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  {message.text.split("\n").map((line, i) => (
                    <p key={i} className="text-sm lg:text-base">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                <div className="h-4 w-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="pb-8 pt-4 sticky bottom-0 bg-black/80 backdrop-blur-sm"
        >
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 p-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-800 outline-none"
              disabled={loading}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-4 bg-orange-500 hover:bg-orange-700 rounded-xl font-medium disabled:opacity-50"
              disabled={loading}
            >
              Kirim
            </motion.button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
