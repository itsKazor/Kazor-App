import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kazor YT Downloader",
  description: "Download YouTube videos in MP4 format",
  icons : "/favicon.png"
};

const mulish = Inter({
  subsets: ["latin"],
  weight: ["300"], 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
