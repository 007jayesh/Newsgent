"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Brain, 
  ArrowLeft, 
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
  Database
} from "lucide-react"
import Link from "next/link"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from "recharts"
import ConstructionBanner from "@/components/ui/construction-banner"

interface AnalysisTask {
  id: string
  type: "fundamental" | "technical" | "sentiment"
  symbol: string
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  result?: any
  error?: string
  created_at: string
  completed_at?: string
}

interface FinancialMetrics {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  pe: number
  dividend: number
  lastUpdated: string
}

interface TechnicalIndicators {
  rsi: number
  macd: { signal: number, histogram: number, macd: number }
  sma20: number
  sma50: number
  bollinger: { upper: number, middle: number, lower: number }
  support: number
  resistance: number
}

interface SentimentData {
  score: number
  label: "Positive" | "Negative" | "Neutral"
  confidence: number
  sources: number
  keywords: string[]
  newsCount: number
}

interface AgentConfig {
  symbols: string[]
  analysisTypes: string[]
  updateInterval: number
  enableAlerts: boolean
  thresholds: {
    rsi_oversold: number
    rsi_overbought: number
    sentiment_threshold: number
  }
}

export default function FinancialAgentPage() {
  const [mounted, setMounted] = useState(false)
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    symbols: ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"],
    analysisTypes: ["fundamental", "technical", "sentiment"],
    updateInterval: 300, // 5 minutes
    enableAlerts: true,
    thresholds: {
      rsi_oversold: 30,
      rsi_overbought: 70,
      sentiment_threshold: 0.6
    }
  })
  
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [activeTasks, setActiveTasks] = useState<AnalysisTask[]>([])
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisTask[]>([])
  const [financialData, setFinancialData] = useState<Record<string, FinancialMetrics>>({})
  const [technicalData, setTechnicalData] = useState<Record<string, TechnicalIndicators>>({})
  const [sentimentData, setSentimentData] = useState<Record<string, SentimentData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL")
  const [activeTab, setActiveTab] = useState("overview")
  const [newSymbol, setNewSymbol] = useState("")
  const [agentLogs, setAgentLogs] = useState<string[]>([])

  // Mock data for demonstration
  const mockFinancialData: Record<string, FinancialMetrics> = {
    "AAPL": {
      symbol: "AAPL",
      price: 175.84,
      change: 2.34,
      changePercent: 1.35,
      volume: 52847392,
      marketCap: 2743000000000,
      pe: 28.4,
      dividend: 0.94,
      lastUpdated: new Date().toISOString()
    },
    "MSFT": {
      symbol: "MSFT",
      price: 378.91,
      change: -1.23,
      changePercent: -0.32,
      volume: 24758392,
      marketCap: 2821000000000,
      pe: 32.1,
      dividend: 2.72,
      lastUpdated: new Date().toISOString()
    }
  }

  const mockTechnicalData: Record<string, TechnicalIndicators> = {
    "AAPL": {
      rsi: 67.3,
      macd: { signal: 1.23, histogram: 0.45, macd: 1.68 },
      sma20: 172.45,
      sma50: 168.92,
      bollinger: { upper: 180.23, middle: 175.84, lower: 171.45 },
      support: 170.00,
      resistance: 180.00
    },
    "MSFT": {
      rsi: 45.8,
      macd: { signal: -0.87, histogram: -0.23, macd: -1.10 },
      sma20: 375.12,
      sma50: 371.84,
      bollinger: { upper: 385.67, middle: 378.91, lower: 372.15 },
      support: 365.00,
      resistance: 385.00
    }
  }

  const mockSentimentData: Record<string, SentimentData> = {
    "AAPL": {
      score: 0.72,
      label: "Positive",
      confidence: 0.89,
      sources: 247,
      keywords: ["growth", "innovation", "iPhone", "earnings"],
      newsCount: 156
    },
    "MSFT": {
      score: 0.45,
      label: "Neutral",
      confidence: 0.76,
      sources: 189,
      keywords: ["cloud", "Azure", "AI", "productivity"],
      newsCount: 98
    }
  }

  const priceChartData = [
    { time: "09:30", price: 173.45 },
    { time: "10:00", price: 174.12 },
    { time: "10:30", price: 173.89 },
    { time: "11:00", price: 175.23 },
    { time: "11:30", price: 175.84 },
    { time: "12:00", price: 176.12 },
    { time: "12:30", price: 175.67 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  useEffect(() => {
    setMounted(true)
    // Initialize with mock data
    setFinancialData(mockFinancialData)
    setTechnicalData(mockTechnicalData)
    setSentimentData(mockSentimentData)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  // Start the AI agent (demo mode - no backend required)
  const startAgent = async () => {
    setIsAgentRunning(true)
    setIsLoading(true)
    
    try {
      addLog("🤖 Financial AI Agent starting...")
      addLog("📊 Initializing data connections...")
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addLog("✅ Connected to financial data sources")
      addLog("🔄 Beginning analysis cycles...")
      
      // Start analysis tasks for each symbol
      for (const symbol of agentConfig.symbols) {
        for (const analysisType of agentConfig.analysisTypes) {
          const task: AnalysisTask = {
            id: `${symbol}-${analysisType}-${Date.now()}`,
            type: analysisType as any,
            symbol,
            status: "running",
            progress: 0,
            created_at: new Date().toISOString()
          }
          setActiveTasks(prev => [...prev, task])
          
          // Simulate task progress
          simulateTaskProgress(task)
        }
      }
      
      addLog("🎯 Agent running successfully - monitoring all configured symbols")
      
    } catch (error) {
      addLog(`❌ Error starting agent: ${error}`)
      setIsAgentRunning(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Stop the AI agent
  const stopAgent = async () => {
    setIsAgentRunning(false)
    addLog("⏹️ Financial AI Agent stopped")
    setActiveTasks([])
  }


  // Add log message
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setAgentLogs(prev => [...prev, `[${timestamp}] ${message}`].slice(-50)) // Keep last 50 logs
  }

  // Simulate task progress for demo
  const simulateTaskProgress = async (task: AnalysisTask) => {
    const steps = [
      { progress: 20, message: `Fetching ${task.type} data for ${task.symbol}` },
      { progress: 40, message: `Processing ${task.type} indicators` },
      { progress: 60, message: `Running AI analysis` },
      { progress: 80, message: `Generating insights` },
      { progress: 100, message: `${task.type} analysis completed` }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (!isAgentRunning) break
      
      setActiveTasks(prev => 
        prev.map(t => 
          t.id === task.id 
            ? { ...t, progress: step.progress, status: step.progress === 100 ? "completed" : "running" }
            : t
        )
      )
      
      addLog(`📊 ${step.message}`)
      
      if (step.progress === 100) {
        // Move to history after a delay
        setTimeout(() => {
          setActiveTasks(prev => prev.filter(t => t.id !== task.id))
          setAnalysisHistory(prev => [...prev, { ...task, status: "completed", completed_at: new Date().toISOString(), progress: 100 }])
        }, 2000)
      }
    }
  }


  // Add new symbol
  const addSymbol = () => {
    if (newSymbol && !agentConfig.symbols.includes(newSymbol.toUpperCase())) {
      setAgentConfig(prev => ({
        ...prev,
        symbols: [...prev.symbols, newSymbol.toUpperCase()]
      }))
      setNewSymbol("")
    }
  }

  // Remove symbol
  const removeSymbol = (symbol: string) => {
    setAgentConfig(prev => ({
      ...prev,
      symbols: prev.symbols.filter(s => s !== symbol)
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value)
  }

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toLocaleString()}`
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
              <Brain className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">AI Financial Agent</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAgentRunning ? (
              <div className="flex items-center text-green-600">
                <Activity className="h-4 w-4 mr-2 animate-pulse" />
                Agent Running
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <Square className="h-4 w-4 mr-2" />
                Agent Stopped
              </div>
            )}
            {isAgentRunning ? (
              <Button onClick={stopAgent} variant="destructive" size="sm">
                <Square className="h-4 w-4 mr-2" />
                Stop Agent
              </Button>
            ) : (
              <Button 
                onClick={startAgent} 
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Agent
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Financial Analysis Agent</h1>
          <p className="text-gray-600">Automated fundamental, technical, and sentiment analysis of financial markets</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Agent Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Agent Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{agentConfig.symbols.length}</div>
                      <div className="text-sm text-gray-500">Symbols Tracked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{activeTasks.length}</div>
                      <div className="text-sm text-gray-500">Active Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{analysisHistory.length}</div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{agentConfig.updateInterval}s</div>
                      <div className="text-sm text-gray-500">Update Interval</div>
                    </div>
                  </div>

                  {/* Active Tasks */}
                  {activeTasks.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Active Analysis Tasks</h4>
                      {activeTasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{task.symbol}</span>
                              <Badge variant="outline" className="text-xs">
                                {task.type}
                              </Badge>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-500">{task.progress}%</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Market Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Market Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(financialData).map((data) => (
                      <div key={data.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{data.symbol}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(data.price)}</div>
                        </div>
                        <div className={`text-right ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="font-medium">
                            {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            {data.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Agent Logs */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Agent Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 overflow-y-auto bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                    {agentLogs.length === 0 ? (
                      <div className="text-gray-500">Agent not started. Click "Start Agent" to begin monitoring.</div>
                    ) : (
                      agentLogs.map((log, index) => (
                        <div key={index} className="mb-1">{log}</div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fundamental">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Fundamental Metrics
                  </CardTitle>
                  <CardDescription>
                    Key financial ratios and metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Label>Select Symbol</Label>
                    <select
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      {agentConfig.symbols.map(symbol => (
                        <option key={symbol} value={symbol}>{symbol}</option>
                      ))}
                    </select>
                  </div>

                  {financialData[selectedSymbol] && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">Market Cap</div>
                          <div className="text-lg font-semibold">
                            {formatLargeNumber(financialData[selectedSymbol].marketCap)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">P/E Ratio</div>
                          <div className="text-lg font-semibold">{financialData[selectedSymbol].pe}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500">Volume</div>
                          <div className="text-lg font-semibold">
                            {financialData[selectedSymbol].volume.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Dividend Yield</div>
                          <div className="text-lg font-semibold">{financialData[selectedSymbol].dividend}%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Price Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mounted && (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={priceChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Technical Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Label>Select Symbol</Label>
                    <select
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      {agentConfig.symbols.map(symbol => (
                        <option key={symbol} value={symbol}>{symbol}</option>
                      ))}
                    </select>
                  </div>

                  {technicalData[selectedSymbol] && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">RSI</div>
                          <div className="flex items-center space-x-2">
                            <div className="text-lg font-semibold">{technicalData[selectedSymbol].rsi}</div>
                            <Badge variant={
                              technicalData[selectedSymbol].rsi > 70 ? "destructive" :
                              technicalData[selectedSymbol].rsi < 30 ? "secondary" : "default"
                            }>
                              {technicalData[selectedSymbol].rsi > 70 ? "Overbought" :
                               technicalData[selectedSymbol].rsi < 30 ? "Oversold" : "Neutral"}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">MACD</div>
                          <div className="text-lg font-semibold">{technicalData[selectedSymbol].macd.macd.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">SMA 20</div>
                          <div className="text-lg font-semibold">{formatCurrency(technicalData[selectedSymbol].sma20)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">SMA 50</div>
                          <div className="text-lg font-semibold">{formatCurrency(technicalData[selectedSymbol].sma50)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Support</div>
                          <div className="text-lg font-semibold text-green-600">
                            {formatCurrency(technicalData[selectedSymbol].support)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Resistance</div>
                          <div className="text-lg font-semibold text-red-600">
                            {formatCurrency(technicalData[selectedSymbol].resistance)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bollinger Bands</CardTitle>
                </CardHeader>
                <CardContent>
                  {technicalData[selectedSymbol] && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Current Price vs Bands</div>
                        <div className="text-2xl font-bold">{formatCurrency(financialData[selectedSymbol]?.price || 0)}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span className="text-sm">Upper Band</span>
                          <span className="font-semibold">{formatCurrency(technicalData[selectedSymbol].bollinger.upper)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Middle Band (SMA)</span>
                          <span className="font-semibold">{formatCurrency(technicalData[selectedSymbol].bollinger.middle)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">Lower Band</span>
                          <span className="font-semibold">{formatCurrency(technicalData[selectedSymbol].bollinger.lower)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Newspaper className="h-5 w-5 mr-2" />
                    Sentiment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Label>Select Symbol</Label>
                    <select
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      {agentConfig.symbols.map(symbol => (
                        <option key={symbol} value={symbol}>{symbol}</option>
                      ))}
                    </select>
                  </div>

                  {sentimentData[selectedSymbol] && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          <Badge variant={
                            sentimentData[selectedSymbol].label === "Positive" ? "default" :
                            sentimentData[selectedSymbol].label === "Negative" ? "destructive" : "secondary"
                          } className="text-lg px-4 py-2">
                            {sentimentData[selectedSymbol].label}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Confidence: {(sentimentData[selectedSymbol].confidence * 100).toFixed(1)}%
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Sentiment Score</div>
                          <div className="text-lg font-semibold">{sentimentData[selectedSymbol].score.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">News Sources</div>
                          <div className="text-lg font-semibold">{sentimentData[selectedSymbol].sources}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-2">Key Topics</div>
                        <div className="flex flex-wrap gap-2">
                          {sentimentData[selectedSymbol].keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline">{keyword}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {mounted && (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Positive', value: 65, color: '#10b981' },
                              { name: 'Neutral', value: 25, color: '#6b7280' },
                              { name: 'Negative', value: 10, color: '#ef4444' }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {[
                              { name: 'Positive', value: 65, color: '#10b981' },
                              { name: 'Neutral', value: 25, color: '#6b7280' },
                              { name: 'Negative', value: 10, color: '#ef4444' }
                            ].map((entry, entryIndex) => (
                              <Cell key={`cell-${entryIndex}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="config">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Tracked Symbols
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add symbol (e.g., AAPL)"
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
                      />
                      <Button onClick={addSymbol}>Add</Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {agentConfig.symbols.map((symbol) => (
                        <Badge key={symbol} variant="outline" className="flex items-center space-x-1">
                          <span>{symbol}</span>
                          <button
                            onClick={() => removeSymbol(symbol)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Agent Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Update Interval (seconds)</Label>
                    <Input
                      type="number"
                      value={agentConfig.updateInterval}
                      onChange={(e) => setAgentConfig(prev => ({
                        ...prev,
                        updateInterval: parseInt(e.target.value) || 300
                      }))}
                    />
                  </div>

                  <div>
                    <Label>Analysis Types</Label>
                    <div className="space-y-2 mt-2">
                      {["fundamental", "technical", "sentiment"].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={agentConfig.analysisTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAgentConfig(prev => ({
                                  ...prev,
                                  analysisTypes: [...prev.analysisTypes, type]
                                }))
                              } else {
                                setAgentConfig(prev => ({
                                  ...prev,
                                  analysisTypes: prev.analysisTypes.filter(t => t !== type)
                                }))
                              }
                            }}
                          />
                          <span className="capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={agentConfig.enableAlerts}
                        onChange={(e) => setAgentConfig(prev => ({
                          ...prev,
                          enableAlerts: e.target.checked
                        }))}
                      />
                      <span>Enable Alerts</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Alert Thresholds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>RSI Oversold Threshold</Label>
                      <Input
                        type="number"
                        value={agentConfig.thresholds.rsi_oversold}
                        onChange={(e) => setAgentConfig(prev => ({
                          ...prev,
                          thresholds: {
                            ...prev.thresholds,
                            rsi_oversold: parseInt(e.target.value) || 30
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>RSI Overbought Threshold</Label>
                      <Input
                        type="number"
                        value={agentConfig.thresholds.rsi_overbought}
                        onChange={(e) => setAgentConfig(prev => ({
                          ...prev,
                          thresholds: {
                            ...prev.thresholds,
                            rsi_overbought: parseInt(e.target.value) || 70
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Sentiment Threshold</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={agentConfig.thresholds.sentiment_threshold}
                        onChange={(e) => setAgentConfig(prev => ({
                          ...prev,
                          thresholds: {
                            ...prev.thresholds,
                            sentiment_threshold: parseFloat(e.target.value) || 0.6
                          }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}