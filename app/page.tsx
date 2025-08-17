"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  ArrowRight,
  Bot,
  Lightbulb,
  Target,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ConstructionBanner from "@/components/ui/construction-banner"


// Enhanced newsletter data for animation
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

export default function LandingPage() {
  const [newsletterChartPercentages, setNewsletterChartPercentages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const percentages: { [key: string]: number } = {};
    enhancedNewsletterItems.forEach((_, index) => {
      percentages[`item-${index}`] = Math.floor(Math.random() * 40 + 10);
    });
    setNewsletterChartPercentages(percentages);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-light">
      <ConstructionBanner />
      {/* Header */}
      <nav className="container mx-auto px-6 py-6 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="ml-3 text-xl tracking-tight">xyz.ai</span>
          </div>
          <div className="hidden md:flex space-x-10 text-sm text-gray-300">
            <a href="#ecosystem" className="hover:text-white transition-colors">AI Ecosystem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#get-started" className="hover:text-white transition-colors">Get Started</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="text-sm border border-gray-700 rounded-md px-4 py-2 hover:bg-white/5 transition-all">
                Sign in
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-white text-black font-light rounded-md px-4 py-2 hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

      {/* Hero Section with Animated Newsletter Background */}
      <section className="relative overflow-hidden bg-black w-full">
        {/* Newsletter Background Animation - 2x2 Grid */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full flex items-center justify-center" style={{ perspective: "800px" }}>
            <div className="w-full max-w-4xl h-full opacity-30">
              <div className="animate-scrolling-feed w-full h-full">
                {/* Content Block 1 - 2x2 Grid */}
                <div className="newsletter-content grid grid-cols-2 gap-4 py-4">
                  {enhancedNewsletterItems.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className={`newsletter-item bg-white/8 p-4 rounded-xl border border-white/20 ${
                        item.highlight ? "newsletter-highlight" : "newsletter-slide"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-sm text-white/95 mb-1 leading-tight">{item.title.slice(0, 50)}...</h3>
                        {item.highlight && <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-white/60 mb-3 text-xs leading-relaxed">{item.content.slice(0, 80)}...</p>
                      {item.hasChart && (
                        <div className="relative">
                          <svg
                            className={`w-full h-12 ${item.chartColor} drop-shadow-sm`}
                            fill="none"
                            viewBox="0 0 300 48"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 40 Q 30 15, 60 28 T 120 20 T 180 36 T 240 12 T 300 24"
                            />
                          </svg>
                          <div className="absolute top-0 right-0 bg-green-500/20 text-green-300 text-xs px-1.5 py-0.5 rounded">
                            +{newsletterChartPercentages[`item-${index}`]}%
                          </div>
                        </div>
                      )}
                      {!item.hasChart && (
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="w-2 h-2 bg-blue-400/60 rounded-full"></div>
                          <div className="w-3 h-2 bg-purple-400/40 rounded-full"></div>
                          <div className="w-2.5 h-2 bg-green-400/50 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Content Block 2 - Duplicate for seamless loop */}
                <div className="newsletter-content grid grid-cols-2 gap-4 py-4">
                  {enhancedNewsletterItems.slice(0, 4).map((item, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className={`newsletter-item bg-white/8 p-4 rounded-xl border border-white/20 ${
                        item.highlight ? "newsletter-highlight" : "newsletter-slide"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-sm text-white/95 mb-1 leading-tight">{item.title.slice(0, 50)}...</h3>
                        {item.highlight && <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-white/60 mb-3 text-xs leading-relaxed">{item.content.slice(0, 80)}...</p>
                      {item.hasChart && (
                        <div className="relative">
                          <svg
                            className={`w-full h-12 ${item.chartColor} drop-shadow-sm`}
                            fill="none"
                            viewBox="0 0 300 48"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 40 Q 30 15, 60 28 T 120 20 T 180 36 T 240 12 T 300 24"
                            />
                          </svg>
                          <div className="absolute top-0 right-0 bg-green-500/20 text-green-300 text-xs px-1.5 py-0.5 rounded">
                            +{newsletterChartPercentages[`item-${index}`]}%
                          </div>
                        </div>
                      )}
                      {!item.hasChart && (
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="w-2 h-2 bg-blue-400/60 rounded-full"></div>
                          <div className="w-3 h-2 bg-purple-400/40 rounded-full"></div>
                          <div className="w-2.5 h-2 bg-green-400/50 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 leading-tight opacity-0 animate-slide-delay-1">
            You're drowning in{" "}
            <span className="bg-gradient-to-br from-red-300 to-red-500 bg-clip-text text-transparent">data</span>
            <br />
            but starving for{" "}
            <span className="bg-gradient-to-br from-indigo-300 to-indigo-500 bg-clip-text text-transparent">
              wisdom
            </span>
          </h1>

          <p className="text-gray-300 text-xl mb-0 max-w-3xl mx-auto font-extralight opacity-0 animate-slide-delay-2">
            Every week, you stare at dashboards full of numbers. Revenue is up, users are down, churn is... what does it
            all mean? What should you actually DO about it?
          </p>
        </div>
      </section>

      {/* AI Ecosystem Section */}
      <section id="ecosystem" className="relative bg-gradient-to-b from-black via-gray-900/50 to-black py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
              Get your{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                personalized newsletter
              </span>
              <br />
              on your data powered by AI agents
            </h2>
            <p className="text-gray-400 font-extralight text-lg max-w-3xl mx-auto">
              Transform your business data into weekly strategic insights with AI agents that analyze, interpret, and deliver actionable recommendations
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Bot className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-light">Meet Your AI Financial Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">
            AI agents working{" "}
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/30 transition-colors">
                    <Lightbulb className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <h4 className="font-medium text-white mb-2">Smart Newsletter</h4>
                  <p className="text-gray-400 text-sm">Weekly insights delivered to your inbox</p>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-px bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                    <ArrowRight className="h-5 w-5 text-purple-400" />
                    <div className="text-xs text-purple-300 font-light">Powers</div>
                    <ArrowRight className="h-5 w-5 text-purple-400" />
                    <div className="w-8 h-px bg-gradient-to-r from-purple-400 to-blue-400"></div>
                  </div>
                </div>

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
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20 text-xs">
                      Ask follow-up questions
                    </Badge>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs">
                      Set up monitoring
                    </Badge>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs">
                      Get real-time alerts
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
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
          <Link href="/dashboard">
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
