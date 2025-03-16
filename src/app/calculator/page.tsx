"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function CalculatorPage() {
  const [calculatorType, setCalculatorType] = useState<"sip" | "lumpsum">("sip");
  const [amount, setAmount] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(12);
  const [result, setResult] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
  }>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
  });

  const calculateSIP = () => {
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    const totalInvestment = amount * months;
    
    const maturityValue =
      amount *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const totalReturns = maturityValue - totalInvestment;

    setResult({
      totalInvestment,
      totalReturns,
      maturityValue,
    });
  };

  const calculateLumpsum = () => {
    const totalInvestment = amount;
    const maturityValue = amount * Math.pow(1 + rate / 100, years);
    const totalReturns = maturityValue - totalInvestment;

    setResult({
      totalInvestment,
      totalReturns,
      maturityValue,
    });
  };

  useEffect(() => {
    if (calculatorType === "sip") {
      calculateSIP();
    } else {
      calculateLumpsum();
    }
  }, [amount, years, rate, calculatorType]);

  const chartData = {
    labels: ["Total Investment", "Expected Returns"],
    datasets: [
      {
        data: [result.totalInvestment, result.totalReturns],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderColor: ["#2563eb", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

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
            Investment Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4"
          >
            Plan your financial future with our easy-to-use calculator
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div className="space-y-8">
            <div className="flex gap-4">
              <button
                onClick={() => setCalculatorType("sip")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  calculatorType === "sip"
                    ? "bg-blue-500 text-white"
                    : "bg-card text-muted-foreground"
                }`}
              >
                SIP Calculator
              </button>
              <button
                onClick={() => setCalculatorType("lumpsum")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  calculatorType === "lumpsum"
                    ? "bg-blue-500 text-white"
                    : "bg-card text-muted-foreground"
                }`}
              >
                Lump Sum Calculator
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  {calculatorType === "sip" ? "Monthly Investment" : "One-time Investment"}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground"
                  min="500"
                  step="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground"
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Expected Return Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(result.totalInvestment)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground">Expected Returns</p>
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(result.totalReturns)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500 text-white">
                <p className="text-sm">Maturity Value</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(result.maturityValue)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        color: "#64748b",
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number;
                          return ` ${formatCurrency(value)}`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 prose prose-lg dark:prose-invert max-w-none"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Understanding the Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">SIP Calculator</h3>
              <p className="text-muted-foreground">
                A Systematic Investment Plan (SIP) calculator helps you estimate the returns on your
                regular monthly investments. It considers the power of compounding and helps you
                plan your long-term financial goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Lump Sum Calculator</h3>
              <p className="text-muted-foreground">
                The lump sum calculator helps you determine the future value of a one-time
                investment. It's useful when you have a significant amount to invest at once and
                want to estimate its growth over time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 