"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Brain, ArrowLeft, MessageSquare, Send, TrendingUp, Users, DollarSign, FileText, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import DOMPurify from 'isomorphic-dompurify'
import ConstructionBanner from "@/components/ui/construction-banner"

interface Newsletter {
  id: string;
  // Legacy format support
  title?: string;
  date?: string;
  summary?: string;
  status?: string;
  trend?: string;
  chartData?: Array<{day: string, value: number}>;
  keyMetric?: string;
  metricLabel?: string;
  change?: string;
  color?: string;
  content?: {
    full_analysis?: string;
    analysis_data?: any;
    sections?: any;
  };
  generated_at?: string;
  
  // New structured format
  metadata?: {
    title: string;
    date: string;
    summary: string;
    status: string;
    trend: "up" | "down" | "neutral";
    keyMetric: string;
    metricLabel: string;
    change: string;
    color: string;
    generated_at: string;
  };
  sections?: {
    [key: string]: {
      title: string;
      html_content: string;
      data?: any;
    };
  };
}

export default function NewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [newsletterId, setNewsletterId] = useState<string>("");
  const [renderError, setRenderError] = useState<string | null>(null);

  // Resolve params and fetch newsletter data
  useEffect(() => {
    const resolveParamsAndFetch = async () => {
      const resolvedParams = await params;
      setNewsletterId(resolvedParams.id);
      fetchNewsletter(resolvedParams.id);
    };
    
    resolveParamsAndFetch();
  }, [params]);

  const fetchNewsletter = async (id: string) => {
    try {
      // Simulate loading for demo experience
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Always use sample data for demo
      setNewsletter(getSampleNewsletter(id));
    } catch (error) {
      console.error('Failed to fetch newsletter:', error);
      setNewsletter(getSampleNewsletter(id));
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get newsletter metadata (supports both old and new format)
  const getMetadata = (newsletter: Newsletter) => {
    if (newsletter.metadata) {
      return newsletter.metadata;
    }
    // Fallback to legacy format
    return {
      title: newsletter.title || "Newsletter",
      date: newsletter.date || new Date().toLocaleDateString(),
      summary: newsletter.summary || "AI-generated business newsletter",
      status: newsletter.status || "delivered",
      trend: newsletter.trend as "up" | "down" | "neutral" || "neutral",
      keyMetric: newsletter.keyMetric || "$0",
      metricLabel: newsletter.metricLabel || "Revenue",
      change: newsletter.change || "0%",
      color: newsletter.color || "#10b981",
      generated_at: newsletter.generated_at || new Date().toISOString()
    };
  };

  // Helper function to get chart data
  const getChartData = (newsletter: Newsletter) => {
    return newsletter.chartData || [
      { day: "Mon", value: 45 },
      { day: "Tue", value: 52 },
      { day: "Wed", value: 48 },
      { day: "Thu", value: 61 },
      { day: "Fri", value: 64 },
    ];
  };

  // Sanitize and render HTML content
  const renderHTMLContent = (htmlContent: string) => {
    try {
      const sanitizedHTML = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: [
          'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'u',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'blockquote', 'code', 'pre', 'br', 'hr',
          'a', 'img'
        ],
        ALLOWED_ATTR: [
          'class', 'style', 'href', 'src', 'alt', 'title',
          'colspan', 'rowspan'
        ]
      });

      return (
        <div 
          className="newsletter-html-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      );
    } catch (error) {
      console.error('Error rendering HTML content:', error);
      setRenderError('Failed to render content safely');
      return (
        <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
          <p className="text-red-400">Error rendering content. Falling back to text format.</p>
          <pre className="text-gray-300 mt-2 whitespace-pre-wrap">{htmlContent}</pre>
        </div>
      );
    }
  };

  const getSampleNewsletter = (id: string): Newsletter => {
    return {
      id: id,
      metadata: {
        title: "Week of July 8-14: Strong Growth Momentum",
        date: "July 15, 2025",
        summary: "Revenue up 23% week-over-week with significant improvements in user retention and engagement metrics.",
        status: "delivered",
        trend: "up",
        keyMetric: "$64K",
        metricLabel: "Revenue",
        change: "+23%",
        color: "#10b981",
        generated_at: new Date().toISOString()
      },
      chartData: [
        { day: "Mon", value: 45 },
        { day: "Tue", value: 52 },
        { day: "Wed", value: 48 },
        { day: "Thu", value: 61 },
        { day: "Fri", value: 64 },
      ],
      sections: {
        executive_summary: {
          title: "Executive Summary",
          html_content: `
            <div class="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
              <h3 class="text-xl font-semibold text-blue-300 mb-3">Key Highlights</h3>
              <ul class="space-y-2 text-gray-300">
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">✓</span>
                  <strong>Revenue Growth:</strong> Achieved $64,000 in weekly revenue, representing a <strong class="text-green-400">23% increase</strong> from previous week
                </li>
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">✓</span>
                  <strong>User Retention:</strong> Improved to <strong class="text-blue-400">78%</strong>, our highest retention rate to date
                </li>
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">✓</span>
                  <strong>Product Engagement:</strong> New AI dashboard feature drove <strong class="text-purple-400">31% increase</strong> in daily active users
                </li>
              </ul>
            </div>
          `
        },
        key_metrics: {
          title: "Key Performance Indicators",
          html_content: `
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-green-400 mb-3">Revenue Performance</h4>
                <table class="w-full text-sm">
                  <tbody class="space-y-2">
                    <tr class="border-b border-gray-700">
                      <td class="py-2 text-gray-400">This Week</td>
                      <td class="py-2 text-right font-semibold text-white">$64,000</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                      <td class="py-2 text-gray-400">Last Week</td>
                      <td class="py-2 text-right text-gray-300">$52,000</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                      <td class="py-2 text-gray-400">Growth Rate</td>
                      <td class="py-2 text-right font-semibold text-green-400">+23%</td>
                    </tr>
                    <tr>
                      <td class="py-2 text-gray-400">Monthly Target</td>
                      <td class="py-2 text-right text-gray-300">$240K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-blue-400 mb-3">User Metrics</h4>
                <table class="w-full text-sm">
                  <tbody class="space-y-2">
                    <tr class="border-b border-gray-700">
                      <td class="py-2 text-gray-400">Daily Active Users</td>
                      <td class="py-2 text-right font-semibold text-white">12,450</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                      <td class="py-2 text-gray-400">Retention Rate</td>
                      <td class="py-2 text-right font-semibold text-blue-400">78%</td>
                    </tr>
                    <tr class="border-b border-gray-700">
                      <td class="py-2 text-gray-400">Avg Session Time</td>
                      <td class="py-2 text-right text-white">18 min</td>
                    </tr>
                    <tr>
                      <td class="py-2 text-gray-400">Conversion Rate</td>
                      <td class="py-2 text-right font-semibold text-green-400">24%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        },
        detailed_analysis: {
          title: "Detailed Analysis",
          html_content: `
            <div class="space-y-6">
              <div class="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-purple-300 mb-3">🚀 Revenue Acceleration Drivers</h4>
                <p class="text-gray-300 mb-4">The 23% week-over-week revenue growth to $64,000 was driven by multiple converging factors:</p>
                <ol class="list-decimal list-inside space-y-2 text-gray-300 ml-4">
                  <li><strong class="text-white">Premium Feature Adoption:</strong> 40% of existing users upgraded to premium plans after AI dashboard launch</li>
                  <li><strong class="text-white">Improved Conversion Funnel:</strong> Trial-to-paid conversion improved from 18% to 24%</li>
                  <li><strong class="text-white">Reduced Churn:</strong> Enhanced onboarding reduced monthly churn by 15%</li>
                  <li><strong class="text-white">Pricing Optimization:</strong> New tiered pricing structure increased ARPU by 12%</li>
                </ol>
              </div>

              <div class="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-green-300 mb-3">📈 User Engagement Breakthrough</h4>
                <p class="text-gray-300 mb-4">The AI-powered dashboard feature launch created unprecedented engagement levels:</p>
                <div class="grid md:grid-cols-3 gap-4 mt-4">
                  <div class="bg-gray-800/30 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-green-400">+31%</div>
                    <div class="text-sm text-gray-400">Daily Active Users</div>
                  </div>
                  <div class="bg-gray-800/30 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-blue-400">18 min</div>
                    <div class="text-sm text-gray-400">Avg Session Time</div>
                  </div>
                  <div class="bg-gray-800/30 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-purple-400">78%</div>
                    <div class="text-sm text-gray-400">User Retention</div>
                  </div>
                </div>
              </div>

              <div class="bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-orange-300 mb-3">⚡ Operational Excellence</h4>
                <p class="text-gray-300 mb-4">Infrastructure optimizations delivered significant improvements:</p>
                <ul class="space-y-2 text-gray-300">
                  <li class="flex items-center"><span class="text-green-400 mr-2">•</span> Server response times improved by 35%</li>
                  <li class="flex items-center"><span class="text-green-400 mr-2">•</span> Customer support tickets decreased by 22%</li>
                  <li class="flex items-center"><span class="text-green-400 mr-2">•</span> API reliability reached 99.8% uptime</li>
                  <li class="flex items-center"><span class="text-green-400 mr-2">•</span> Database query performance improved by 28%</li>
                </ul>
              </div>
            </div>
          `
        },
        recommendations: {
          title: "Strategic Recommendations",
          html_content: `
            <div class="space-y-6">
              <div class="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-indigo-300 mb-4">🎯 Immediate Actions (Next 7 Days)</h4>
                <div class="space-y-3">
                  <div class="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <div class="bg-green-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-semibold text-white">Scale Marketing Investment</h5>
                      <p class="text-gray-300 text-sm">Increase ad spend by 30% to capitalize on improved 24% conversion rate</p>
                      <span class="text-green-400 text-xs">High Priority</span>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <div class="bg-yellow-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-semibold text-white">Accelerate Feature Rollout</h5>
                      <p class="text-gray-300 text-sm">Fast-track premium features to capture current momentum</p>
                      <span class="text-yellow-400 text-xs">Medium Priority</span>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <div class="bg-red-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h5 class="font-semibold text-white">Infrastructure Scaling</h5>
                      <p class="text-gray-300 text-sm">Prepare servers for 40% user growth projected for next month</p>
                      <span class="text-red-400 text-xs">Critical</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-purple-900/20 border border-purple-500/30 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-purple-300 mb-4">🔮 Medium-term Focus (Next 30 Days)</h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-start">
                    <span class="text-purple-400 mr-3 mt-1">1.</span>
                    <div>
                      <strong>Advanced Analytics Suite:</strong> Develop predictive analytics features to maintain high engagement levels
                    </div>
                  </li>
                  <li class="flex items-start">
                    <span class="text-purple-400 mr-3 mt-1">2.</span>
                    <div>
                      <strong>Customer Success Program:</strong> Launch dedicated support for premium users to reduce churn
                    </div>
                  </li>
                  <li class="flex items-start">
                    <span class="text-purple-400 mr-3 mt-1">3.</span>
                    <div>
                      <strong>Enterprise Tier Development:</strong> Create enterprise pricing based on current usage patterns
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          `
        },
        risk_assessment: {
          title: "Risk Factors & Monitoring",
          html_content: `
            <div class="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-red-300 mb-4">⚠️ Key Risks to Monitor</h4>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 class="font-semibold text-white">Infrastructure Capacity</h5>
                    <p class="text-gray-300 text-sm">Current growth rate may exceed server capacity within 2 weeks</p>
                    <div class="flex items-center mt-2">
                      <div class="bg-red-500 h-2 w-16 rounded-full mr-2"></div>
                      <span class="text-red-400 text-xs">High Risk</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 class="font-semibold text-white">Support Team Scaling</h5>
                    <p class="text-gray-300 text-sm">Customer support team needs 3 additional members by month-end</p>
                    <div class="flex items-center mt-2">
                      <div class="bg-yellow-500 h-2 w-12 rounded-full mr-2"></div>
                      <span class="text-yellow-400 text-xs">Medium Risk</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 class="font-semibold text-white">Competitive Pressure</h5>
                    <p class="text-gray-300 text-sm">Competitors developing similar AI dashboard features</p>
                    <div class="flex items-center mt-2">
                      <div class="bg-orange-500 h-2 w-8 rounded-full mr-2"></div>
                      <span class="text-orange-400 text-xs">Low Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      }
    };
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const metadata = newsletter ? getMetadata(newsletter) : null;
    const newMessages = [
      ...chatMessages,
      { role: "user" as const, content: currentMessage },
      {
        role: "assistant" as const,
        content: `I can help you dive deeper into this week's data. Based on the newsletter analysis, I can see revenue grew ${metadata?.change} to ${metadata?.keyMetric}. What specific aspect would you like me to analyze further? I can break down revenue by product, examine user behavior patterns, or explore any anomalies you've noticed.`,
      },
    ];

    setChatMessages(newMessages);
    setCurrentMessage("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white font-light flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-indigo-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading newsletter...</p>
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-black text-white font-light flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl mb-2">Newsletter Not Found</h1>
          <p className="text-gray-400 mb-4">The newsletter you're looking for doesn't exist.</p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const metadata = getMetadata(newsletter);
  const chartData = getChartData(newsletter);

  return (
    <div className="min-h-screen bg-black text-white font-light">
      <ConstructionBanner />
      {/* Header */}
      <nav className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="text-sm border border-gray-700 rounded-md px-4 py-2 hover:bg-white/5 transition-all">
                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                Back to Dashboard
              </button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-light tracking-tight">newsgent</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
              {metadata.date}
            </Badge>
            {metadata.generated_at && (
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/20">
                AI Generated
              </Badge>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Newsletter Header */}
        <div className="mb-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{metadata.title}</h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>Generated by AI Analyst</span>
              <span>•</span>
              <span>5 min read</span>
              <span>•</span>
              <Badge variant="outline" className={`${
                metadata.trend === "up" ? "text-green-600 border-green-600" :
                 metadata.trend === "down" ? "text-red-600 border-red-600" :
                 "text-yellow-600 border-yellow-600"
              }`}>
                {metadata.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> :
                 metadata.trend === "down" ? <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> :
                 <Calendar className="h-3 w-3 mr-1" />}
                {metadata.trend === "up" ? "Positive Trend" :
                 metadata.trend === "down" ? "Declining Trend" :
                 "Mixed Signals"}
              </Badge>
            </div>
          </header>

          {/* Key Metrics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Key Metric</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metadata.keyMetric}</div>
                <p className={`text-xs ${
                  metadata.trend === "up" ? "text-green-600" :
                  metadata.trend === "down" ? "text-red-600" :
                  "text-yellow-600"
                }`}>
                  {metadata.change} from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trend Analysis</CardTitle>
                {metadata.trend === "up" ? <TrendingUp className="h-4 w-4 text-green-600" /> :
                 metadata.trend === "down" ? <TrendingUp className="h-4 w-4 text-red-600 rotate-180" /> :
                 <Calendar className="h-4 w-4 text-yellow-600" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{metadata.trend}</div>
                <p className="text-xs text-muted-foreground">Weekly performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{chartData.length}</div>
                <p className="text-xs text-muted-foreground">Days analyzed</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Weekly Performance Trend</CardTitle>
              <CardDescription>Daily metrics over the analysis period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metadata.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={metadata.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={metadata.color}
                      strokeWidth={2}
                      fill="url(#gradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Content */}
        <article className="bg-gray-900/60 border border-gray-700 rounded-lg p-8 mb-8">
          {/* Executive Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-gray-800">
                {metadata.summary}
              </p>
            </div>
          </section>

          {/* Error Display */}
          {renderError && (
            <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg mb-6">
              <p className="text-red-400">{renderError}</p>
            </div>
          )}

          {/* Structured HTML Content */}
          {newsletter.sections ? (
            <div className="space-y-8">
              {Object.entries(newsletter.sections).map(([sectionKey, section]) => (
                <section key={sectionKey} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  {renderHTMLContent(section.html_content)}
                </section>
              ))}
            </div>
          ) : (
            /* Fallback to Legacy Content */
            newsletter.content?.full_analysis && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
                <div className="prose max-w-none text-gray-300">
                  <div className="whitespace-pre-wrap">
                    {newsletter.content.full_analysis}
                  </div>
                </div>
              </section>
            )
          )}

          {/* Data Sources */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Sources & Methodology</h2>
            <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <p className="text-gray-300">
                This newsletter was generated using MCP (Model Context Protocol) integration with real-time database analysis. 
                The AI analyzed {chartData.length} days of data to provide comprehensive insights and recommendations.
              </p>
              {metadata.generated_at && (
                <p className="text-sm text-gray-400 mt-2">
                  Generated on: {new Date(metadata.generated_at).toLocaleString()}
                </p>
              )}
            </div>
          </section>
        </article>

        {/* Deep Dive CTA */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Want to Dive Deeper?</h3>
              <p className="text-gray-600 mb-4">
                Ask follow-up questions about this week's data and get instant AI-powered analysis
              </p>
              <Button onClick={() => setShowChat(true)}>Start Deep-Dive Conversation</Button>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        {showChat && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Deep-Dive Analysis
              </CardTitle>
              <CardDescription>Ask questions about this newsletter's data and get detailed insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Ask me anything about this newsletter's performance...
                  </div>
                )}
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="e.g., Can you break down the revenue growth factors?"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Custom CSS for HTML Content */}
      <style jsx global>{`
        .newsletter-html-content {
          color: rgb(209, 213, 219);
        }
        
        .newsletter-html-content h1,
        .newsletter-html-content h2,
        .newsletter-html-content h3,
        .newsletter-html-content h4,
        .newsletter-html-content h5,
        .newsletter-html-content h6 {
          color: white;
          margin-bottom: 1rem;
        }
        
        .newsletter-html-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .newsletter-html-content ul,
        .newsletter-html-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .newsletter-html-content li {
          margin-bottom: 0.5rem;
        }
        
        .newsletter-html-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        
        .newsletter-html-content th,
        .newsletter-html-content td {
          border: 1px solid rgb(55, 65, 81);
          padding: 0.75rem;
          text-align: left;
        }
        
        .newsletter-html-content th {
          background-color: rgb(31, 41, 55);
          color: white;
          font-weight: 600;
        }
        
        .newsletter-html-content blockquote {
          border-left: 4px solid rgb(99, 102, 241);
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background-color: rgb(31, 41, 55);
          padding: 1rem;
          border-radius: 0.5rem;
        }
        
        .newsletter-html-content code {
          background-color: rgb(31, 41, 55);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: monospace;
          color: rgb(168, 185, 247);
        }
        
        .newsletter-html-content pre {
          background-color: rgb(17, 24, 39);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        
        .newsletter-html-content pre code {
          background: none;
          padding: 0;
        }
        
        .newsletter-html-content strong {
          color: white;
          font-weight: 600;
        }
        
        .newsletter-html-content a {
          color: rgb(99, 102, 241);
          text-decoration: underline;
        }
        
        .newsletter-html-content a:hover {
          color: rgb(129, 140, 248);
        }
        
        .newsletter-html-content hr {
          border: none;
          border-top: 1px solid rgb(55, 65, 81);
          margin: 2rem 0;
        }
        
        .newsletter-html-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  )
}
