import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  TrendingUp, BarChart2, Settings, LogOut, Bell, Search,
  ChevronDown, ArrowUpRight, ArrowDownRight, Menu,
  Sun, Moon, Activity, Target,
  DollarSign, FileText, Vote, Globe2,
  AlertTriangle, Gem, MessageSquare, ChevronLeft, Send, Bot, User, Loader2
} from 'lucide-react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import { formatIndianCurrency } from '../utils/formatters';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface MarketData {
  nifty50: StockData[];
  sensex: StockData[];
  topGainers: Array<{ symbol: string; price: number; change: number }>;
  topLosers: Array<{ symbol: string; price: number; change: number }>;
}

interface SearchResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type ViewType = 'dashboard' | 'chatbot' | 'economic' | 'balance' | 'election' | 'geopolitical' | 'sanctions' | 'commodity';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const GEMINI_API_KEY = "AIzaSyArA0612q_SpIIHn3EDYUcdROw-7-dWJp4";
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const OPENROUTER_API_KEY = "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";

  const sidebarItems = [
    { icon: BarChart2, label: 'Dashboard', id: 'dashboard' as ViewType },
    { icon: MessageSquare, label: 'Finance Chatbot', id: 'chatbot' as ViewType },
    { icon: DollarSign, label: 'Economic Dashboard', id: 'economic' as ViewType },
    { icon: FileText, label: 'Balance Sheet Analyzer', id: 'balance' as ViewType },
    { icon: Vote, label: 'Election Impact', id: 'election' as ViewType },
    { icon: Globe2, label: 'Geopolitical Alerts', id: 'geopolitical' as ViewType },
    { icon: AlertTriangle, label: 'Sanctions Forecaster', id: 'sanctions' as ViewType },
    { icon: Gem, label: 'Commodity Predictor', id: 'commodity' as ViewType }
  ];

  const ALPHA_VANTAGE_API_KEY = 'KFFXPH42AKYBNDX1';

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting to fetch NIFTY 50 data...');
      // Fetch NIFTY 50 data using the correct symbol format
      const niftyResponse = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NSE:NIFTY&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      console.log('NIFTY 50 API Response:', niftyResponse.data);

      // Check for API error messages
      if (niftyResponse.data.Note) {
        throw new Error(`Alpha Vantage API limit: ${niftyResponse.data.Note}`);
      }

      if (niftyResponse.data['Error Message']) {
        throw new Error(`Alpha Vantage API error: ${niftyResponse.data['Error Message']}`);
      }

      if (!niftyResponse.data['Time Series (5min)']) {
        console.error('Invalid NIFTY 50 data structure:', niftyResponse.data);
        throw new Error('No data available for NIFTY 50');
      }

      // Process NIFTY 50 data
      const niftyData = Object.entries(niftyResponse.data['Time Series (5min)'])
        .map(([date, values]: [string, any]) => ({
          date,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
          volume: parseInt(values['5. volume'])
        }))
        .slice(0, 30)
        .reverse();

      console.log('Processed NIFTY 50 data:', niftyData);

      // Add delay to avoid API rate limiting
      await new Promise(resolve => setTimeout(resolve, 12000));

      console.log('Starting to fetch SENSEX data...');
      // Fetch SENSEX data using the correct symbol format
      const sensexResponse = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=BSE:SENSEX&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      console.log('SENSEX API Response:', sensexResponse.data);

      // Check for API error messages
      if (sensexResponse.data.Note) {
        throw new Error(`Alpha Vantage API limit: ${sensexResponse.data.Note}`);
      }

      if (sensexResponse.data['Error Message']) {
        throw new Error(`Alpha Vantage API error: ${sensexResponse.data['Error Message']}`);
      }

      if (!sensexResponse.data['Time Series (5min)']) {
        console.error('Invalid SENSEX data structure:', sensexResponse.data);
        throw new Error('No data available for SENSEX');
      }

      // Process SENSEX data
      const sensexData = Object.entries(sensexResponse.data['Time Series (5min)'])
        .map(([date, values]: [string, any]) => ({
          date,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
          volume: parseInt(values['5. volume'])
        }))
        .slice(0, 30)
        .reverse();

      console.log('Processed SENSEX data:', sensexData);

      // Add delay to avoid API rate limiting
      await new Promise(resolve => setTimeout(resolve, 12000));

      // Top Indian stocks to fetch with correct symbol format
      const topStocks = [
        'NSE:RELIANCE',
        'NSE:TCS',
        'NSE:HDFCBANK',
        'NSE:INFY',
        'NSE:ITC'
      ];

      console.log('Starting to fetch top stocks data...');
      // Fetch real-time data for top stocks
      const stocksData = await Promise.all(
        topStocks.map(async (symbol, index) => {
          try {
            // Add delay between stock requests
            await new Promise(resolve => setTimeout(resolve, index * 12000));
            console.log(`Fetching data for ${symbol}...`);
            
            const response = await axios.get(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
            );
            
            console.log(`Response for ${symbol}:`, response.data);

            // Check for API error messages
            if (response.data.Note) {
              console.warn(`API limit reached for ${symbol}: ${response.data.Note}`);
              return null;
            }

            if (response.data['Error Message']) {
              console.error(`API error for ${symbol}: ${response.data['Error Message']}`);
              return null;
            }

            const quote = response.data['Global Quote'];
            if (!quote) {
              console.error(`No quote data available for ${symbol}`);
              return null;
            }

            return {
              symbol: symbol.split(':')[1], // Remove the exchange prefix
              price: parseFloat(quote['05. price']),
              change: parseFloat(quote['09. change']),
              changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
            };
          } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return null;
          }
        })
      );

      // Filter out failed requests and sort stocks by change percentage
      const validStocks = stocksData.filter(stock => stock !== null) as Array<{
        symbol: string;
        price: number;
        change: number;
        changePercent: number;
      }>;

      console.log('Valid stocks data:', validStocks);

      const sortedStocks = validStocks.sort((a, b) => b.changePercent - a.changePercent);

      // Update market data state
      const newMarketData = {
        nifty50: niftyData,
        sensex: sensexData,
        topGainers: sortedStocks.filter(stock => stock.changePercent > 0),
        topLosers: sortedStocks.filter(stock => stock.changePercent < 0).reverse()
      };

      console.log('Setting new market data:', newMarketData);
      setMarketData(newMarketData);

    } catch (error: any) {
      console.error('Error fetching market data:', error);
      const errorMessage = error.response?.data?.['Error Message'] || error.response?.data?.Note || error.message;
      setError(`Failed to fetch market data: ${errorMessage}`);
      setMarketData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length < 1) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );

        if (!response.data.bestMatches) {
          throw new Error('No search results available');
        }

        const indianStocks = response.data.bestMatches
          .filter((match: any) => match['4. region'] === 'India');

        if (indianStocks.length === 0) {
          setSearchResults([]);
          return;
        }

        // Get real-time prices for search results
        const resultsWithPrices = await Promise.all(
          indianStocks.map(async (match: any) => {
            try {
              await new Promise(resolve => setTimeout(resolve, 1000));
              const quoteResponse = await axios.get(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${match['1. symbol']}&apikey=${ALPHA_VANTAGE_API_KEY}`
              );

              const quote = quoteResponse.data['Global Quote'];
              if (!quote) {
                throw new Error(`No quote data for ${match['1. symbol']}`);
              }

              return {
                symbol: match['1. symbol'],
                name: match['2. name'],
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['09. change']),
                changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
              };
    } catch (error) {
              console.error(`Error fetching quote for ${match['1. symbol']}:`, error);
              throw error;
            }
          })
        );

        setSearchResults(resultsWithPrices);
    } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const isFinanceRelated = (message: string): boolean => {
    // Normalize the message
    const normalizedMessage = message.toLowerCase().trim();
    
    // List of common greetings and non-finance messages
    const greetings = [
      'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
      'how are you', 'what\'s up', 'sup', 'hi there', 'hello there'
    ];

    // Check if it's a greeting
    if (greetings.some(greeting => normalizedMessage.startsWith(greeting))) {
      return false;
    }

    // Core finance-related terms with common variations and potential misspellings
    const financeKeywords = {
      general: ['financ', 'money', 'wealth', 'economic', 'invest', 'capital', 'fund', 'asset'],
      markets: ['stock', 'share', 'market', 'trade', 'nifty', 'sensex', 'bse', 'nse', 'nasdaq', 'dow'],
      banking: ['bank', 'credit', 'debit', 'loan', 'deposit', 'withdraw', 'account', 'saving'],
      trading: ['trade', 'buy', 'sell', 'long', 'short', 'option', 'future', 'position'],
      currency: ['currenc', 'forex', 'dollar', 'rupee', 'euro', 'gbp', 'usd', 'inr', 'exchange'],
      analysis: ['technical', 'fundamental', 'chart', 'pattern', 'trend', 'analysis', 'indicator'],
      instruments: ['bond', 'equity', 'commodity', 'gold', 'silver', 'etf', 'mutual', 'derivative'],
      metrics: ['price', 'rate', 'yield', 'return', 'profit', 'loss', 'revenue', 'dividend'],
      corporate: ['company', 'business', 'corporate', 'industry', 'sector', 'enterprise'],
      risk: ['risk', 'volatil', 'hedge', 'diversif', 'portfolio', 'exposure'],
      economy: ['gdp', 'inflation', 'deflation', 'recession', 'growth', 'fiscal', 'monetary'],
      common_misspellings: ['stonk', 'finence', 'monies', 'currancy', 'invst', 'trad', 'stok', 'banc']
    };

    // Convert message to lowercase and remove special characters
    const cleanMessage = normalizedMessage.replace(/[^a-z0-9\s]/g, '');
    const words = cleanMessage.split(/\s+/);

    // Function to check if a word is similar to any keyword (handles minor spelling mistakes)
    const isSimilarToKeyword = (word: string, keyword: string): boolean => {
      if (word.length < 3) return false; // Skip very short words
      
      // Direct match or contains
      if (keyword.includes(word) || word.includes(keyword)) return true;
      
      // Check if word starts with keyword (for word stems)
      if (word.startsWith(keyword) || keyword.startsWith(word)) return true;
      
      // Simple Levenshtein distance for short words (handles minor typos)
      if (Math.abs(word.length - keyword.length) <= 2) {
        let differences = 0;
        for (let i = 0; i < Math.min(word.length, keyword.length); i++) {
          if (word[i] !== keyword[i]) differences++;
          if (differences > 2) return false;
        }
        return differences <= 2;
      }
      
      return false;
    };

    // Check each word against all keyword categories
    for (const word of words) {
      for (const category of Object.values(financeKeywords)) {
        for (const keyword of category) {
          if (isSimilarToKeyword(word, keyword)) {
            return true;
          }
        }
      }
    }

    // Check for common finance-related phrases
    const phrases = [
      'how to', 'what is', 'explain', 'tell me about', 'define',
      'difference between', 'compare', 'versus', 'vs'
    ];

    for (const phrase of phrases) {
      if (normalizedMessage.includes(phrase)) {
        // If it's a question about a potentially financial topic, consider it finance-related
        return true;
      }
    }

    return false;
  };

  // Add typing animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping) {
      interval = setInterval(() => {
        setTypingDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
    } else {
      setTypingDots('');
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  // Add auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      console.log('Starting API request...');
      
      // Check if API key is present
      if (!OPENROUTER_API_KEY) {
        console.error('OpenRouter API key is missing');
        throw new Error('API configuration error');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      // Check if user requested detailed explanation
      const detailKeywords = [
        'in detail', 'explain', 'detailed', 'elaborate', 
        'tell me more', 'how does', 'why does', 'what causes',
        'describe', 'breakdown', 'comprehensive', 'thorough',
        'complete', 'full', 'depth', 'extensively'
      ];

      const isDetailedRequest = detailKeywords.some(keyword => 
        prompt.toLowerCase().includes(keyword)
      );

      console.log('Making API request to OpenRouter...');
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "GeoStock Trading Assistant",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.5-pro-exp-03-25:free",
          "messages": [
            {
              "role": "system",
              "content": isDetailedRequest 
                ? `You are a financial advisor and trading expert. Provide comprehensive, detailed, and well-structured responses to finance-related questions. 
                   Follow these guidelines:
                   1. Start with a clear introduction
                   2. Break down complex concepts into digestible parts
                   3. Use bullet points or numbered lists for key points
                   4. Include relevant examples where appropriate
                   5. End with a summary or key takeaways
                   6. Ensure the response is complete and well-rounded
                   7. Use markdown formatting for better readability
                   8. If the question is not finance-related, politely decline and suggest finance-related topics`
                : `You are a financial advisor and trading expert. Provide concise, clear, and to-the-point responses to finance-related questions.
                   Follow these guidelines:
                   1. Keep responses brief (4-5 lines maximum)
                   2. Focus on the key points
                   3. Use simple, clear language
                   4. Avoid unnecessary details
                   5. If the question is not finance-related, politely decline and suggest finance-related topics`
            },
            {
              "role": "user",
              "content": prompt
            }
          ],
          "temperature": 0.7,
          "max_tokens": isDetailedRequest ? 2000 : 500,
          "stream": false
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('API Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        // Handle specific error cases
        if (response.status === 429) {
          return "I'm currently experiencing high demand. Please wait a moment and try your question again.";
        }
        if (response.status === 401) {
          return "There seems to be an issue with the API configuration. Please contact support.";
        }
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response Data:', data);
      
      if (!data.choices || !data.choices[0]?.message?.content) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from API');
      }

      let content = data.choices[0].message.content.trim();
      
      if (!content) {
        throw new Error('Empty response received from API');
      }

      // If we get a valid response but it's too short, try to enhance it
      if (content.split('.').length < 2) {
        console.log('Response too short, enhancing...');
        const enhancedResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "GeoStock Trading Assistant",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "google/gemini-2.5-pro-exp-03-25:free",
            "messages": [
              {
                "role": "system",
                "content": "Please provide a complete and meaningful response to the following question."
              },
              {
                "role": "user",
                "content": `Please provide a complete answer to: ${prompt}`
              }
            ],
            "temperature": 0.7,
            "max_tokens": 500,
            "stream": false
          })
        });

        const enhancedData = await enhancedResponse.json();
        if (enhancedData.choices?.[0]?.message?.content) {
          content = enhancedData.choices[0].message.content.trim();
        }
      }

      return content;
    } catch (error: any) {
      console.error('Detailed Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      if (error.name === 'AbortError') {
        return "I apologize, but the request timed out. Please try again with a more specific question or wait a moment before trying again.";
      }
      
      if (error.message.includes('rate limit')) {
        return "I'm currently experiencing high demand. Please wait a moment and try your question again.";
      }
      
      if (error.message.includes('API configuration error')) {
        return "There seems to be an issue with the API configuration. Please contact support.";
      }
      
      if (error.message.includes('network')) {
        return "I'm having trouble connecting to the service. Please check your internet connection and try again.";
      }

      // Fallback response for finance-related questions
      if (isFinanceRelated(prompt)) {
        return "I apologize for the technical difficulty. Please try asking your question again in a moment.";
      }

      return "I'm sorry, I'm specialized in finance and trading topics only. Please ask me questions related to stocks, markets, trading, economy, or other financial matters.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const normalizedMessage = inputMessage.toLowerCase().trim();
      const greetings = [
        'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
        'how are you', 'what\'s up', 'sup', 'hi there', 'hello there'
      ];

      // Check if it's a greeting
      if (greetings.some(greeting => normalizedMessage.startsWith(greeting))) {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "Hello! I'm your Finance & Trading Assistant. How can I help you with finance, trading, or market-related questions today?",
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botMessage]);
        return;
      }

      if (isFinanceRelated(inputMessage)) {
        const response = await generateGeminiResponse(inputMessage);
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "I'm specialized in finance and trading topics. Feel free to ask me about stocks, markets, trading, economy, or other financial matters.",
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (currentView === 'chatbot' && chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Hello! I'm your Finance & Trading Assistant. I can help you with questions about finance, trading, stocks, market analysis, and economic trends. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }
  }, [currentView]);

  const renderChart = (data: StockData[], title: string) => {
    if (!data || data.length === 0) return null;

    const latestData = data[data.length - 1];
    const previousData = data[data.length - 2];
    const change = latestData.close - previousData.close;
    const changePercent = (change / previousData.close) * 100;

    return (
      <div className="bg-secondary rounded-lg p-4 shadow-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{formatIndianCurrency(latestData.close)}</span>
            <span className={`text-sm ${change >= 0 ? 'text-success' : 'text-danger'}`}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
                </div>
              </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={change >= 0 ? '#10B981' : '#EF4444'} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={change >= 0 ? '#10B981' : '#EF4444'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="date" 
                stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
                tick={{ fill: isDarkMode ? '#9CA3AF' : '#4B5563' }}
                tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
              <YAxis 
                stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
                tick={{ fill: isDarkMode ? '#9CA3AF' : '#4B5563' }}
                tickFormatter={(value) => formatIndianCurrency(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: '1px solid var(--border-color)',
                }}
                labelStyle={{ color: isDarkMode ? '#E5E7EB' : '#111827' }}
                formatter={(value: any) => [formatIndianCurrency(value), 'Price']}
                labelFormatter={(label) => new Date(label).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke={change >= 0 ? '#10B981' : '#EF4444'}
                fill={`url(#color${title})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
            </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-primary/5 p-2 rounded">
            <div className="text-sm text-gray-500">High</div>
            <div className="font-medium">{formatIndianCurrency(latestData.high)}</div>
          </div>
          <div className="bg-primary/5 p-2 rounded">
            <div className="text-sm text-gray-500">Low</div>
            <div className="font-medium">{formatIndianCurrency(latestData.low)}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderMoversCard = (title: string, data: Array<{ symbol: string; price: number; change: number }>) => {
    return (
      <div className="bg-secondary rounded-lg p-4 shadow-lg animate-slide-up">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div 
              key={item.symbol}
              className="flex justify-between items-center p-2 rounded hover:bg-primary/5 transition-colors"
            >
                <div className="flex items-center space-x-2">
                <span className="font-medium">{item.symbol}</span>
                <span className="text-sm text-gray-500">
                  {formatIndianCurrency(item.price)}
                </span>
                  </div>
              <div className={`text-sm font-medium ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </div>
              </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChatbotContent = () => {
    const markdownComponents: Components = {
      p: ({node, ...props}) => <p className="mb-2" {...props} />,
      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
      em: ({node, ...props}) => <em className="italic" {...props} />,
      ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
      ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
      li: ({node, ...props}) => <li className="mb-1" {...props} />,
      code: ({node, className, children, ...props}) => {
        const match = /language-(\w+)/.exec(className || '');
        return !match ? (
          <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5" {...props}>
            {children}
          </code>
        ) : (
          <code className="block bg-gray-200 dark:bg-gray-700 rounded p-2 my-2" {...props}>
            {children}
          </code>
        );
      },
      pre: ({node, ...props}) => <pre className="bg-gray-200 dark:bg-gray-700 rounded p-2 my-2 overflow-x-auto" {...props} />,
    };

    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Header */}
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Finance Assistant</h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Ask me anything about the markets</p>
            </div>
                </div>
              </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2"
        >
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end mr-4' : 'justify-start ml-10'
              }`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-primary" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                        </div>
                <div className={`p-2.5 rounded-2xl ${
                  message.sender === 'user'
                    ? isDarkMode
                      ? 'bg-primary text-white rounded-tr-none min-w-[200px] max-w-[80%]'
                      : 'bg-primary text-white rounded-tr-none min-w-[200px] max-w-[80%]'
                    : isDarkMode
                      ? 'bg-gray-800 text-white rounded-tl-none max-w-[80%]'
                      : 'bg-gray-100 text-gray-900 rounded-tl-none max-w-[80%]'
                } shadow-sm relative`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        ...markdownComponents,
                        p: ({node, ...props}) => <p className="mb-1" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                      </div>
                  <div className={`mt-1.5 text-[10px] flex items-center justify-end ${
                    message.sender === 'user'
                      ? isDarkMode
                        ? 'text-gray-300'
                        : 'text-gray-100'
                      : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                  }`}>
                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.sender === 'user' && (
                      <svg className="ml-1 h-2.5 w-2.5" viewBox="0 0 16 15" fill="currentColor">
                        <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L3.724 9.587a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512z"/>
                      </svg>
                  )}
                </div>
              </div>
            </div>
                    </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Bot className="h-5 w-5 text-primary" />
                    </div>
              <div className={`p-3 rounded-2xl rounded-tl-none ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              } shadow-sm`}>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Thinking{typingDots}</span>
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
                    </div>
          )}
                </div>

        {/* Chat Input */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className={`flex-1 p-3 rounded-full border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`p-3 rounded-full ${
                inputMessage.trim()
                  ? 'bg-primary text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-100 text-gray-400'
              } transition-colors duration-200`}
            >
              <Send className="h-5 w-5" />
            </button>
                    </div>
                    </div>
                  </div>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <div className="p-4 mb-6 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 rounded">
        <p className="font-medium">{error}</p>
        <button 
          onClick={fetchMarketData}
          className="mt-2 px-4 py-2 bg-red-200 dark:bg-red-800 rounded hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
                </div>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="p-6">
            {renderError()}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {marketData && (
                    <>
                      {renderChart(marketData.nifty50, 'NIFTY 50')}
                      {renderChart(marketData.sensex, 'SENSEX')}
                    </>
                  )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {marketData && (
                    <>
                      <div className="lg:col-span-2">
                        {renderMoversCard('Top Gainers', marketData.topGainers)}
                          </div>
                          <div>
                        {renderMoversCard('Top Losers', marketData.topLosers)}
                          </div>
                    </>
                  )}
                        </div>
              </>
            )}
                        </div>
        );
      case 'chatbot':
        return renderChatbotContent();
      default:
        return (
          <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} m-6`}>
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">{sidebarItems.find(item => item.id === currentView)?.label}</h2>
                <p className="text-gray-500">This feature is coming soon!</p>
                      </div>
                  </div>
                </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                        </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          isDarkMode 
            ? 'bg-gray-800' 
            : 'bg-white'
        } transition-all duration-300 ease-in-out z-30`}
      >
        {/* Logo section */}
        <div className="flex items-center h-16 px-6 justify-between">
          <div className="flex items-center">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span className={`ml-3 text-lg font-semibold transition-opacity duration-300 ${
              isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'
            }`}>
              GeoStock
            </span>
                        </div>
                <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
            {isSidebarCollapsed ? (
                  <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
                </button>
                      </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg ${
                item.id === currentView
                  ? 'bg-primary text-white' 
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              } transition-all duration-300 ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <item.icon className={`h-5 w-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
              <span className={`transition-opacity duration-300 ${
                isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'
              }`}>
                {item.label}
              </span>
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transform -translate-x-2 transition-all duration-300">
                  {item.label}
                    </div>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'pl-20' : 'pl-64'
      }`}>
        {/* Header */}
        <header className={`h-16 px-6 flex items-center justify-between ${
          isDarkMode 
            ? 'bg-gray-800' 
            : 'bg-white'
        }`}>
          {/* Logo or other left content can go here */}
          <div className="w-32"></div>

          {/* Search bar with dropdown */}
          <div className="flex-1 flex justify-center max-w-2xl mx-auto relative">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                placeholder="Search stocks..."
                    value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full pl-12 pr-4 py-2.5 text-sm rounded-full border-2 border-gray-900 ${
                      isDarkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 focus:border-gray-600' 
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-700'
                } focus:outline-none transition-colors duration-200`}
              />
              
              {/* Search Results Dropdown */}
              {searchQuery.length > 0 && (
                <div className={`absolute mt-2 w-full rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } border border-gray-200 dark:border-gray-700 z-50`}>
                  {isSearching ? (
                    <div className="p-4 text-center">
                      <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                        </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            index !== searchResults.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{result.symbol.split('.')[0]}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{result.name}</div>
                        </div>
                            <div className="text-right">
                              <div className="font-medium">{formatIndianCurrency(result.price)}</div>
                              <div className={`text-sm ${result.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {result.changePercent >= 0 ? '+' : ''}{result.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
                      ))}
              </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No results found
            </div>
                  )}
                </div>
              )}
          </div>
        </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 w-32 justify-end">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            
                <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Bell className="h-5 w-5" />
                </button>

                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center"
                  >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                        {user?.email?.[0].toUpperCase()}
                    </div>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${
                  showProfileMenu ? 'rotate-180' : ''
                      }`} />
                  </button>
                  
                  {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border`}>
                      <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile Settings
                        </button>
                        <button
                      onClick={() => supabase.auth.signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                      Sign out
                        </button>
                    </div>
                    </div>
                  )}
                  </div>
                </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;