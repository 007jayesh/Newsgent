"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Brain, 
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
  Clock
} from "lucide-react"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from "recharts"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

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

export default function FinancialAgentDashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [isAgentRunning, setIsAgentRunning] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [recentTasks, setRecentTasks] = useState<AnalysisTask[]>([])
  const [watchedSymbols] = useState(["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"])
  const [activeTab, setActiveTab] = useState("dashboard")

  const sampleMetrics: FinancialMetrics[] = [
    {
      symbol: "AAPL",
      price: 175.84,
      change: 2.35,
      changePercent: 1.35,
      volume: 45678900,
      marketCap: 2750000000000,
      pe: 28.5,
      dividend: 0.96,
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "MSFT", 
      price: 412.23,
      change: -1.45,
      changePercent: -0.35,
      volume: 23456789,
      marketCap: 3100000000000,
      pe: 32.1,
      dividend: 2.72,
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "GOOGL",
      price: 168.42,
      change: 3.21,
      changePercent: 1.94,
      volume: 18765432,
      marketCap: 2100000000000,
      pe: 24.8,
      dividend: 0.0,
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "TSLA",
      price: 264.89,
      change: 7.42,
      changePercent: 2.88,
      volume: 67891234,
      marketCap: 850000000000,
      pe: 45.2,
      dividend: 0.0,
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "NVDA",
      price: 950.23,
      change: 28.65,
      changePercent: 3.11,
      volume: 89123456,
      marketCap: 2340000000000,
      pe: 58.7,
      dividend: 0.16,
      lastUpdated: new Date().toISOString()
    }
  ]

  const performanceData = [
    { date: "2024-07", portfolio: 100, sp500: 100, nasdaq: 100 },
    { date: "2024-08", portfolio: 105, sp500: 103, nasdaq: 104 },
    { date: "2024-09", portfolio: 98, sp500: 101, nasdaq: 99 },
    { date: "2024-10", portfolio: 112, sp500: 106, nasdaq: 108 },
    { date: "2024-11", portfolio: 118, sp500: 109, nasdaq: 113 },
    { date: "2024-12", portfolio: 115, sp500: 108, nasdaq: 110 },
    { date: "2025-01", portfolio: 122, sp500: 112, nasdaq: 116 }
  ]

  const sectorAllocation = [
    { name: "Technology", value: 45, color: "#0088FE" },
    { name: "Healthcare", value: 20, color: "#00C49F" },
    { name: "Finance", value: 15, color: "#FFBB28" },
    { name: "Consumer", value: 12, color: "#FF8042" },
    { name: "Energy", value: 8, color: "#8884d8" }
  ]

  const alerts = [
    {
      id: "1",
      type: "technical",
      symbol: "AAPL",
      message: "RSI approaching overbought levels (68.5)",
      severity: "warning",
      timestamp: "2025-01-17 14:30:00"
    },
    {
      id: "2", 
      type: "sentiment",
      symbol: "TSLA",
      message: "Positive sentiment spike (+15%) following earnings",
      severity: "info",
      timestamp: "2025-01-17 13:45:00"
    },
    {
      id: "3",
      type: "fundamental",
      symbol: "MSFT",
      message: "P/E ratio exceeded sector average by 20%",
      severity: "warning",
      timestamp: "2025-01-17 12:15:00"
    }
  ]

  useEffect(() => {
    setMounted(true)
    // Initialize with some sample tasks after mount to prevent hydration mismatch
    setTimeout(() => {
      setRecentTasks([
        {
          id: "task-1",
          type: "technical",
          symbol: "AAPL",
          status: "completed",
          progress: 100,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          completed_at: new Date(Date.now() - 3300000).toISOString(),
          result: { rsi: 68.5, macd: "bullish", recommendation: "hold" }
        },
        {
          id: "task-2",
          type: "sentiment",
          symbol: "TSLA", 
          status: "running",
          progress: 75,
          created_at: new Date(Date.now() - 1800000).toISOString()
        },
        {
          id: "task-3",
          type: "fundamental",
          symbol: "MSFT",
          status: "pending",
          progress: 0,
          created_at: new Date().toISOString()
        }
      ])
    }, 100)
  }, [])

  const startAgent = () => {
    setIsAgentRunning(true)
    setAnalysisProgress(0)
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const stopAgent = () => {
    setIsAgentRunning(false)
    setAnalysisProgress(0)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toLocaleString()}`
  }

  const formatVolume = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`
    return value.toString()
  }

  if (!mounted) {
    return <DashboardLayout><div className="p-8 bg-black text-white min-h-full">Loading...</div></DashboardLayout>
  }

  return (
    <DashboardLayout>
      <div className="p-8 bg-black text-white min-h-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-light tracking-tighter text-white mb-2">Financial Agent</h1>
              <p className="text-gray-400 font-extralight">
                24/7 automated financial analysis and monitoring
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {isAgentRunning ? (
                <Button onClick={stopAgent} variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Square className="h-4 w-4 mr-2" />
                  Stop Agent
                </Button>
              ) : (
                <Button onClick={startAgent} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Agent
                </Button>
              )}
              <Button variant="outline" className="border-gray-700 text-white hover:bg-white/5">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Agent Status */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isAgentRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
              <span className="text-sm text-gray-300">
                Agent Status: {isAgentRunning ? 'Running' : 'Stopped'}
              </span>
            </div>
            {isAgentRunning && (
              <div className="flex items-center space-x-2">
                <Progress value={analysisProgress} className="w-32" />
                <span className="text-sm text-gray-300">{analysisProgress}%</span>
              </div>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/60 border border-gray-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-800">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-gray-800">
              <Brain className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-gray-800">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-800">
              <Database className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Performance */}
              <div className="lg:col-span-2 bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4 flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                  Portfolio Performance
                </h3>
                <div className="h-64">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={performanceData}>
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
                        <Legend />
                        <Line type="monotone" dataKey="portfolio" stroke="#10B981" strokeWidth={3} name="Portfolio" />
                        <Line type="monotone" dataKey="sp500" stroke="#6B7280" strokeWidth={2} name="S&P 500" />
                        <Line type="monotone" dataKey="nasdaq" stroke="#8B5CF6" strokeWidth={2} name="NASDAQ" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full bg-gray-800/50 rounded-lg animate-pulse"></div>
                  )}
                </div>
              </div>

              {/* Sector Allocation */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4 flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-400" />
                  Sector Allocation
                </h3>
                <div className="h-64">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={sectorAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sectorAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full bg-gray-800/50 rounded-lg animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Watched Symbols */}
            <div className="mt-6 bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-light mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-green-400" />
                Watched Symbols
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {sampleMetrics.map((metric) => (
                  <div key={metric.symbol} className="bg-black/20 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{metric.symbol}</span>
                      <div className={`flex items-center ${metric.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </div>
                    </div>
                    <div className="text-2xl font-light text-white mb-1">
                      ${metric.price.toFixed(2)}
                    </div>
                    <div className={`text-sm ${metric.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.changePercent >= 0 ? '+' : ''}{metric.change.toFixed(2)} ({metric.changePercent.toFixed(2)}%)
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Vol: {formatVolume(metric.volume)}
                    </div>
                    <div className="text-xs text-gray-500">
                      P/E: {metric.pe}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="space-y-6">
              {/* Recent Analysis Tasks */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-400" />
                  Recent Analysis Tasks
                </h3>
                <div className="space-y-4">
                  {mounted ? (
                    recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-black/20 border border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {task.status === "completed" && <CheckCircle className="h-5 w-5 text-green-400" />}
                            {task.status === "running" && <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />}
                            {task.status === "pending" && <Clock className="h-5 w-5 text-yellow-400" />}
                            {task.status === "failed" && <AlertTriangle className="h-5 w-5 text-red-400" />}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {task.type.charAt(0).toUpperCase() + task.type.slice(1)} Analysis - {task.symbol}
                            </div>
                            <div className="text-sm text-gray-400">
                              Started: {new Date(task.created_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Progress value={task.progress} className="w-24" />
                          <Badge variant={
                            task.status === "completed" ? "default" :
                            task.status === "running" ? "secondary" :
                            task.status === "failed" ? "destructive" : "outline"
                          }>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-800/50 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-light mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-400" />
                    Technical Indicators
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">RSI (14)</span>
                      <span className="text-white">68.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">MACD</span>
                      <Badge variant="default" className="bg-green-600">Bullish</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">SMA 20</span>
                      <span className="text-white">$172.45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Support</span>
                      <span className="text-white">$170.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Resistance</span>
                      <span className="text-white">$180.00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-light mb-4 flex items-center">
                    <Newspaper className="h-5 w-5 mr-2 text-purple-400" />
                    Sentiment Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Overall Sentiment</span>
                      <Badge variant="default" className="bg-green-600">Positive</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Confidence</span>
                      <span className="text-white">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">News Sources</span>
                      <span className="text-white">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Social Mentions</span>
                      <span className="text-white">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Trend</span>
                      <div className="flex items-center text-green-400">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Improving
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-light mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                Recent Alerts
              </h3>
              <div className="space-y-4">
                {mounted ? (
                  alerts.map((alert) => (
                    <Alert key={alert.id} className="bg-black/20 border-gray-700">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="ml-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {alert.symbol}
                              </Badge>
                              <Badge variant={
                                alert.severity === "warning" ? "destructive" : 
                                alert.severity === "info" ? "default" : "secondary"
                              } className="text-xs">
                                {alert.type}
                              </Badge>
                            </div>
                            <p className="text-white">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-gray-800/50 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Agent Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Watched Symbols</Label>
                    <Input 
                      value={watchedSymbols.join(", ")} 
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="AAPL, MSFT, GOOGL, ..."
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Update Interval (minutes)</Label>
                    <Input 
                      type="number" 
                      defaultValue="5"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">RSI Thresholds</Label>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <Input 
                        placeholder="Oversold (30)"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                      <Input 
                        placeholder="Overbought (70)"
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Configuration
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}