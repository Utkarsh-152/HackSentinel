"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Shield, Database, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const fullText = "Stay Ahead of Cyber Threats.";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, count + 1));
        setCount(count + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [count, fullText]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0D0D]">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="cyber-grid" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Shield className="h-24 w-24 text-[#00FFD1] mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] to-[#FF007A] drop-shadow-[0_0_15px_rgba(0,255,209,0.5)]">
            HackSentinel
          </span>
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl md:text-2xl font-medium text-white/80 mb-8 h-8"
        >
          {text}
          <span className="animate-pulse">|</span>
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={() => router.push("/news")}
            className="bg-transparent backdrop-blur-md border border-[#00FFD1]/30 hover:bg-[#00FFD1]/10 text-[#00FFD1] px-8 py-6 text-lg font-medium transition-all hover:shadow-[0_0_15px_rgba(0,255,209,0.5)] group"
          >
            <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            Latest Cyber News
          </Button>
          <Button
            onClick={() => router.push("/cve")}
            className="bg-transparent backdrop-blur-md border border-[#FF007A]/30 hover:bg-[#FF007A]/10 text-[#FF007A] px-8 py-6 text-lg font-medium transition-all hover:shadow-[0_0_15px_rgba(255,0,122,0.5)] group"
          >
            <Database className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            CVE Database
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}