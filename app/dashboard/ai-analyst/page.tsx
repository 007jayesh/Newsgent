"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Brain, 
  Send,
  Mic,
  MicOff,
  Download,
  Share,
  Bookmark,
  BookmarkCheck,
  TrendingUp, 
  TrendingDown, 
  Activity, 
  CheckCircle,
  Loader2,
  RefreshCw,
  Calendar,
  Target,
  LineChart,
  PieChart,
  Newspaper,
  Database,
  Clock,
  Search,
  MessageSquare,
  Bot,
  User,
  Lightbulb,
  FileText,
  History
} from "lucide-react"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from "recharts"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

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

export default function AIAnalystDashboardPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const sampleChartData = [
    { date: "2024-07", AAPL: 185, MSFT: 380, GOOGL: 140, volume: 45000000, TSLA: 248, NVDA: 875 },
    { date: "2024-08", AAPL: 190, MSFT: 385, GOOGL: 145, volume: 52000000, TSLA: 252, NVDA: 890 },
    { date: "2024-09", AAPL: 175, MSFT: 375, GOOGL: 138, volume: 48000000, TSLA: 242, NVDA: 865 },
    { date: "2024-10", AAPL: 180, MSFT: 395, GOOGL: 155, volume: 55000000, TSLA: 258, NVDA: 920 },
    { date: "2024-11", AAPL: 195, MSFT: 405, GOOGL: 165, volume: 58000000, TSLA: 267, NVDA: 945 },
    { date: "2024-12", AAPL: 188, MSFT: 398, GOOGL: 162, volume: 51000000, TSLA: 261, NVDA: 928 },
    { date: "2025-01", AAPL: 192, MSFT: 412, GOOGL: 168, volume: 49000000, TSLA: 264, NVDA: 950 }
  ]

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

  useEffect(() => {
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
    setInputMessage("")
    setIsLoading(true)

    await simulateAIResponse(inputMessage)
  }

  const simulateAIResponse = async (query: string) => {
    const streamingMessage: ChatMessage = {
      id: `streaming-${Date.now()}`,
      role: "assistant",
      content: "🔄 Analyzing your query and accessing real-time market data...",
      timestamp: new Date().toISOString(),
      isStreaming: true
    }
    setMessages(prev => [...prev, streamingMessage])

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
5. Bond yields stabilizing around 4.2% (10-year treasury)`,
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
          "Compare with European markets"
        ],
        sources: ["Bloomberg Terminal", "Reuters Real-Time", "Yahoo Finance API", "Alpha Vantage"]
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

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
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
    <DashboardLayout>
      <div className="p-8 bg-black text-white min-h-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-light tracking-tighter text-white mb-2">AI Financial Analyst</h1>
              <p className="text-gray-400 font-extralight">
                Ask questions about markets, stocks, and get AI-powered insights with real-time data
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={exportChat} variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/5">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3 bg-gray-900/40 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Bot className="h-5 w-5 mr-2 text-blue-400" />
              <h3 className="text-lg font-light">Chat with AI Analyst</h3>
            </div>
            
            {/* Chat Messages */}
            <ScrollArea className="h-96 mb-4 p-4 bg-black/20 rounded-lg border border-gray-800/50">
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
                          : "bg-gray-800/60 border border-gray-700"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" && <Bot className="h-4 w-4 mt-1 text-blue-400" />}
                        {message.role === "user" && <User className="h-4 w-4 mt-1" />}
                        <div className="flex-1">
                          {message.isStreaming ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">{message.content}</span>
                            </div>
                          ) : (
                            <div className="prose prose-sm max-w-none text-white">
                              <div className="whitespace-pre-wrap">{message.content}</div>
                            </div>
                          )}
                          
                          {/* Charts */}
                          {message.charts && (
                            <div className="mt-4 space-y-4">
                              {message.charts.map((chart, index) => (
                                <div key={index} className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                                  <h4 className="font-medium mb-2 text-white">{chart.title}</h4>
                                  <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                      {chart.type === "line" ? (
                                        <RechartsLineChart data={chart.data}>
                                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                          <XAxis dataKey="date" stroke="#9CA3AF" />
                                          <YAxis stroke="#9CA3AF" />
                                          <Tooltip 
                                            contentStyle={{ 
                                              backgroundColor: '#1F2937', 
                                              border: '1px solid #374151',
                                              borderRadius: '8px',
                                              color: '#F9FAFB'
                                            }} 
                                          />
                                          <Line type="monotone" dataKey="price" stroke="#0088FE" strokeWidth={2} />
                                        </RechartsLineChart>
                                      ) : chart.type === "area" ? (
                                        <AreaChart data={sampleChartData}>
                                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                          <XAxis dataKey="date" stroke="#9CA3AF" />
                                          <YAxis stroke="#9CA3AF" />
                                          <Tooltip 
                                            contentStyle={{ 
                                              backgroundColor: '#1F2937', 
                                              border: '1px solid #374151',
                                              borderRadius: '8px',
                                              color: '#F9FAFB'
                                            }} 
                                          />
                                          <Area type="monotone" dataKey="AAPL" stackId="1" stroke="#0088FE" fill="#0088FE" />
                                          <Area type="monotone" dataKey="MSFT" stackId="1" stroke="#00C49F" fill="#00C49F" />
                                          <Area type="monotone" dataKey="GOOGL" stackId="1" stroke="#FFBB28" fill="#FFBB28" />
                                        </AreaChart>
                                      ) : (
                                        <ComposedChart data={sampleChartData}>
                                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                          <XAxis dataKey="date" stroke="#9CA3AF" />
                                          <YAxis yAxisId="left" stroke="#9CA3AF" />
                                          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                                          <Tooltip 
                                            contentStyle={{ 
                                              backgroundColor: '#1F2937', 
                                              border: '1px solid #374151',
                                              borderRadius: '8px',
                                              color: '#F9FAFB'
                                            }} 
                                          />
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
                              <div className="text-sm text-gray-400">💡 Try asking:</div>
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="mr-2 mb-2 text-xs border-gray-700 text-gray-300 hover:bg-gray-800"
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
                  className="pr-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={toggleVoiceInput}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-light mb-4">Quick Actions</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-400 mb-2">Popular Queries</div>
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
                    className="w-full justify-start text-xs border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => handleSuggestionClick(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">Data Sources</div>
                <div className="space-y-2">
                  {[
                    { name: "Yahoo Finance", status: "connected" },
                    { name: "Alpha Vantage", status: "connected" },
                    { name: "News APIs", status: "connected" },
                    { name: "SEC EDGAR", status: "connected" }
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">{source.name}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {source.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}