"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            About Our Expert
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4"
          >
            Four decades of financial expertise at your service
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            <Image
              src="/advisor.jpg"
              alt="Mr. Soumendra Bhattacharjee"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Mr. Soumendra Bhattacharjee
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A distinguished financial advisor and investment consultant with over 40 years of experience in the financial services industry. His expertise spans across wealth management, asset management, mutual funds, and insurance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Wealth Management</h3>
                  <p className="text-muted-foreground">Expert portfolio management and financial planning</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Asset Management</h3>
                  <p className="text-muted-foreground">Strategic asset allocation and risk management</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Insurance Planning</h3>
                  <p className="text-muted-foreground">Comprehensive insurance solutions and risk protection</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Professional Background</h2>
          <p className="text-muted-foreground mb-4">
            Throughout his illustrious career spanning four decades, Mr. Soumendra Bhattacharjee has been dedicated to helping individuals and families achieve their financial goals through personalized investment strategies and comprehensive financial planning.
          </p>
          <p className="text-muted-foreground mb-4">
            His expertise in mutual funds and insurance has helped countless clients build and protect their wealth, while his deep understanding of market dynamics and investment principles has proven invaluable in navigating various market conditions.
          </p>
          <p className="text-muted-foreground mb-8">
            Mr. Bhattacharjee's client-centric approach, combined with his extensive experience and knowledge, makes him a trusted advisor for those seeking to secure their financial future and create lasting wealth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-2">40+</h3>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-2">250+</h3>
              <p className="text-muted-foreground">Satisfied Clients</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-2">₹50Cr+</h3>
              <p className="text-muted-foreground">Assets Under Advisory</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 