"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Brain, 
  ArrowLeft, 
  Send,
  Mic,
  MicOff,
  Download,
  Share,
  Bookmark,
  BookmarkCheck,
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Loader2,
  Play,
  Pause,
  Square,
  RefreshCw,
  Eye,
  Calendar,
  Target,
  Zap,
  LineChart,
  PieChart,
  Newspaper,
  Database,
  Clock,
  Globe,
  Search,
  MessageSquare,
  Bot,
  User,
  Lightbulb,
  FileText,
  Settings,
  History
} from "lucide-react"
import Link from "next/link"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Cell, ComposedChart } from "recharts"
import ConstructionBanner from "@/components/ui/construction-banner"

interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  data?: any
  charts?: any[]
  suggestions?: string[]
  sources?: string[]
  isStreaming?: boolean
}

interface QuerySuggestion {
  category: string
  queries: string[]
  icon: any
}

interface DataSource {
  name: string
  type: "real-time" | "historical" | "news" | "fundamental"
  status: "connected" | "disconnected" | "error"
  lastUpdate: string
  description: string
}

interface BookmarkedQuery {
  id: string
  query: string
  timestamp: string
  category: string
  result_summary: string
}

export default function AIAnalystPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [bookmarkedQueries, setBookmarkedQueries] = useState<BookmarkedQuery[]>([])
  const [queryHistory, setQueryHistory] = useState<ChatMessage[]>([])
  const [dataSources] = useState<DataSource[]>([
    {
      name: "Yahoo Finance API",
      type: "real-time",
      status: "connected",
      lastUpdate: new Date().toISOString(),
      description: "Real-time stock prices, volumes, and market data"
    },
    {
      name: "Alpha Vantage",
      type: "historical",
      status: "connected", 
      lastUpdate: new Date().toISOString(),
      description: "Historical price data, technical indicators, and fundamentals"
    },
    {
      name: "Financial News APIs",
      type: "news",
      status: "connected",
      lastUpdate: new Date().toISOString(),
      description: "Market news, earnings reports, and sentiment analysis"
    },
    {
      name: "SEC EDGAR Database",
      type: "fundamental",
      status: "connected",
      lastUpdate: new Date().toISOString(),
      description: "Financial statements, 10-K/10-Q filings, insider trading"
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const querySuggestions: QuerySuggestion[] = [
    {
      category: "Market Analysis",
      icon: TrendingUp,
      queries: [
        "What's the current market sentiment for AAPL?",
        "Show me the 5-year performance comparison between MSFT and GOOGL",
        "What are the key technical indicators for TSLA right now?",
        "Analyze the recent earnings impact on NVDA stock price"
      ]
    },
    {
      category: "Historical Trends",
      icon: Clock,
      queries: [
        "How did tech stocks perform during the 2022 market downturn?",
        "Show me AMZN's price movements around past earnings announcements",
        "What was the correlation between oil prices and airline stocks in 2023?",
        "Compare the volatility of crypto vs traditional stocks over the last year"
      ]
    },
    {
      category: "Real-time Data",
      icon: Activity,
      queries: [
        "What's happening in the markets right now?",
        "Show me today's biggest movers in the S&P 500",
        "What's the current trading volume for meme stocks?",
        "Are there any unusual options activities today?"
      ]
    },
    {
      category: "Fundamental Analysis",
      icon: FileText,
      queries: [
        "What's AAPL's P/E ratio compared to industry average?",
        "Show me the debt-to-equity trends for major banks",
        "Analyze the revenue growth patterns for cloud companies",
        "What are the key financial metrics for dividend aristocrats?"
      ]
    },
    {
      category: "News & Events",
      icon: Newspaper,
      queries: [
        "How did recent Fed announcements affect bond yields?",
        "What's the market reaction to today's economic data?",
        "Show me the impact of geopolitical events on energy stocks",
        "Analyze earnings guidance revisions for Q4 2024"
      ]
    }
  ]

  // Enhanced sample data for more realistic charts
  const sampleChartData = [
    { date: "2024-07", AAPL: 185, MSFT: 380, GOOGL: 140, volume: 45000000, TSLA: 248, NVDA: 875 },
    { date: "2024-08", AAPL: 190, MSFT: 385, GOOGL: 145, volume: 52000000, TSLA: 252, NVDA: 890 },
    { date: "2024-09", AAPL: 175, MSFT: 375, GOOGL: 138, volume: 48000000, TSLA: 242, NVDA: 865 },
    { date: "2024-10", AAPL: 180, MSFT: 395, GOOGL: 155, volume: 55000000, TSLA: 258, NVDA: 920 },
    { date: "2024-11", AAPL: 195, MSFT: 405, GOOGL: 165, volume: 58000000, TSLA: 267, NVDA: 945 },
    { date: "2024-12", AAPL: 188, MSFT: 398, GOOGL: 162, volume: 51000000, TSLA: 261, NVDA: 928 },
    { date: "2025-01", AAPL: 192, MSFT: 412, GOOGL: 168, volume: 49000000, TSLA: 264, NVDA: 950 }
  ]

  // Real-time market data simulation
  const currentMarketData = {
    indices: {
      SP500: { price: 4185.47, change: 0.8, volume: "4.2B" },
      NASDAQ: { price: 12945.26, change: 1.2, volume: "2.8B" },
      DOW: { price: 33127.28, change: 0.5, volume: "380M" }
    },
    topMovers: {
      gainers: [
        { symbol: "NVDA", price: 950.23, change: 3.2 },
        { symbol: "TSLA", price: 264.42, change: 2.8 },
        { symbol: "META", price: 484.92, change: 2.1 }
      ],
      losers: [
        { symbol: "XOM", price: 109.84, change: -1.8 },
        { symbol: "JNJ", price: 162.84, change: -1.2 },
        { symbol: "PG", price: 145.67, change: -0.9 }
      ]
    },
    sentiment: {
      vix: 18.4,
      putCallRatio: 0.87,
      fearGreed: 72
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "👋 Hello! I'm your AI Financial Analyst. I can help you analyze real-time and historical market data, provide insights, and answer complex financial questions. What would you like to explore today?",
        timestamp: new Date().toISOString(),
        suggestions: [
          "Show me today's market performance",
          "Analyze AAPL's technical indicators", 
          "Compare tech stock performance this year",
          "What's the latest news affecting markets?"
        ]
      }
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setQueryHistory(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI processing with realistic responses
    await simulateAIResponse(inputMessage)
  }

  const simulateAIResponse = async (query: string) => {
    // Add streaming indicator
    const streamingMessage: ChatMessage = {
      id: `streaming-${Date.now()}`,
      role: "assistant",
      content: "🔄 Analyzing your query and accessing real-time market data...",
      timestamp: new Date().toISOString(),
      isStreaming: true
    }
    setMessages(prev => [...prev, streamingMessage])

    // Simulate realistic AI processing steps
    const steps = [
      "🔍 Parsing natural language query...",
      "📊 Accessing financial databases...", 
      "🤖 Running AI analysis algorithms...",
      "📈 Generating insights and visualizations..."
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingMessage.id 
            ? { ...msg, content: steps[i] }
            : msg
        )
      )
    }

    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate contextual response based on query
    const response = generateContextualResponse(query)
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === streamingMessage.id 
          ? { ...response, id: streamingMessage.id }
          : msg
      )
    )
    setIsLoading(false)
  }

  const generateContextualResponse = (query: string): ChatMessage => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('aapl') || lowerQuery.includes('apple')) {
      return {
        id: "",
        role: "assistant",
        content: `📊 **Apple Inc. (AAPL) Analysis**

**Current Status**: $175.84 (+1.35% today)

**Technical Analysis**:
- RSI: 67.3 (Approaching overbought territory)
- MACD: Bullish crossover detected
- Support: $170.00, Resistance: $180.00
- 20-day SMA: $172.45 (price above trend)

**Recent Developments**:
- Strong iPhone 15 sales momentum
- Services revenue growing at 16% YoY
- AI integration announcements driving sentiment

**Key Insights**:
✅ Technical momentum remains positive
⚠️ Approaching resistance level - watch for breakout
📈 Long-term trend intact despite recent volatility`,
        timestamp: new Date().toISOString(),
        charts: [
          {
            type: "line",
            title: "AAPL Price Trend (6M)",
            data: sampleChartData.map(d => ({ date: d.date, price: d.AAPL }))
          }
        ],
        suggestions: [
          "Show me AAPL's options flow today",
          "Compare AAPL vs other tech giants",
          "What's the analyst sentiment on AAPL?",
          "When is AAPL's next earnings date?"
        ],
        sources: ["Yahoo Finance", "Alpha Vantage", "MarketWatch"]
      }
    } else if (lowerQuery.includes('market') || lowerQuery.includes('s&p') || lowerQuery.includes('today')) {
      return {
        id: "",
        role: "assistant", 
        content: `🌐 **Real-Time Market Overview & Analysis**

**Major Indices Performance** (Live):
- S&P 500: ${currentMarketData.indices.SP500.price.toLocaleString()} (+${currentMarketData.indices.SP500.change}%) Vol: ${currentMarketData.indices.SP500.volume}
- NASDAQ: ${currentMarketData.indices.NASDAQ.price.toLocaleString()} (+${currentMarketData.indices.NASDAQ.change}%) Vol: ${currentMarketData.indices.NASDAQ.volume}
- Dow Jones: ${currentMarketData.indices.DOW.price.toLocaleString()} (+${currentMarketData.indices.DOW.change}%) Vol: ${currentMarketData.indices.DOW.volume}

**Market Sentiment**: Cautiously Optimistic
- VIX: ${currentMarketData.sentiment.vix} (Moderate volatility)
- Put/Call Ratio: ${currentMarketData.sentiment.putCallRatio} (Neutral bias)
- Fear & Greed Index: ${currentMarketData.sentiment.fearGreed} (Greed territory)

**Today's Top Movers**:
🔥 **Winners**: ${currentMarketData.topMovers.gainers.map(stock => `${stock.symbol} (+${stock.change}%)`).join(", ")}
📉 **Losers**: ${currentMarketData.topMovers.losers.map(stock => `${stock.symbol} (${stock.change}%)`).join(", ")}

**Key Market Drivers**:
1. Better-than-expected inflation data (CPI: 3.1% vs 3.3% est.)
2. Strong tech earnings momentum (NVDA +15% this week)
3. Fed dovish signals on rate cuts (March meeting in focus)
4. AI sector rotation continuing (sector up 8% this month)
5. Bond yields stabilizing around 4.2% (10-year treasury)

**Sector Performance Today**:
- Technology: +1.8% (Leading gains)
- Communication Services: +1.4%
- Consumer Discretionary: +0.9%
- Energy: -1.2% (Lagging)
- Utilities: -0.8%`,
        timestamp: new Date().toISOString(),
        charts: [
          {
            type: "composed",
            title: "Live Market Performance (7-Month View)",
            data: sampleChartData
          }
        ],
        suggestions: [
          "Show sector performance breakdown",
          "What's driving NVDA's surge today?",
          "Analyze VIX volatility patterns",
          "Compare with European markets",
          "Show me crypto correlation with tech stocks"
        ],
        sources: ["Bloomberg Terminal", "Reuters Real-Time", "Yahoo Finance API", "Alpha Vantage", "Market Data Feed"]
      }
    } else if (lowerQuery.includes('historical') || lowerQuery.includes('compare')) {
      return {
        id: "",
        role: "assistant",
        content: `📈 **Historical Analysis & Comparison**

**Performance Comparison (YTD)**:
- AAPL: +12.4%
- MSFT: +8.7% 
- GOOGL: +15.2%
- TSLA: -8.3%
- NVDA: +45.6%

**Key Historical Insights**:
✨ **Pattern Recognition**: Tech stocks showing classic Q4 rally pattern
📊 **Volatility Analysis**: Current volatility 23% below historical average
🎯 **Correlation**: High correlation (0.78) between mega-cap tech stocks

**Historical Context**:
- Similar market conditions in Q4 2019 led to 15% rally
- Current P/E ratios 12% below 5-year average
- Earnings growth acceleration matching 2021 patterns`,
        timestamp: new Date().toISOString(),
        charts: [
          {
            type: "area",
            title: "Historical Performance Comparison",
            data: sampleChartData
          }
        ],
        suggestions: [
          "Show correlation matrix for tech stocks",
          "Analyze seasonal patterns",
          "Compare with historical bear markets",
          "What happened during similar setups?"
        ],
        sources: ["Alpha Vantage", "Quandl", "FRED Economic Data"]
      }
    } else {
      return {
        id: "",
        role: "assistant",
        content: `🤖 **AI Analysis Complete**

I've analyzed your query: "${query}"

**Real-time Data Sources Accessed**:
- Current market prices and volumes
- Technical indicator calculations
- News sentiment analysis
- Options flow data

**Historical Context Applied**:
- 5-year performance patterns
- Earnings announcement impacts
- Market cycle analysis
- Volatility benchmarking

**Key Findings**:
- Market conditions remain constructive
- Technical indicators suggest continued momentum
- Fundamental metrics support current valuations
- Sentiment indicators show balanced outlook

Would you like me to dive deeper into any specific aspect of this analysis?`,
        timestamp: new Date().toISOString(),
        suggestions: [
          "Show me the data behind this analysis",
          "What are the risks to this outlook?",
          "How confident are you in this assessment?",
          "Compare this to analyst consensus"
        ],
        sources: ["Multiple APIs", "Real-time feeds", "Historical databases"]
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const bookmarkQuery = (message: ChatMessage) => {
    if (message.role === "user") {
      const bookmark: BookmarkedQuery = {
        id: Date.now().toString(),
        query: message.content,
        timestamp: message.timestamp,
        category: "General",
        result_summary: "Analysis available"
      }
      setBookmarkedQueries(prev => [...prev, bookmark])
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input logic would go here
  }

  const exportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      summary: "AI Financial Analyst Chat Session"
    }
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financial-analysis-${Date.now()}.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConstructionBanner />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Financial Analyst</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={exportChat} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Conversational Financial Analysis</h1>
          <p className="text-gray-600">Ask questions about markets, stocks, and get AI-powered insights with real-time and historical data</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <Lightbulb className="h-4 w-4 mr-2" />
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="sources">
              <Database className="h-4 w-4 mr-2" />
              Data Sources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Chat Interface */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    AI Financial Analyst
                  </CardTitle>
                  <CardDescription>
                    Ask complex financial questions and get insights backed by real-time and historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Chat Messages */}
                  <ScrollArea className="h-96 mb-4 p-4 border rounded-lg bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.role === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-white border shadow-sm"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.role === "assistant" && <Bot className="h-4 w-4 mt-1 text-blue-600" />}
                              {message.role === "user" && <User className="h-4 w-4 mt-1" />}
                              <div className="flex-1">
                                {message.isStreaming ? (
                                  <div className="flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">{message.content}</span>
                                  </div>
                                ) : (
                                  <div className="prose prose-sm max-w-none">
                                    <div className="whitespace-pre-wrap">{message.content}</div>
                                  </div>
                                )}
                                
                                {/* Charts */}
                                {message.charts && (
                                  <div className="mt-4 space-y-4">
                                    {message.charts.map((chart, index) => (
                                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">{chart.title}</h4>
                                        <div className="h-64">
                                          <ResponsiveContainer width="100%" height="100%">
                                            {chart.type === "line" ? (
                                              <RechartsLineChart data={chart.data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="price" stroke="#0088FE" strokeWidth={2} />
                                              </RechartsLineChart>
                                            ) : chart.type === "area" ? (
                                              <AreaChart data={sampleChartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="AAPL" stackId="1" stroke="#0088FE" fill="#0088FE" />
                                                <Area type="monotone" dataKey="MSFT" stackId="1" stroke="#00C49F" fill="#00C49F" />
                                                <Area type="monotone" dataKey="GOOGL" stackId="1" stroke="#FFBB28" fill="#FFBB28" />
                                              </AreaChart>
                                            ) : (
                                              <ComposedChart data={sampleChartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis yAxisId="left" />
                                                <YAxis yAxisId="right" orientation="right" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar yAxisId="left" dataKey="volume" fill="#8884d8" />
                                                <Line yAxisId="right" type="monotone" dataKey="AAPL" stroke="#ff7300" />
                                              </ComposedChart>
                                            )}
                                          </ResponsiveContainer>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Suggestions */}
                                {message.suggestions && (
                                  <div className="mt-3 space-y-2">
                                    <div className="text-sm text-gray-600">💡 Try asking:</div>
                                    {message.suggestions.map((suggestion, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        className="mr-2 mb-2 text-xs"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                      >
                                        {suggestion}
                                      </Button>
                                    ))}
                                  </div>
                                )}

                                {/* Sources */}
                                {message.sources && (
                                  <div className="mt-3 text-xs text-gray-500">
                                    📊 Sources: {message.sources.join(", ")}
                                  </div>
                                )}

                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-500">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </span>
                                  {message.role === "user" && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => bookmarkQuery(message)}
                                    >
                                      <Bookmark className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask me anything about financial markets..."
                        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        disabled={isLoading}
                        className="pr-12"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={toggleVoiceInput}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Popular Queries</Label>
                    {[
                      "Market overview today",
                      "AAPL technical analysis",
                      "Top gainers/losers",
                      "Sector performance"
                    ].map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => handleSuggestionClick(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Bookmarked Queries</Label>
                    {bookmarkedQueries.slice(-3).map((bookmark) => (
                      <Button
                        key={bookmark.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => handleSuggestionClick(bookmark.query)}
                      >
                        <BookmarkCheck className="h-3 w-3 mr-2" />
                        {bookmark.query.substring(0, 25)}...
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {querySuggestions.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <category.icon className="h-5 w-5 mr-2" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.queries.map((query, queryIndex) => (
                        <Button
                          key={queryIndex}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start text-sm h-auto py-3"
                          onClick={() => {
                            setActiveTab("chat")
                            handleSuggestionClick(query)
                          }}
                        >
                          {query}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Query History</CardTitle>
                <CardDescription>
                  Your recent questions and bookmarked queries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queryHistory.map((query) => (
                    <div key={query.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{query.content}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(query.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setActiveTab("chat")
                            handleSuggestionClick(query.content)
                          }}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => bookmarkQuery(query)}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataSources.map((source, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{source.name}</span>
                      <Badge variant={source.status === "connected" ? "default" : "destructive"}>
                        {source.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {source.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Type:</span>
                        <Badge variant="outline">{source.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Last Update:</span>
                        <span className="text-sm">{new Date(source.lastUpdate).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Data Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4/4</div>
                    <div className="text-sm text-gray-500">Sources Connected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Real-time</div>
                    <div className="text-sm text-gray-500">Data Updates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">5+ Years</div>
                    <div className="text-sm text-gray-500">Historical Data</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-sm text-gray-500">Monitoring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}