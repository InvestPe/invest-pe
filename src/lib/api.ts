import axios from 'axios';

// You'll need to replace this with your actual Alpha Vantage API key
const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Cache configuration
const CACHE_DURATION = {
  QUOTE: 60 * 1000, // 1 minute for real-time quotes
  HISTORICAL: 5 * 60 * 1000, // 5 minutes for historical data
};

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: {
  [key: string]: CacheItem<any>;
} = {};

// Cache helper functions
function getCachedData<T>(key: string, duration: number): T | null {
  const item = cache[key];
  if (!item) return null;

  const now = Date.now();
  if (now - item.timestamp > duration) {
    delete cache[key];
    return null;
  }

  return item.data;
}

function setCachedData<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

// Correct symbols for Indian indices (using ETFs that track these indices)
const SENSEX_SYMBOL = 'SENSEXBEES.BSE'; // Nippon India ETF Sensex BeES
const NIFTY_SYMBOL = 'NIFTYBEES.BSE'; // Nippon India ETF Nifty BeES

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockQuote {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
}

// Helper function to validate API response
function isValidQuote(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check for rate limit message
  if (data.Note || data['Information']) {
    console.warn('API Message:', data.Note || data['Information']);
    return false;
  }

  return (
    data['Global Quote'] &&
    data['Global Quote']['05. price'] &&
    data['Global Quote']['09. change'] &&
    data['Global Quote']['10. change percent']
  );
}

// Helper function to validate time series data
function isValidTimeSeries(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Check for rate limit message
  if (data.Note || data['Information']) {
    console.warn('API Message:', data.Note || data['Information']);
    return false;
  }

  return data['Time Series (Daily)'] && Object.keys(data['Time Series (Daily)']).length > 0;
}

// Get the appropriate symbol based on the input
function getSymbol(symbol: string): string {
  switch (symbol) {
    case '^BSESN':
      return SENSEX_SYMBOL;
    case '^NSEI':
      return NIFTY_SYMBOL;
    default:
      return symbol;
  }
}

// Test the API connection
async function testAPIConnection() {
  try {
    console.log('Testing Alpha Vantage API connection...');
    
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: SENSEX_SYMBOL,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    console.log('Test API Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('API Test Error:', error);
    return null;
  }
}

// Fetch real-time stock data
export async function fetchStockData(symbol: string): Promise<MarketData | null> {
  try {
    const actualSymbol = getSymbol(symbol);
    const cacheKey = `quote_${actualSymbol}`;
    
    // Check cache first
    const cachedData = getCachedData<MarketData>(cacheKey, CACHE_DURATION.QUOTE);
    if (cachedData) {
      console.log(`Using cached data for ${actualSymbol}`);
      return cachedData;
    }

    console.log(`Fetching fresh data for ${actualSymbol}`);
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: actualSymbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    if (!response.data || !response.data['Global Quote']) {
      console.warn(`Invalid or empty response for ${actualSymbol}, falling back to mock data`);
      const mockData = getMockData(symbol);
      setCachedData(cacheKey, mockData);
      return mockData;
    }

    const quote = response.data['Global Quote'];
    const price = parseFloat(quote['05. price']) || 0;
    const change = parseFloat(quote['09. change']) || 0;
    const changePercent = parseFloat(quote['10. change percent'].replace('%', '')) || 0;

    // Scale the ETF prices to match actual index values
    const scalingFactor = symbol === '^BSESN' ? 72000 / price : 21800 / price;

    const result = {
      symbol,
      price: price * scalingFactor,
      change: change * scalingFactor,
      changePercent: changePercent, // Percentage remains the same
    };

    // Cache the result
    setCachedData(cacheKey, result);
    return result;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`API Error for ${symbol}:`, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error(`Unknown error for ${symbol}:`, error);
    }
    
    // Return cached data if available, otherwise mock data
    const cacheKey = `quote_${getSymbol(symbol)}`;
    return getCachedData<MarketData>(cacheKey, CACHE_DURATION.QUOTE) || getMockData(symbol);
  }
}

// Fetch historical data for chart
export async function fetchHistoricalData(symbol: string) {
  try {
    const actualSymbol = getSymbol(symbol);
    const cacheKey = `historical_${actualSymbol}`;
    
    // Check cache first
    const cachedData = getCachedData<any[]>(cacheKey, CACHE_DURATION.HISTORICAL);
    if (cachedData) {
      console.log(`Using cached historical data for ${actualSymbol}`);
      return cachedData;
    }

    console.log(`Fetching fresh historical data for ${actualSymbol}`);
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: actualSymbol,
        outputsize: 'compact',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    if (!response.data || !response.data['Time Series (Daily)']) {
      console.warn(`Invalid historical data for ${actualSymbol}, falling back to mock data`);
      const mockData = getMockHistoricalData(symbol);
      setCachedData(cacheKey, mockData);
      return mockData;
    }

    const timeSeries = response.data['Time Series (Daily)'];
    const entries = Object.entries(timeSeries).slice(0, 30);
    
    // Get the scaling factor based on the latest price
    const latestPrice = parseFloat(entries[0][1]['4. close']) || 0;
    const scalingFactor = symbol === '^BSESN' ? 72000 / latestPrice : 21800 / latestPrice;

    const result = entries
      .map(([date, values]: [string, any]) => ({
        date,
        price: (parseFloat(values['4. close']) || 0) * scalingFactor,
      }))
      .reverse();

    // Cache the result
    setCachedData(cacheKey, result);
    return result;

  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    
    // Return cached data if available, otherwise mock data
    const cacheKey = `historical_${getSymbol(symbol)}`;
    return getCachedData<any[]>(cacheKey, CACHE_DURATION.HISTORICAL) || getMockHistoricalData(symbol);
  }
}

// Generate realistic price movements
function generateRealisticPriceMovements(basePrice: number, days: number, volatility: number): number[] {
  const prices: number[] = [basePrice];
  
  for (let i = 1; i < days; i++) {
    // Use sine wave for general trend and add some randomness
    const trend = Math.sin(i / 5) * volatility * 0.5;
    const previousPrice = prices[i - 1];
    const movement = previousPrice * (trend / 100);
    
    // Add some daily variation
    const dailyChange = previousPrice * (volatility / 100) * (i % 2 === 0 ? 1 : -1);
    
    prices.push(previousPrice + movement + dailyChange);
  }
  
  return prices;
}

// Mock data for when API fails or hits rate limit
function getMockData(symbol: string): MarketData {
  const basePrice = symbol === '^BSESN' ? 72156.42 : 21848.75;
  // Use deterministic but realistic changes
  const mockValues = {
    '^BSESN': { change: 156.42, changePercent: 0.22 },
    '^NSEI': { change: 48.75, changePercent: 0.23 }
  };

  const values = mockValues[symbol as keyof typeof mockValues] || { change: 0, changePercent: 0 };

  return {
    symbol,
    price: basePrice,
    change: values.change,
    changePercent: values.changePercent,
  };
}

// Mock historical data with realistic market movements
function getMockHistoricalData(symbol: string) {
  const basePrice = symbol === '^BSESN' ? 72156.42 : 21848.75;
  const volatility = symbol === '^BSESN' ? 0.8 : 0.6; // SENSEX typically has higher volatility
  
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  // Generate realistic price movements
  const prices = generateRealisticPriceMovements(basePrice, 30, volatility);

  return dates.map((date, index) => ({
    date,
    price: prices[index],
  }));
}

// Mock market movers with more realistic data
export async function fetchMarketMovers() {
  return {
    gainers: [
      { ticker: "HDFC Bank", price: "1475.60", change_percentage: "2.8" },
      { ticker: "Reliance", price: "2342.15", change_percentage: "2.3" },
      { ticker: "TCS", price: "3890.25", change_percentage: "1.9" },
      { ticker: "Bajaj Finance", price: "6890.45", change_percentage: "1.7" },
      { ticker: "Asian Paints", price: "3245.80", change_percentage: "1.5" },
    ],
    losers: [
      { ticker: "Tech Mahindra", price: "1234.50", change_percentage: "-2.1" },
      { ticker: "Infosys", price: "1567.30", change_percentage: "-1.8" },
      { ticker: "ITC", price: "432.45", change_percentage: "-1.5" },
      { ticker: "HUL", price: "2456.70", change_percentage: "-1.2" },
      { ticker: "Wipro", price: "456.75", change_percentage: "-1.0" },
    ],
  };
}

// Mock mutual fund data with realistic returns
export async function fetchMutualFunds() {
  return [
    {
      name: "Quant Small Cap Fund",
      oneYearReturn: 48.5,
      threeYearReturn: 39.2,
      aum: "₹8,245 Cr",
    },
    {
      name: "Nippon India Small Cap Fund",
      oneYearReturn: 42.8,
      threeYearReturn: 35.6,
      aum: "₹42,337 Cr",
    },
    {
      name: "SBI Small Cap Fund",
      oneYearReturn: 39.2,
      threeYearReturn: 32.1,
      aum: "₹21,892 Cr",
    },
    {
      name: "Axis Small Cap Fund",
      oneYearReturn: 37.5,
      threeYearReturn: 31.8,
      aum: "₹15,678 Cr",
    },
    {
      name: "Kotak Small Cap Fund",
      oneYearReturn: 36.4,
      threeYearReturn: 30.5,
      aum: "₹12,456 Cr",
    },
  ];
} 