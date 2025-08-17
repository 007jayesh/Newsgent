"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Brain, Plus, Mail, TrendingUp, TrendingDown, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"
import { ResponsiveContainer, Area, AreaChart } from "recharts"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

interface Newsletter {
  id: string;
  title: string;
  date: string;
  summary: string;
  status: string;
  trend: string;
  chartData: Array<{day: string, value: number}>;
  keyMetric: string;
  metricLabel: string;
  change: string;
  color: string;
  content: any;
  generated_at: string;
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalNewsletters, setTotalNewsletters] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setNewsletters(sampleNewsletters);
      setTotalNewsletters(sampleNewsletters.length);
      setIsLoading(false);
    }, 800);
  }, []);

  const sampleNewsletters: Newsletter[] = [
    {
      id: "sample-1",
      title: "Strong Growth Momentum",
      date: "January 15, 2025",
      summary: "Revenue up 23% week-over-week with significant improvements in user retention and engagement metrics.",
      status: "delivered",
      trend: "up",
      chartData: [
        { day: "Mon", value: 45 },
        { day: "Tue", value: 52 },
        { day: "Wed", value: 48 },
        { day: "Thu", value: 61 },
        { day: "Fri", value: 64 },
      ],
      keyMetric: "$64K",
      metricLabel: "Revenue",
      change: "+23%",
      color: "#10b981",
      content: {},
      generated_at: new Date().toISOString()
    },
    {
      id: "sample-2",
      title: "Mixed Performance Signals",
      date: "January 8, 2025",
      summary: "Revenue growth slowed to 8% but user acquisition exceeded targets with strong conversion rates.",
      status: "delivered",
      trend: "neutral",
      chartData: [
        { day: "Mon", value: 48 },
        { day: "Tue", value: 45 },
        { day: "Wed", value: 50 },
        { day: "Thu", value: 52 },
        { day: "Fri", value: 52 },
      ],
      keyMetric: "$52K",
      metricLabel: "Revenue",
      change: "+8%",
      color: "#f59e0b",
      content: {},
      generated_at: new Date().toISOString()
    },
    {
      id: "sample-3",
      title: "Q4 Performance Breakthrough",
      date: "December 30, 2024",
      summary: "Exceptional Q4 results with 34% revenue growth, record customer acquisition, and improved operational efficiency.",
      status: "delivered",
      trend: "up",
      chartData: [
        { day: "Mon", value: 58 },
        { day: "Tue", value: 62 },
        { day: "Wed", value: 59 },
        { day: "Thu", value: 67 },
        { day: "Fri", value: 71 },
      ],
      keyMetric: "$89K",
      metricLabel: "Revenue",
      change: "+34%",
      color: "#10b981",
      content: {},
      generated_at: new Date().toISOString()
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-black text-white min-h-full">
        <div className="mb-8">
          <h1 className="text-4xl font-light tracking-tighter text-white mb-2">Newsletter Generator</h1>
          <p className="text-gray-400 font-extralight">
            AI-powered business newsletters generated from your data
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-extralight">Total Newsletters</span>
              <Mail className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-light tracking-tight">{totalNewsletters}</div>
            <p className="text-xs text-gray-500">+{totalNewsletters} total generated</p>
          </div>

          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-extralight">Next Newsletter</span>
              <Calendar className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-light tracking-tight">Mon 9AM</div>
            <p className="text-xs text-gray-500">January 22, 2025</p>
          </div>

          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-extralight">Avg Generation Time</span>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-3xl font-light tracking-tight">2.3s</div>
            <p className="text-xs text-gray-500">-0.5s improvement</p>
          </div>
        </div>

        {/* Generate New Newsletter CTA */}
        <div className="mb-8 p-8 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-800/30 rounded-2xl text-center">
          <Brain className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-light mb-2">Generate New Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Connect your database and let AI create comprehensive business newsletters
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Generate Newsletter
          </Button>
        </div>

        {/* Newsletter List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light tracking-tight">Recent Newsletters</h2>
            <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/5">
              <Plus className="h-4 w-4 mr-2" />
              Generate New
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-6"></div>
                  <div className="h-24 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {newsletters.map((newsletter) => (
                <Link key={newsletter.id} href={`/newsletter/${newsletter.id}`}>
                  <div className="group relative bg-gradient-to-br from-gray-900/60 to-gray-900/40 border border-gray-800 rounded-3xl p-8 hover:from-gray-900/80 hover:to-gray-900/60 hover:border-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-light text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                            {newsletter.title}
                          </h3>
                          {newsletter.trend === "up" && (
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            </div>
                          )}
                          {newsletter.trend === "down" && (
                            <div className="p-1 bg-red-500/20 rounded-full">
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            </div>
                          )}
                          {newsletter.trend === "neutral" && (
                            <div className="p-1 bg-yellow-500/20 rounded-full">
                              <div className="h-4 w-4 bg-yellow-400 rounded-full" />
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-gray-400 font-extralight leading-relaxed mb-4">{newsletter.summary}</p>

                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6">
                          <span>{newsletter.date}</span>
                          <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
                            {newsletter.status}
                          </Badge>
                          <span className="text-xs text-purple-400">AI Generated</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-3xl font-light tracking-tight text-white mb-1">{newsletter.keyMetric}</div>
                        <div className="text-sm text-gray-400 font-extralight mb-1">{newsletter.metricLabel}</div>
                        <div
                          className={`text-sm font-light ${
                            newsletter.trend === "up"
                              ? "text-green-400"
                              : newsletter.trend === "down"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }`}
                        >
                          {newsletter.change} vs last week
                        </div>
                      </div>
                    </div>

                    <div className="h-24 w-full mb-4 bg-black/20 rounded-xl p-3 border border-gray-800/50">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={newsletter.chartData}>
                          <defs>
                            <linearGradient id={`gradient-${newsletter.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={newsletter.color} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={newsletter.color} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={newsletter.color}
                            strokeWidth={2}
                            fill={`url(#gradient-${newsletter.id})`}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-indigo-400 font-extralight">Click to read full analysis</div>
                        <div className="text-indigo-400">→</div>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}