"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShieldAlert, Home, Terminal } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <ShieldAlert className="h-24 w-24 text-[#FF007A] mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 cyber-glow-pink">
          ACCESS DENIED
        </h1>
        
        <div className="max-w-md mx-auto mb-8 p-4 bg-black/50 rounded-md border border-[#FF007A]/30">
          <Terminal className="h-5 w-5 text-[#FF007A] mb-2 mx-auto" />
          <code className="block text-left font-mono text-sm text-[#FF007A] mb-2">
            &gt; ERROR 404: Page not found
          </code>
          <code className="block text-left font-mono text-sm text-[#00FFD1] mb-2">
            &gt; Unauthorized access attempt detected
          </code>
          <code className="block text-left font-mono text-sm text-white">
            &gt; Security protocols engaged...
          </code>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          The page you are looking for does not exist or you do not have permission to access it.
        </p>

        <Button
          onClick={() => router.push("/")}
          className="bg-transparent backdrop-blur-md border border-[#00FFD1]/30 hover:bg-[#00FFD1]/10 text-[#00FFD1] px-6 py-2 text-lg font-medium transition-all hover:shadow-[0_0_15px_rgba(0,255,209,0.5)]"
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </Button>
      </motion.div>
    </div>
  );
}