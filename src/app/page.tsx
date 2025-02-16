"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Data {
  title: string;
  thumbnail: string;
  author: string;
  views: number | null;
  lengthSeconds: string;
  url: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDownloadLinks = async () => {
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(url)}`
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center bg-black text-white p-4 relative overflow-hidden"
    >
      {/* Container */}
      <div className="w-full max-w-lg lg:max-w-3xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="mb-8 pt-8 text-center"
        >
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              YOUTUBE DOWNLOADER
            </span>
          </h1>
          <p className="text-gray-300 text-sm lg:text-base">
            Paste YouTube URL below
          </p>
        </motion.header>

        {/* Input Section */}
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
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl font-medium"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Download'
            )}
          </motion.button>
        </motion.div>

        {/* Content */}
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#ffffff0d] backdrop-blur-lg rounded-2xl p-6 border border-[#ffffff1a]"
            >
              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Thumbnail */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="relative rounded-xl overflow-hidden"
                >
                  <img
                    src={data.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs">
                    {data.lengthSeconds}
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  className="space-y-3 flex flex-col justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="font-semibold text-lg line-clamp-2">{data.title}</h2>
                  <div className="text-sm text-gray-300">
                    <p>Uploader: {data.author}</p>
                    <p>Views: {data.views?.toLocaleString() || 'N/A'}</p>
                  </div>
                </motion.div>
              </div>

              {/* Download Buttons */}
              <motion.div
                className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {['480p', '720p', '1080p'].map((resolution, i) => (
                  <motion.button
                    key={resolution}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(`${data.url}&quality=${resolution.slice(0, -1)}`)}
                    className="w-full p-3 text-center bg-[#ffffff0a] hover:bg-[#ffffff15] rounded-xl border border-[#ffffff1a] transition-all"
                  >
                    {resolution}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          className="mt-8 text-center text-gray-400 text-sm pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>&copy; 2025 Kazor. Baru Belajar Puh 😁🙏</p>
        </motion.footer>
      </div>
    </motion.div>
  );
}
