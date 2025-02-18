"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center pt-20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-4 relative overflow-hidden"
    >
      {/* Container */}
      <div className="w-full max-w-lg lg:max-w-3xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="mb-8 pt-8 text-center"
        >
          <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">
            WELCOME TO <span className="text-orange-300">KAZOR</span> 
          </h1>
          <p className="text-gray-300 text-sm lg:text-base">
            Discover AI-powered chat services and download videos effortlessly.
          </p>
        </motion.header>

        {/* GIF Animation */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <Image
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTVsOWJ4dHE3Y2tjbjQ5czh4OXVwaXhjZDF4N2d0eGdjNWVtZDdrdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aDS8SjVtS3Mwo/giphy.gif"
            alt="Downloading GIF"
            width={250}
            height={250}
            className="rounded-lg"
          />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="mt-2 text-base sm:text-lg text-gray-300">
            Kazor provides AI-powered tools for chatting and video downloading.
            Paste the URL of YouTube, Facebook, or Instagram, and enjoy fast and
            easy downloads! To access the menu, please click the menu in the
            top-right corner.
          </p>  
        </motion.div>

        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
}
