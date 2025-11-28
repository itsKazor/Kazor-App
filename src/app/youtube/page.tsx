"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/footer";

interface Data {
  status: string;
  url: string;
  filename?: string;
  picker?: any[];
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchDownloadLinks = async () => {
    if (!url) return;
    setLoading(true);
    setErrorMsg("");
    setData(null);

    try {
      // Menggunakan Cobalt API (Gratis & Stabil)
      const res = await fetch("https://api.cobalt.tools/api/json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          url: url,
          vCodec: "h264",
        }),
      });

      const result = await res.json();

      if (result.status === "error") {
        setErrorMsg("Gagal mengambil video. Pastikan link benar.");
      } else if (result.status === "stream" || result.status === "redirect") {
        setData(result);
      } else if (result.status === "picker") {
        setData(result.picker[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center pt-20 bg-black text-white p-4 relative overflow-hidden"
    >
      <div className="w-full max-w-lg lg:max-w-3xl mx-auto">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="mb-8 pt-8 text-center"
        >
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            <span className="text-orange-300">YOUTUBE DOWNLOADER</span>
          </h1>
          <p className="text-gray-300 text-sm lg:text-base">
            Paste YouTube URL below (Powered by Cobalt)
          </p>
        </motion.header>

        <motion.div
          className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-3 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <input
            type="text"
            placeholder="Enter YouTube URL..."
            className="flex-1 p-4 rounded-2xl bg-[#ffffff0d] backdrop-blur-sm border border-[#ffffff1a] focus:border-purple-500 focus:ring-2 focus:ring-purple-800 outline-none transition-all"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={fetchDownloadLinks}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-300 rounded-xl font-medium"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Process"
            )}
          </motion.button>
        </motion.div>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#ffffff0d] backdrop-blur-lg rounded-2xl p-6 border border-[#ffffff1a]"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative rounded-xl overflow-hidden bg-zinc-800 p-4">
                   <Image
                    src="/subaru.png" 
                    alt="Video Icon"
                    width={100} 
                    height={100}
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="text-center space-y-2">
                  <h2 className="font-semibold text-lg line-clamp-2">
                    {data.filename || "Video Ready"}
                  </h2>
                  <p className="text-sm text-gray-400">Siap untuk diunduh</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(data.url, "_blank")}
                  className="w-full max-w-xs p-3 text-center bg-orange-600 hover:bg-orange-500 rounded-xl font-bold transition-all"
                >
                  Download Video / Audio
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </motion.div>
  );
}
