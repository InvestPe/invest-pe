"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const isDark = theme === "dark";

  // After mounting, we can show the theme toggle with the correct theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <button
        className={cn(
          "relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 p-1.5 backdrop-blur-sm transition-all hover:bg-blue-500/20",
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="relative h-full w-full"></div>
      </button>
    );
  }

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-400/10 p-1.5 backdrop-blur-sm transition-all hover:bg-blue-500/20",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="relative h-full w-full">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isDark ? 45 : 0, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-yellow-500"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        <motion.div
          initial={{ rotate: -45 }}
          animate={{ rotate: isDark ? 0 : -45, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-blue-400"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.button>
  );
} 