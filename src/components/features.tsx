"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Shield, Zap, TrendingUp, Layers } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Mutual Funds",
    description: "Access a wide range of mutual funds with expert-curated portfolios for every investment goal.",
    href: "/investments/mutual-funds",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Insurance Plans",
    description: "Protect your future with comprehensive insurance plans tailored to your specific needs.",
    href: "/insurance",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Quick Investments",
    description: "Start investing in minutes with our streamlined onboarding process and user-friendly interface.",
    href: "/investments",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Performance Tracking",
    description: "Monitor your investments in real-time with detailed analytics and performance metrics.",
    href: "/markets",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Diversified Portfolios",
    description: "Spread your investments across multiple asset classes to optimize returns and minimize risk.",
    href: "/investments/portfolios",
  },
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Powerful features for <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">smarter investing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400"
          >
            InvestPe combines cutting-edge technology with financial expertise to provide you with the best investment experience.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 backdrop-blur-sm transition-all hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="mb-4 text-gray-500 dark:text-gray-400">{feature.description}</p>
                <div className="flex items-center text-sm font-medium text-blue-500">
                  <span>Learn more</span>
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                </div>
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 translate-y-[-8px] bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 