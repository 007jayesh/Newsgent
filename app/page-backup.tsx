"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  ArrowRight,
  BarChart3,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowDown,
  MessageSquare,
  Bot,
  Activity,
  LineChart as LineChartIcon,
  Globe,
  Clock,
  Target,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";

// Mock data for the transformation demo
const messyData = [
  { name: "Revenue", value: 64000, change: 23, status: "up" },
  { name: "Users", value: 8934, change: 12, status: "up" },
  { name: "Churn", value: 3.2, change: -1.1, status: "down" },
  { name: "CAC", value: 89, change: -15, status: "down" },
]

const chartData = [
  { week: "W1", value: 45 },
  { week: "W2", value: 52 },
  { week: "W3", value: 48 },
  { week: "W4", value: 64 },
  { week: "W5", value: 71 },
  { week: "W6", value: 68 },
]

// Enhanced newsletter data for more realistic demo
const enhancedNewsletterItems = [
  {
    title: "Q4 Revenue Surge: 34% Growth Exceeds All Targets",
    content: "Manufacturing efficiency reached record highs with new automation systems reducing downtime by 28%. Production Line 3 exceeded capacity targets by 15%, while quality metrics improved across all divisions...",
    hasChart: true,
    chartColor: "text-green-400",
    highlight: true,
    metric: "+34%",
    category: "Revenue Growth"
  },
  {
    title: "Supply Chain Optimization Cuts Costs 15% MoM",
    content: "Strategic vendor negotiations and optimized logistics routes delivered significant cost savings. Raw material procurement improved with new supplier partnerships in Southeast Asia...",
    hasChart: false,
    chartColor: "",
    highlight: false,
    metric: "-15%",
    category: "Cost Reduction"
  },
  {
    title: "Enterprise Sales: $2.3M in New Contracts Closed",
    content: "Q4 pipeline conversion hit 67%, driven by enterprise accounts in automotive and aerospace sectors. Average deal size increased 22% with improved sales methodology...",
    hasChart: true,
    chartColor: "text-blue-400",
    highlight: true,
    metric: "$2.3M",
    category: "Sales Performance"
  },
  {
    title: "Quality Control: Defect Rate Hits Historic Low",
    content: "Six Sigma initiatives reduced defect rates to 0.02%, saving $180K in rework costs. Customer satisfaction scores improved to 94.2%, the highest in company history...",
    hasChart: false,
    chartColor: "",
    highlight: false,
    metric: "0.02%",
    category: "Quality Metrics"
  },
  {
    title: "Inventory Turnover Accelerates 40% with AI",
    content: "Just-in-time manufacturing and demand forecasting AI reduced carrying costs by $340K. Warehouse efficiency improved 25% with automated picking systems...",
    hasChart: true,
    chartColor: "text-purple-400",
    highlight: true,
    metric: "+40%",
    category: "Operations"
  },
  {
    title: "International Expansion: European Revenue +89%",
    content: "European expansion strategy delivering results with new distribution partnerships in Germany, France, and Netherlands. Market penetration exceeds projections...",
    hasChart: true,
    chartColor: "text-yellow-400",
    highlight: false,
    metric: "+89%",
    category: "Global Growth"
  }
]

// Manufacturing & Sales newsletter animation data
const newsletterItems = [
  {
    title: "Production Output Surges 34% This Quarter",
    content:
      "Manufacturing efficiency reached all-time highs with new automation systems reducing downtime by 28%. Line 3 exceeded capacity targets...",
    hasChart: true,
    chartColor: "text-green-400",
    highlight: true,
  },
  {
    title: "Supply Chain Costs Drop 15% Month-over-Month",
    content:
      "Strategic vendor negotiations and optimized logistics routes delivered significant cost savings. Raw material procurement improved...",
    hasChart: false,
    chartColor: "",
    highlight: false,
  },
  {
    title: "Sales Team Closes $2.3M in New Contracts",
    content:
      "Q4 pipeline conversion hit 67%, driven by enterprise accounts in automotive sector. Average deal size increased 22%...",
    hasChart: true,
    chartColor: "text-blue-400",
    highlight: true,
  },
  {
    title: "Quality Control: Defect Rate Hits Record Low",
    content:
      "Six Sigma initiatives reduced defect rates to 0.02%, saving $180K in rework costs. Customer satisfaction scores improved to 94%...",
    hasChart: false,
    chartColor: "",
    highlight: false,
  },
  {
    title: "Inventory Turnover Accelerates 40%",
    content:
      "Just-in-time manufacturing and demand forecasting AI reduced carrying costs by $340K. Warehouse efficiency up 25%...",
    hasChart: true,
    chartColor: "text-purple-400",
    highlight: true,
  },
  {
    title: "Export Sales Boom: International Revenue +89%",
    content:
      "European expansion strategy paying dividends with new distribution partnerships. German market showing exceptional growth...",
    hasChart: true,
    chartColor: "text-yellow-400",
    highlight: false,
  },
]

export default function LandingPage() {
  const [showTransformation, setShowTransformation] = useState(false);
  const [newsletterChartPercentages, setNewsletterChartPercentages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setTimeout(() => setShowTransformation(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const percentages: { [key: string]: number } = {};
    newsletterItems.forEach((_, index) => {
      percentages[`item-${index}`] = Math.floor(Math.random() * 40 + 10);
    });
    setNewsletterChartPercentages(percentages);
  }, []);

  useEffect(() => {
    // Inject styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes infinite-scroll {
        from { transform: translateY(0); }
        to { transform: translateY(-50%); }
      }
      
      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
          border-color: rgba(99, 102, 241, 0.4);
        }
        50% {
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.5);
          border-color: rgba(99, 102, 241, 0.6);
        }
      }
      
      @keyframes slide-highlight {
        0%, 100% {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
        }
        50% {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
        }
      }
      
      .animate-scrolling-feed {
        animation: infinite-scroll 20s linear infinite;
      }
      
      .newsletter-highlight {
        animation: pulse-glow 3s ease-in-out infinite;
      }
      
      .newsletter-slide {
        animation: slide-highlight 4s ease-in-out infinite;
      }
      
      .newsletter-item {
        transition: all 0.3s ease;
      }
      
      .newsletter-item:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }
      
      @keyframes expandWidth {
        from { width: 15rem; opacity: 0.5; }
        to { width: 30rem; opacity: 1; }
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes expandSmallWidth {
        from { width: 8rem; }
        to { width: 16rem; }
      }
      
      .animate-width {
        animation: expandWidth 0.5s ease-in-out 0.1s forwards;
      }
      
      .animate-slide {
        animation: slideIn 0.5s ease-in-out forwards;
      }
      
      .animate-slide-delay-1 {
        animation: slideIn 0.5s ease-in-out 0.1s forwards;
      }
      
      .animate-slide-delay-2 {
        animation: slideIn 0.5s ease-in-out 0.2s forwards;
      }
      
      .animate-small-width {
        animation: expandSmallWidth 0.5s ease-in-out 0.1s forwards;
      }
      
      .conic-left {
        background-image: conic-gradient(from 70deg at center top, rgb(99, 102, 241), transparent, transparent);
      }
      
      .conic-right {
        background-image: conic-gradient(from 290deg at center top, transparent, transparent, rgb(99, 102, 241));
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-light">
      <nav className="container mx-auto px-6 py-6 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="ml-3 text-xl tracking-tight">xyz.ai</span>
          </div>
          <div className="hidden md:flex space-x-10 text-sm text-gray-300">
            <a href="#transformation" className="hover:text-white transition-colors">
              See The Difference
            </a>
            <a href="#ai-features" className="hover:text-white transition-colors">
              AI Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#get-started" className="hover:text-white transition-colors">
              Get Started
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <button className="text-sm border border-gray-700 rounded-md px-4 py-2 hover:bg-white/5 transition-all">
                Sign in
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-white text-black font-light rounded-md px-4 py-2 hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

      {/* Hero Section with Tubelight Effect and Newsletter Background */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full z-0">
        {/* Newsletter Background Animation */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full flex items-center justify-center" style={{ perspective: "800px" }}>
            <div className="w-full max-w-5xl h-full opacity-35">
              <div className="animate-scrolling-feed w-full h-full">
                {/* Content Block 1 */}
                <div className="newsletter-content grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                  {enhancedNewsletterItems.map((item, index) => (
                    <div
                      key={index}
                      className={`newsletter-item bg-white/8 p-6 rounded-2xl border border-white/20 ${
                        item.highlight ? "newsletter-highlight" : "newsletter-slide"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-white/95 mb-2 leading-tight">{item.title}</h3>
                        {item.highlight && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-white/60 mb-4 text-sm leading-relaxed">{item.content}</p>
                      {item.hasChart && (
                        <div className="relative">
                          <svg
                            className={`w-full h-16 ${item.chartColor} drop-shadow-sm`}
                            fill="none"
                            viewBox="0 0 300 60"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 50 Q 30 20, 60 35 T 120 25 T 180 45 T 240 15 T 300 30"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 45 Q 30 25, 60 40 T 120 30 T 180 50 T 240 20 T 300 35"
                              strokeWidth="1.5"
                              opacity="0.6"
                            />
                          </svg>
                          <div className="absolute top-0 right-0 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">
                            +{newsletterChartPercentages[`item-${index}`]}%
                          </div>
                        </div>
                      )}
                      {!item.hasChart && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-3 h-3 bg-blue-400/60 rounded-full"></div>
                          <div className="w-5 h-3 bg-purple-400/40 rounded-full"></div>
                          <div className="w-4 h-3 bg-green-400/50 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Content Block 2 (Duplicate for seamless loop) */}
                <div className="newsletter-content grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                  {enhancedNewsletterItems.map((item, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className={`newsletter-item bg-white/8 p-6 rounded-2xl border border-white/20 ${
                        item.highlight ? "newsletter-highlight" : "newsletter-slide"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-white/95 mb-2 leading-tight">{item.title}</h3>
                        {item.highlight && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-white/60 mb-4 text-sm leading-relaxed">{item.content}</p>
                      {item.hasChart && (
                        <div className="relative">
                          <svg
                            className={`w-full h-16 ${item.chartColor} drop-shadow-sm`}
                            fill="none"
                            viewBox="0 0 300 60"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 50 Q 30 20, 60 35 T 120 25 T 180 45 T 240 15 T 300 30"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 45 Q 30 25, 60 40 T 120 30 T 180 50 T 240 20 T 300 35"
                              strokeWidth="1.5"
                              opacity="0.6"
                            />
                          </svg>
                          <div className="absolute top-0 right-0 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">
                            +{newsletterChartPercentages[`duplicate-${index}`]}%
                          </div>
                        </div>
                      )}
                      {!item.hasChart && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-3 h-3 bg-blue-400/60 rounded-full"></div>
                          <div className="w-5 h-3 bg-purple-400/40 rounded-full"></div>
                          <div className="w-4 h-3 bg-green-400/50 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black via-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

          {/* Side gradients for better text contrast */}
          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-black/60 to-transparent"></div>
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-black/60 to-transparent"></div>
        </div>

        {/* Lighting Effect Container */}
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-10">
          {/* Shadow and glow effects */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-5 backdrop-blur-sm"></div>
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-indigo-600 opacity-20 blur-2xl"></div>

          {/* Center glow */}
          <div className="absolute inset-auto z-30 h-36 w-[8rem] -translate-y-[6rem] rounded-full bg-indigo-500 opacity-60 blur-xl animate-small-width"></div>

          {/* Lamp line */}
          <div className="absolute inset-auto z-50 h-0.5 w-[15rem] -translate-y-[7rem] bg-indigo-400 animate-width"></div>

          {/* Top cover */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-50 flex -translate-y-[calc(80px+50px)] flex-col items-center px-5 max-w-6xl mx-auto w-full">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6 opacity-0 animate-slide">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-red-300 text-sm font-light">The Founder's Dilemma</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 leading-tight text-center opacity-0 animate-slide-delay-1">
            You're drowning in{" "}
            <span className="bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent">data</span>
            <br />
            but starving for{" "}
            <span className="bg-gradient-to-br from-indigo-300 to-indigo-500 bg-clip-text text-transparent">
              wisdom
            </span>
          </h1>

          <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto font-extralight text-center opacity-0 animate-slide-delay-2">
            Every week, you stare at dashboards full of numbers. Revenue is up, users are down, churn is... what does it
            all mean? What should you actually DO about it?
          </p>
        </div>
      </section>

      {/* AI Ecosystem Bridge Section */}
      <section className="relative bg-gradient-to-b from-black via-gray-900/50 to-black py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
              Beyond newsletters – your complete{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI financial ecosystem
              </span>
            </h2>
            <p className="text-gray-400 font-extralight text-lg max-w-3xl mx-auto">
              From raw data chaos to strategic clarity – powered by AI agents that work 24/7 to decode your business
            </p>
          </div>

          {/* AI Ecosystem Flow */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Data Sources */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-light text-red-300 mb-2">Raw Data Chaos</h3>
                    <p className="text-gray-400 text-sm">Scattered metrics, overwhelming dashboards</p>
                  </div>
                  <div className="space-y-2">
                    {messyData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-black/40 rounded p-2">
                        <span className="text-xs text-gray-400">{item.name}</span>
                        <span className="text-xs text-gray-300">{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Processing */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 border border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-light text-indigo-300 mb-2">AI Analysis Engine</h3>
                    <p className="text-gray-400 text-sm">Intelligent pattern recognition & insights</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Financial data analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Market sentiment tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Predictive modeling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Strategic recommendations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic Output */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-light text-green-300 mb-2">Strategic Clarity</h3>
                    <p className="text-gray-400 text-sm">Actionable insights & clear direction</p>
                  </div>
                  <div className="bg-white/95 rounded-lg p-3">
                    <div className="text-gray-900 text-xs mb-2 font-medium">This Week's Priority</div>
                    <div className="text-gray-700 text-xs mb-2">Focus on premium feature adoption - current 23% growth suggests 40% potential</div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 text-xs font-medium">Action Required</span>
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="absolute top-1/2 left-1/3 w-8 h-px bg-gradient-to-r from-red-400 to-indigo-400 hidden lg:block"></div>
              <div className="absolute top-1/2 right-1/3 w-8 h-px bg-gradient-to-r from-indigo-400 to-green-400 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Transformation Comparison */}
      <section id="transformation" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
            From <span className="text-red-400">Overwhelming Dashboards</span> to{" "}
            <span className="text-indigo-400">Clear Action Plans</span>
          </h2>
          <p className="text-gray-400 font-extralight">See the transformation that happens every Monday morning</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid xl:grid-cols-5 gap-8 items-start">
            {/* BEFORE - Current Dashboard */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-300">Your Current Dashboard</h3>
                <Badge variant="secondary" className="bg-red-500/10 text-red-300 border-red-500/20 text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Overwhelming
                </Badge>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4">
                {/* Messy Dashboard Simulation */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {messyData.map((item, index) => (
                    <div key={index} className="bg-black/40 border border-gray-700 rounded p-3">
                      <div className="text-xs text-gray-500 mb-1">{item.name}</div>
                      <div className="text-sm font-light">
                        {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                      </div>
                      <div className={`text-xs ${item.status === "up" ? "text-green-400" : "text-red-400"}`}>
                        {item.change > 0 ? "+" : ""}
                        {item.change}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-24 bg-black/40 border border-gray-700 rounded mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line type="monotone" dataKey="value" stroke="#6b7280" strokeWidth={1} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span>Revenue up 23% - but why?</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <span>Users growing - is this sustainable?</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    <span>What should I focus on this week?</span>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-center">
                  <p className="text-red-300 text-xs font-extralight">
                    ⏰ You spend 2+ hours every Monday trying to make sense of this
                  </p>
                </div>
              </div>
            </div>

            {/* Transformation Arrow */}
            <div className="xl:col-span-1 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <ArrowRight className="h-6 w-6 text-indigo-400 hidden xl:block" />
                  <ArrowDown className="h-6 w-6 text-indigo-400 xl:hidden" />
                </div>
                <div className="text-center">
                  <div className="text-indigo-400 font-light text-sm">xyz.ai transforms this into</div>
                  <div className="text-xs text-gray-500">Every Monday at 9 AM</div>
                </div>
              </div>
            </div>

            {/* AFTER - Newsletter */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-300">Your Monday Morning Newsletter</h3>
                <Badge variant="secondary" className="bg-green-500/10 text-green-300 border-green-500/20 text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Actionable
                </Badge>
              </div>

              <div className="bg-white text-gray-900 rounded-lg p-4 shadow-2xl">
                {/* Email Header */}
                <div className="border-b border-gray-200 pb-3 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        Week of July 8-14: Strong Growth Momentum
                      </h3>
                      <p className="text-gray-600 text-xs">Your AI Business Analyst • 5 min read</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      <TrendingUp className="h-2 w-2 mr-1" />
                      Positive
                    </Badge>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="mb-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                    <p className="text-gray-800 font-light text-sm">
                      <strong>Bottom Line:</strong> This week delivered exceptional results with 23% revenue growth
                      reaching $64K. User retention hit 78%, and your new AI feature drove 31% more engagement.
                    </p>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-900 text-sm">What Happened & Why</h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                      <p className="text-gray-700 font-light text-xs">
                        <strong>Revenue Acceleration:</strong> Premium feature adoption hit 40%
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                      <p className="text-gray-700 font-light text-xs">
                        <strong>User Engagement:</strong> Session time grew from 12 to 18 minutes
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                      <p className="text-gray-700 font-light text-xs">
                        <strong>Operational Win:</strong> Server response times improved 35%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-900 text-sm">Revenue Trend</h4>
                  <div className="h-16 bg-gray-50 rounded border">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          fill="url(#colorRevenue)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm">What To Do Next (This Week)</h4>
                  <ul className="text-green-700 space-y-1 text-xs">
                    <li>• Scale marketing spend by 30% to capitalize on improved conversion</li>
                    <li>• Prepare infrastructure for 40% user growth trajectory</li>
                    <li>• Fast-track enterprise pricing tier development</li>
                  </ul>
                </div>

                <div className="mt-3 p-2 bg-indigo-50 border border-indigo-200 rounded text-center">
                  <p className="text-indigo-700 text-xs font-light">⚡ Read in 5 minutes, act with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversational Interface Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-light">Then Dive Deeper</span>
            </div>
            <h3 className="text-2xl font-light tracking-tighter mb-4">
              Start a conversation with your <span className="text-purple-400">newsletter</span>
            </h3>
            <p className="text-gray-400 font-extralight">
              Ask follow-up questions and get instant AI-powered analysis of your data
            </p>
          </div>

          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-8">
            {/* Chat Interface Mockup */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h4 className="font-semibold text-gray-900">Continue the conversation about this week's performance</h4>
                <p className="text-gray-600 text-sm">
                  Ask anything about your data - I have full context from your newsletter
                </p>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-3">
                <p className="text-gray-700 text-sm font-medium mb-4">Try asking:</p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors">
                    What drove this growth?
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors">
                    Show me the user segments
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors">
                    Compare to last quarter
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition-colors">
                    What should I prioritize?
                  </button>
                </div>

                {/* Chat Input */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Or ask your own question..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                      Ask
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 font-extralight text-sm mb-4">
                Get instant, context-aware responses about your business data
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
                  Natural language queries
                </Badge>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                  Instant responses
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-300 border-green-500/20">
                  Context-aware AI
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Features Section */}
      <section id="ai-features" className="relative container mx-auto px-6 py-20">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-gray-900/50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Bot className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-light">Meet Your AI Financial Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">
              Three AI agents working{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                24/7 for your business
              </span>
            </h2>
            <p className="text-gray-400 font-extralight max-w-3xl mx-auto text-lg">
              Each newsletter is powered by specialized AI agents that continuously analyze your data, markets, and industry trends
          </p>
        </div>

        {/* Newsletter-to-AI Connection Bridge */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 border border-gray-700 rounded-2xl p-8 overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                {/* Newsletter */}
                <div className="text-center group">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/30 transition-colors">
                    <Lightbulb className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <h4 className="font-medium text-white mb-2">Smart Newsletter</h4>
                  <p className="text-gray-400 text-sm">Weekly insights delivered to your inbox</p>
                </div>

                {/* Flow Arrows */}
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-px bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                    <ArrowRight className="h-5 w-5 text-purple-400" />
                    <div className="text-xs text-purple-300 font-light">Powers</div>
                    <ArrowRight className="h-5 w-5 text-purple-400" />
                    <div className="w-8 h-px bg-gradient-to-r from-purple-400 to-blue-400"></div>
                  </div>
                </div>

                {/* AI Agents */}
                <div className="text-center group">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <Bot className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <h4 className="font-medium text-white mb-2">AI Agents</h4>
                  <p className="text-gray-400 text-sm">Deep-dive analysis & real-time monitoring</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-700/50">
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-2">
                    <strong className="text-white">How it works:</strong> Your newsletter provides the weekly overview, then our AI agents give you the power to explore deeper
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20 text-xs hover:bg-indigo-500/20 transition-colors">
                      Ask follow-up questions
                    </Badge>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs hover:bg-purple-500/20 transition-colors">
                      Set up monitoring
                    </Badge>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs hover:bg-blue-500/20 transition-colors">
                      Get real-time alerts
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* AI Analyst Feature */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
                {/* Chat Interface Mockup */}
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bot className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-300 font-medium">AI Financial Analyst</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Sample conversation */}
                  <div className="space-y-3">
                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
                      <p className="text-sm text-blue-100">"What's driving AAPL's momentum today?"</p>
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Bot className="h-4 w-4 text-blue-400 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <p className="mb-2">📊 <strong>AAPL Analysis:</strong> Currently $175.84 (+1.35%)</p>
                          <p className="text-xs text-gray-400">• Strong iPhone 15 sales momentum<br/>• RSI at 67.3 (approaching overbought)<br/>• Breaking through $175 resistance</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-1 text-xs text-gray-500">
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="aiAnalyst" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          fill="url(#aiAnalyst)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-sm">Conversational AI</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
                Ask anything about markets.<br />
                <span className="text-blue-400">Get instant AI insights.</span>
              </h3>
              <p className="text-gray-400 font-extralight mb-8 leading-relaxed">
                Chat with your personal AI financial analyst. Ask complex questions about stocks, markets, 
                trends, and get sophisticated analysis backed by real-time and historical data.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <div className="font-medium text-white">Real-time Market Data</div>
                    <div className="text-sm text-gray-400">Live prices, volumes, and breaking news integration</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <div className="font-medium text-white">5+ Years Historical Analysis</div>
                    <div className="text-sm text-gray-400">Deep historical patterns and trend analysis</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <div className="font-medium text-white">Smart Query Suggestions</div>
                    <div className="text-sm text-gray-400">Get ideas for your next analysis question</div>
                  </div>
                </div>
              </div>
              
              <Link href="/ai-analyst">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-light rounded-md px-6 py-3 transition-all transform hover:scale-105 inline-flex items-center">
                  Try AI Analyst
                  <Bot className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Financial Agent Feature */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 mb-4">
                <Activity className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Automated Intelligence</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
                24/7 automated analysis.<br />
                <span className="text-purple-400">Never miss an opportunity.</span>
              </h3>
              <p className="text-gray-400 font-extralight mb-8 leading-relaxed">
                Deploy AI agents that continuously monitor markets, analyze technical indicators, 
                track sentiment, and alert you to important developments.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <LineChartIcon className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <div className="font-medium text-white">Technical Analysis Automation</div>
                    <div className="text-sm text-gray-400">RSI, MACD, Bollinger Bands, and custom indicators</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <div className="font-medium text-white">Smart Alerts & Thresholds</div>
                    <div className="text-sm text-gray-400">Get notified when conditions match your criteria</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <div className="font-medium text-white">Multi-Asset Monitoring</div>
                    <div className="text-sm text-gray-400">Track stocks, indices, crypto, and commodities</div>
                  </div>
                </div>
              </div>
              
              <Link href="/financial-agent">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-light rounded-md px-6 py-3 transition-all transform hover:scale-105 inline-flex items-center">
                  Launch Agent
                  <Activity className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
            
            <div>
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
                {/* Agent Dashboard Mockup */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    <span className="text-purple-300 font-medium">Financial Agent</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">Running</span>
                  </div>
                </div>
                
                {/* Mock Agent Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">5</div>
                    <div className="text-xs text-gray-400">Symbols Tracked</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-xs text-gray-400">Active Tasks</div>
                  </div>
                </div>
                
                {/* Mock Analysis Results */}
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-300">AAPL Technical</span>
                      <span className="text-xs text-green-400">✓ Bullish</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">RSI: 67.3, MACD crossover detected</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-yellow-300">TSLA Sentiment</span>
                      <span className="text-xs text-yellow-400">⚠ Neutral</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Mixed signals from recent news</div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-300">Market Overview</span>
                      <span className="text-xs text-blue-400">📈 Positive</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">S&P 500 breaking resistance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-light">How xyz.ai Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">
            Three steps to <span className="text-indigo-400">strategic clarity</span>
          </h2>
        </div>

        {/* The Three Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-light mb-4">What Happened</h3>
              <p className="text-gray-400 font-extralight">
                AI analyzes your data and identifies the key events, trends, and changes that actually matter to your
                business.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-light mb-4">Why It Happened</h3>
              <p className="text-gray-400 font-extralight">
                Connect the dots between different metrics to understand the root causes and relationships driving your
                business performance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-light mb-4">What To Do Next</h3>
              <p className="text-gray-400 font-extralight">
                Get specific, prioritized recommendations tailored to your business stage and current performance
                context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light tracking-tighter mb-4">Built for Founders Who Value Their Time</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-light mb-2">5 min</div>
            <div className="text-gray-400 font-extralight">Average read time</div>
            <div className="text-sm text-gray-500 mt-2">vs 2+ hours analyzing dashboards</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light mb-2">Monday 9AM</div>
            <div className="text-gray-400 font-extralight">Delivered weekly</div>
            <div className="text-sm text-gray-500 mt-2">Start your week informed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light mb-2">3 Actions</div>
            <div className="text-gray-400 font-extralight">Clear next steps</div>
            <div className="text-sm text-gray-500 mt-2">No guesswork, just execution</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-light tracking-tighter mb-4">
            Ready to turn your data into <span className="text-indigo-400">strategic wisdom</span>?
          </h2>
          <p className="text-gray-400 font-extralight mb-8 max-w-2xl mx-auto">
            Connect your database in 2 minutes. Get your first AI-powered business newsletter this Monday.
          </p>
          <Link href="/signup">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-light rounded-md px-8 py-4 transition-all transform hover:scale-105">
              Get Your First Newsletter
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 mt-24">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-light tracking-tight">xyz.ai</span>
          </div>
          <p className="text-gray-400 font-extralight">© 2025 xyz.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
