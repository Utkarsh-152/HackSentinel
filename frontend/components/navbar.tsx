"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "CVE Database", path: "/cve" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-[#00FFD1]" />
          <span className="hidden font-bold text-xl sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#00FFD1] to-[#FF007A]">
            HackSentinel
          </span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.path
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#00FFD1] to-[#FF007A]"
                  layoutId="navbar-underline"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}