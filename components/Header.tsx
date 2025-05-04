"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { motion } from "framer-motion";
import { Brain, Home, LayoutGrid, History } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background sticky top-0 z-10 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-3 text-primary">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: 0 }}
            >
              <Brain className="h-7 w-7" />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Quiz Master
            </motion.h1>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              href="/categories"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                pathname === "/categories" ||
                pathname.startsWith("/categories/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </Link>

            <Link
              href="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                pathname === "/history"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Link>

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
