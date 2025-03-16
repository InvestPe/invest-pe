"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import useSWR from "swr";
import { fetchStockData, fetchHistoricalData, fetchMarketMovers, fetchMutualFunds } from "@/lib/api";

// Fetcher functions for SWR
const stockFetcher = async (symbol: string) => {
  const data = await fetchStockData(symbol);
  if (!data) throw new Error(`Failed to fetch data for ${symbol}`);
  return data;
};

const historicalFetcher = async (symbol: string) => {
  const data = await fetchHistoricalData(symbol);
  if (!data.length) throw new Error(`Failed to fetch historical data for ${symbol}`);
  return data;
};

const moversFetcher = () => fetchMarketMovers();
const fundsFetcher = () => fetchMutualFunds();

export default function MarketsPage() {
  const [isClient, setIsClient] = useState(false);

  // Fetch live market data with 5-second refresh interval
  const { data: sensexData, error: sensexError } = useSWR("^BSESN", stockFetcher, { 
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });
  
  const { data: niftyData, error: niftyError } = useSWR("^NSEI", stockFetcher, { 
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });
  
  const { data: historicalSensex } = useSWR("^BSESN-hist", () => historicalFetcher("^BSESN"), { 
    refreshInterval: 300000,
    revalidateOnFocus: false,
  });
  
  const { data: historicalNifty } = useSWR("^NSEI-hist", () => historicalFetcher("^NSEI"), { 
    refreshInterval: 300000,
    revalidateOnFocus: false,
  });
  
  const { data: marketMovers } = useSWR("market-movers", moversFetcher, { 
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  
  const { data: mutualFunds } = useSWR("mutual-funds", fundsFetcher, { 
    refreshInterval: 300000,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prepare chart data
  const chartData = historicalSensex && historicalNifty
    ? historicalSensex.map((item: any, index: number) => ({
        date: format(new Date(item.date), "MMM dd"),
        SENSEX: item.price,
        NIFTY: historicalNifty[index]?.price,
      }))
    : [];

  const LoadingCard = () => (
    <div className="p-6 rounded-lg bg-card border border-border shadow-sm animate-pulse">
      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Market Performance
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            Track live market indices, mutual funds, and market movers
          </p>
        </motion.div>

        {/* Market Indices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {!sensexData && !sensexError ? (
            <LoadingCard />
          ) : sensexData ? (
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-2">SENSEX</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{sensexData.price.toFixed(2)}</span>
                <span className={`text-lg ${sensexData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {sensexData.change >= 0 ? "+" : ""}{sensexData.change.toFixed(2)} ({sensexData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-2">SENSEX</h3>
              <p className="text-red-500">Failed to load data</p>
            </div>
          )}

          {!niftyData && !niftyError ? (
            <LoadingCard />
          ) : niftyData ? (
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-2">NIFTY</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{niftyData.price.toFixed(2)}</span>
                <span className={`text-lg ${niftyData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {niftyData.change >= 0 ? "+" : ""}{niftyData.change.toFixed(2)} ({niftyData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-2">NIFTY</h3>
              <p className="text-red-500">Failed to load data</p>
            </div>
          )}
        </motion.div>

        {/* Performance Chart */}
        {isClient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                30-Day Performance
              </h3>
              <div className="h-[400px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "#64748b" }}
                        tickLine={{ stroke: "#64748b" }}
                      />
                      <YAxis
                        tick={{ fill: "#64748b" }}
                        tickLine={{ stroke: "#64748b" }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="SENSEX"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="NIFTY"
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top Performing Mutual Funds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Top Performing Mutual Funds
              </h3>
              <div className="space-y-6">
                {!mutualFunds ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-lg bg-gray-200 dark:bg-gray-700 h-24"></div>
                    ))}
                  </div>
                ) : (
                  mutualFunds.map((fund) => (
                    <div
                      key={fund.name}
                      className="p-4 rounded-lg bg-background border border-border"
                    >
                      <h4 className="font-medium text-foreground mb-2">
                        {fund.name}
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">1Y Return</p>
                          <p className="font-semibold text-green-500">
                            {fund.oneYearReturn}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">3Y Return</p>
                          <p className="font-semibold text-green-500">
                            {fund.threeYearReturn}%
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">AUM</p>
                          <p className="font-semibold text-foreground">{fund.aum}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Market Movers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6 rounded-lg bg-card border border-border shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Market Movers
              </h3>
              <div className="space-y-6">
                {!marketMovers ? (
                  <div className="animate-pulse space-y-4">
                    <div>
                      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-medium text-foreground mb-4">Top Gainers</h4>
                      <div className="space-y-3">
                        {marketMovers.gainers.map((stock: any) => (
                          <div
                            key={stock.ticker}
                            className="flex justify-between items-center p-3 rounded-lg bg-background border border-border"
                          >
                            <span className="font-medium">{stock.ticker}</span>
                            <div className="text-right">
                              <span className="block text-green-500">
                                +{parseFloat(stock.change_percentage).toFixed(2)}%
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ₹{parseFloat(stock.price).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-4">Top Losers</h4>
                      <div className="space-y-3">
                        {marketMovers.losers.map((stock: any) => (
                          <div
                            key={stock.ticker}
                            className="flex justify-between items-center p-3 rounded-lg bg-background border border-border"
                          >
                            <span className="font-medium">{stock.ticker}</span>
                            <div className="text-right">
                              <span className="block text-red-500">
                                {parseFloat(stock.change_percentage).toFixed(2)}%
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ₹{parseFloat(stock.price).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 