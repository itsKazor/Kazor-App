"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/footer";

interface VideoData {
  resolution: string;
  thumbnail: string;
  url: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDownloadLinks = async () => {
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(
          url
        )}`
      );
      const result = await res.json();
      setVideos(result.data);
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
      className="min-h-screen flex flex-col items-center pt-20 bg-black text-white p-4 relative overflow-hidden"
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
            <span className="text-orange-300">FACEBOOK DOWNLOADER</span>
          </h1>
          <p className="text-gray-300 text-sm lg:text-base">
            Paste Facebook URL below
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
            placeholder="Enter Facebook URL..."
            className="flex-1 p-4 rounded-2xl bg-[#ffffff0d] backdrop-blur-sm border border-[#ffffff1a] focus:border-orange-500 focus:ring-2 focus:ring-orange-800 outline-none transition-all"
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
              "Download"
            )}
          </motion.button>
        </motion.div>

        {/* Video List */}
        <AnimatePresence>
          {videos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full space-y-4"
            >
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  className="bg-[#ffffff0d] backdrop-blur-lg w-full mx-auto rounded-2xl p-6 border border-[#ffffff1a] flex items-center space-x-6"
                >
                  {/* Thumbnail */}
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="relative w-32 h-32 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={video.thumbnail}
                      alt="Thumbnail"
                      width={200}
                      height={120}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>

                  {/* Download Button */}
                  <motion.div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {video.resolution}
                    </h3>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(video.url)}
                      className="w-full p-3 text-center bg-[#ffffff0a] hover:bg-[#ffffff15] rounded-xl border border-[#ffffff1a] transition-all"
                    >
                      Download Video
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
}
