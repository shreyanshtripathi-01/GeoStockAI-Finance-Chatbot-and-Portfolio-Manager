import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, TrendingUp, Brain, Shield, ArrowRight, ChevronDown, 
  Users, BarChart2, Target, Award, Quote, Newspaper, 
  ArrowUpRight, ArrowDownRight, DollarSign, Activity
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    users: 0,
    trades: 0,
    accuracy: 0,
    countries: 0
  });

  useEffect(() => {
    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animate stats
    const targetStats = {
      users: 10000,
      trades: 500000,
      accuracy: 95,
      countries: 150
    };
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const animateStats = setInterval(() => {
      currentStep++;
      setStats({
        users: Math.floor((targetStats.users / steps) * currentStep),
        trades: Math.floor((targetStats.trades / steps) * currentStep),
        accuracy: Math.floor((targetStats.accuracy / steps) * currentStep),
        countries: Math.floor((targetStats.countries / steps) * currentStep)
      });

      if (currentStep >= steps) {
        clearInterval(animateStats);
      }
    }, interval);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animateStats);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Market Ticker at the top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee">
            <div className="inline-flex space-x-8 py-2">
              {/* First set of items with enhanced colors and animations */}
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">S&P 500 +1.2%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400 group hover:text-red-300 transition-colors">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">NASDAQ -0.8%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <DollarSign className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">USD/EUR 1.085</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <Activity className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">Oil +2.1%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">NIFTY 50 +0.8%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">SENSEX +0.7%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400 group hover:text-red-300 transition-colors">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">TCS -1.2%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">RELIANCE +1.5%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">HDFCBANK +0.9%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400 group hover:text-red-300 transition-colors">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">INFY -0.5%</span>
              </div>
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="inline-flex space-x-8 py-2">
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">S&P 500 +1.2%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400 group hover:text-red-300 transition-colors">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">NASDAQ -0.8%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <DollarSign className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">USD/EUR 1.085</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <Activity className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">Oil +2.1%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">NIFTY 50 +0.8%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">SENSEX +0.7%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400 group hover:text-red-300 transition-colors">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">TCS -1.2%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">RELIANCE +1.5%</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400 group hover:text-green-300 transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">HDFCBANK +0.9%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400 group hover:text-red-300 transition-colors">
                <ArrowDownRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="group-hover:font-semibold">INFY -0.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mouse Trail Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.2), transparent 80%)`
        }}
      />

      {/* Enhanced Background with Multiple Gradient Layers */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/strategic-chess-game-unfolding-dimly-lit-space-modern-backdrop-stock-market-trends-intense-takes-place-polished-360083315.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.1)_0%,transparent_100%)] animate-pulse"></div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative z-10 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center">
          <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse group-hover:bg-blue-500/30 transition-colors"></div>
                <Globe className="h-24 w-24 text-blue-400 animate-spin-slow relative z-10 group-hover:scale-110 transition-transform" />
              </div>
          </div>
            <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
              Unveiling Markets Through{' '}
              <span className="bg-gradient-to-r from-green-600 via-red-600 to-green-600 text-transparent bg-clip-text animate-gradient-x bg-[length:200%_auto]">
                AI & Geopolitics
              </span>
          </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence and geopolitical insights to make informed investment decisions.
          </p>
            <div className="flex justify-center gap-6">
            <Link
              to="/login"
                className="px-12 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 min-w-[200px] text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-12 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm min-w-[200px] text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

        {/* Enhanced Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center group hover:bg-white/15 transition-colors">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1 animate-count">{stats.users.toLocaleString()}+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center group hover:bg-white/15 transition-colors">
              <BarChart2 className="h-8 w-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1 animate-count">{stats.trades.toLocaleString()}+</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Trades Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center group hover:bg-white/15 transition-colors">
              <Target className="h-8 w-8 text-pink-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1 animate-count">{stats.accuracy}%</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Accuracy Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center group hover:bg-white/15 transition-colors">
              <Globe className="h-8 w-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-white mb-1 animate-count">{stats.countries}</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Countries Covered</div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8 animate-fade-in">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-blue-400/50 hover:shadow-blue-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <TrendingUp className="h-12 w-12 text-blue-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
              Real-Time Analytics
            </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Track global markets and economic indicators with advanced visualization tools.
            </p>
          </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-purple-400/50 hover:shadow-purple-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Brain className="h-12 w-12 text-purple-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
              AI-Powered Insights
            </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Leverage machine learning models for predictive market analysis and sentiment tracking.
            </p>
          </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-pink-400/50 hover:shadow-pink-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-pink-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Shield className="h-12 w-12 text-pink-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-pink-400 transition-colors">
              Risk Management
            </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
              Identify and analyze potential risks with our comprehensive assessment tools.
            </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-green-400/50 hover:shadow-green-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-green-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Globe className="h-12 w-12 text-green-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                Geopolitical Intelligence
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                Monitor global events, political developments, and their impact on markets in real-time.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-yellow-400/50 hover:shadow-yellow-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-yellow-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <BarChart2 className="h-12 w-12 text-yellow-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                Technical Analysis
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                Access advanced charting tools and technical indicators for precise market analysis.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-indigo-400/50 hover:shadow-indigo-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Newspaper className="h-12 w-12 text-indigo-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                News Sentiment Analysis
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                Analyze market sentiment from news sources and social media in real-time.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-red-400/50 hover:shadow-red-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Target className="h-12 w-12 text-red-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                Portfolio Optimization
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                Get AI-driven portfolio recommendations based on your risk tolerance and goals.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-cyan-400/50 hover:shadow-cyan-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-cyan-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Activity className="h-12 w-12 text-cyan-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                Market Alerts
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                Set custom alerts for price movements, news events, and market conditions.
              </p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-orange-400/50 hover:shadow-orange-500/20">
              <div className="relative">
                <div className="absolute -inset-1 bg-orange-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Award className="h-12 w-12 text-orange-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                Performance Analytics
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                Track and analyze your investment performance with detailed metrics and reports.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8 animate-fade-in">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group hover:bg-white/15 transition-colors">
              <Quote className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-gray-200 mb-4 group-hover:text-white transition-colors">
                "The AI-powered insights have completely transformed my investment strategy. The geopolitical analysis is invaluable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">JD</div>
                <div className="ml-3">
                  <div className="text-white font-semibold">John Doe</div>
                  <div className="text-gray-400 text-sm">Investment Manager</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group hover:bg-white/15 transition-colors">
              <Quote className="h-8 w-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-gray-200 mb-4 group-hover:text-white transition-colors">
                "The real-time analytics and risk management tools have helped me make more informed decisions."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">AS</div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Alice Smith</div>
                  <div className="text-gray-400 text-sm">Portfolio Manager</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 group hover:bg-white/15 transition-colors">
              <Quote className="h-8 w-8 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-gray-200 mb-4 group-hover:text-white transition-colors">
                "The platform's ability to analyze geopolitical events and their market impact is truly impressive."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400 font-bold">RJ</div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Robert Johnson</div>
                  <div className="text-gray-400 text-sm">Hedge Fund Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4 group">
                <div className="flex items-center space-x-2">
                  <Globe className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">GeoStock AI</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Empowering investors with AI-driven insights and geopolitical intelligence for smarter market decisions.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/documentation" className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/api" className="text-gray-400 hover:text-white transition-colors">
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">
                    <span className="block">Email:</span>
                    <a href="mailto:contact@geostockai.com" className="hover:text-white transition-colors">
                      shreyansh@geostockai.com
                    </a>
                  </li>
                  <li className="text-gray-400">
                    <span className="block">Phone:</span>
                    <a href="tel:+1234567890" className="hover:text-white transition-colors">
                      +91 8302572700
                    </a>
                  </li>
                  <li className="text-gray-400">
                    <span className="block">Address:</span>
                    <span>Exchange Plaza, C-1</span>
                    <span>New Delhi, Delhi 110001</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col space-y-6">
                {/* Disclaimers */}
                <div className="text-gray-400 text-sm space-y-2">
                  <p className="font-semibold text-gray-300">Important Disclaimers:</p>
                  <p>• GeoStock AI is not a registered investment advisor, broker, or dealer. All content and information provided is for informational purposes only.</p>
                  <p>• The information provided through our platform is not intended to be and should not be construed as financial advice, investment advice, trading advice, or any other type of advice.</p>
                  <p>• We do not guarantee the accuracy, completeness, or usefulness of any information on the platform. Any reliance you place on such information is strictly at your own risk.</p>
                  <p>• Past performance is not indicative of future results. Investing in securities involves risk, including the possible loss of principal.</p>
                  <p>• The geopolitical analysis and market predictions provided are based on historical data and current trends, but future market conditions may differ significantly.</p>
                  <p>• We are not responsible for any investment decisions made based on the information provided through our platform.</p>
                  <p>• The platform's AI models and algorithms are tools to assist in decision-making and should not be the sole basis for investment decisions.</p>
                  <p>• We do not endorse or recommend any specific securities, investments, or trading strategies.</p>
                </div>

                {/* Copyright and Legal Links */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} GeoStock AI. All rights reserved.
                  </p>
                  <div className="flex space-x-6">
                    <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Terms of Service
                    </Link>
                    <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;