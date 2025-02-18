"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      scaleY: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-950 p-3 fixed w-full top-0 z-50"
    >
      <div className="flex items-center justify-between container mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <a
          className="flex items-center space-x-2"
            href="https://github.com/itsKazor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/subaru.png"
              alt="Kazor"
              width="40"
              height="40"
              className="rounded-full border-2 border-orange-300"
            />
            <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
              Kazor
            </h1>
          </a>
        </motion.div>

        <motion.button
          onClick={toggleMenu}
          className="text-white relative h-8 w-8"
        >
          <svg viewBox="0 0 24 24" className="absolute inset-0">
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              d="M 3 5 L 21 5"
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              d="M 3 12 L 21 12"
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              d="M 3 19 L 21 19"
            />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute right-4 top-full mt-2 bg-zinc-950/80 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-zinc-950"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="font-bold text-orange-300 mb-3 text-lg">
                AI Chat Tools
              </h2>
              <ul className="space-y-2">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/deepseek"
                    className={`text-white hover:text-orange-300 transition-colors ${
                      pathname === "/deepseek" ? "text-orange-400" : ""
                    }`}
                  >
                    Kazor AI
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-bold text-orange-300 mb-3 text-lg">
                Downloader
              </h2>
              <ul className="space-y-2">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/"
                    className={`text-white hover:text-orange-300 transition-colors ${
                      pathname === "/" ? "text-orange-400" : ""
                    }`}
                  >
                    YouTube
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/facebook"
                    className={`text-white hover:text-orange-300 transition-colors ${
                      pathname === "/facebook" ? "text-orange-400" : ""
                    }`}
                  >
                    Facebook
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/instagram"
                    className={`text-white hover:text-orange-300 transition-colors ${
                      pathname === "/instagram" ? "text-orange-400" : ""
                    }`}
                  >
                    Instagram
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
