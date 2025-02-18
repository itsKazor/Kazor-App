"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Footer */}
      <motion.footer
        className="mt-8 text-center text-gray-400 text-sm pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>
          &copy; 2025 Kazor. Baru Belajar Puh 😁🙏 

        </p>
        <button
            onClick={() => setIsOpen(true)}
            className="text-orange-300 hover:underline"
          >
            Donate Here
          </button>
      </motion.footer>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="relative bg-white p-4 rounded-lg">
            <Image
              src="/qris.jpg"
              alt="Subaru"
              width={300}
              height={200}
              className="rounded-md"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
