"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #e5e7eb 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>
      
      <div className="container relative">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 px-3 py-1 text-sm backdrop-blur-sm"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
              Revolutionizing Investments
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
            >
              <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">Invest</span> in your future with confidence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 text-lg text-gray-500 dark:text-gray-400 md:pr-8"
            >
              InvestPe provides smart, secure, and simplified investment solutions for mutual funds and insurance. Start your journey to financial freedom today.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/investments">
                <button className="rounded-full bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600">
                  Start Investing
                </button>
              </Link>
              <Link href="/markets">
                <button className="rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-3 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Learn More
                </button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex items-center gap-6"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold">₹10Cr+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Assets Managed</span>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">50k+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Happy Investors</span>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">99%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-1 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.15),transparent_70%)]"></div>
              <div className="absolute inset-0 rounded-2xl bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
              
              {/* Placeholder for investment dashboard illustration */}
              <div className="relative h-full w-full rounded-xl bg-white/30 dark:bg-gray-900/30 p-4">
                <div className="absolute right-4 top-4 flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/70"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                </div>
                
                <div className="mt-6 grid gap-4">
                  <div className="h-8 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-32 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -right-6 top-20 h-16 w-16 rounded-2xl bg-blue-500/10 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 10, opacity: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
              className="absolute -left-8 bottom-20 h-20 w-20 rounded-full bg-gray-200/20 dark:bg-gray-700/20 backdrop-blur-sm"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 