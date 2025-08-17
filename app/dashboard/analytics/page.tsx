"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Users,
  Calendar,
  Target,
  Eye,
  Download,
  RefreshCw,
  PieChart,
  LineChart
} from "lucide-react"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell, ComposedChart } from "recharts"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

export default function AnalyticsDashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const performanceData = [
    { date: "Jan 10", newsletters: 12, engagement: 85, revenue: 12400, users: 234 },
    { date: "Jan 11", newsletters: 15, engagement: 78, revenue: 13200, users: 245 },
    { date: "Jan 12", newsletters: 18, engagement: 92, revenue: 15600, users: 256 },
    { date: "Jan 13", newsletters: 14, engagement: 88, revenue: 14100, users: 267 },
    { date: "Jan 14", newsletters: 20, engagement: 95, revenue: 18900, users: 278 },
    { date: "Jan 15", newsletters: 22, engagement: 91, revenue: 19800, users: 289 },
    { date: "Jan 16", newsletters: 25, engagement: 97, revenue: 22300, users: 301 }
  ]

  const channelData = [
    { name: "Email Newsletter", value: 45, color: "#0088FE" },
    { name: "AI Analyst Chat", value: 25, color: "#00C49F" },
    { name: "Financial Agent", value: 20, color: "#FFBB28" },
    { name: "API Usage", value: 10, color: "#FF8042" }
  ]

  const contentMetrics = [
    { category: "Market Analysis", generated: 145, engagement: 92, avgTime: "4.2m" },
    { category: "Stock Research", generated: 89, engagement: 88, avgTime: "3.8m" },
    { category: "Portfolio Updates", generated: 67, engagement: 95, avgTime: "2.1m" },
    { category: "Sector Reports", generated: 34, engagement: 85, avgTime: "5.7m" },
    { category: "Economic Insights", generated: 23, engagement: 79, avgTime: "6.2m" }
  ]

  const userSegments = [
    { name: "Individual Investors", users: 1247, revenue: "$18,430", growth: 12.4 },
    { name: "Financial Advisors", users: 89, revenue: "$23,890", growth: 8.7 },
    { name: "Hedge Funds", users: 23, revenue: "$45,230", growth: 15.2 },
    { name: "Enterprise", users: 12, revenue: "$67,890", growth: 22.1 }
  ]

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$156,890",
      change: "+12.4%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Active Users",
      value: "1,371",
      change: "+8.7%", 
      trend: "up",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Newsletters Generated",
      value: "358",
      change: "+23.1%",
      trend: "up", 
      icon: BarChart3,
      color: "text-purple-400"
    },
    {
      title: "Avg Engagement",
      value: "89.2%",
      change: "+5.3%",
      trend: "up",
      icon: Activity,
      color: "text-orange-400"
    }
  ]

  if (!mounted) {
    return <DashboardLayout><div className="p-8 bg-black text-white min-h-full">Loading...</div></DashboardLayout>
  }

  return (
    <DashboardLayout>
      <div className="p-8 bg-black text-white min-h-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-light tracking-tighter text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-400 font-extralight">
                Performance insights and detailed metrics across all features
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {["7d", "30d", "90d"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range ? "bg-blue-600" : "border-gray-700 text-white hover:bg-white/5"}
                  >
                    {range}
                  </Button>
                ))}
              </div>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-white/5">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-800/50`}>
                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <span className="text-sm text-gray-400 font-extralight">{kpi.title}</span>
                </div>
                <div className={`flex items-center space-x-1 ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-xs">{kpi.change}</span>
                </div>
              </div>
              <div className="text-3xl font-light tracking-tight text-white">{kpi.value}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/60 border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gray-800">
              <PieChart className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gray-800">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-gray-800">
              <LineChart className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                  Revenue Trend
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
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
                      <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Usage by Channel */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4 flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-400" />
                  Usage by Channel
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
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
                </div>
              </div>
            </div>

            {/* Combined Metrics */}
            <div className="mt-6 bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-light mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-400" />
                Newsletter & Engagement Trends
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
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
                    <Bar yAxisId="left" dataKey="newsletters" fill="#8884d8" name="Newsletters Generated" />
                    <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#ff7300" name="Engagement %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-light mb-4">Content Performance by Category</h3>
              <div className="space-y-4">
                {contentMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/20 border border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-white mb-1">{metric.category}</div>
                      <div className="text-sm text-gray-400">
                        {metric.generated} pieces generated • {metric.engagement}% engagement
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-400">Avg Time</div>
                        <div className="text-white font-medium">{metric.avgTime}</div>
                      </div>
                      <div className="w-16">
                        <div className="text-xs text-gray-400 mb-1">Engagement</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${metric.engagement}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-6">
              {/* User Growth */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  User Growth Trend
                </h3>
                <div className="h-64">
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
                      <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* User Segments */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">User Segments</h3>
                <div className="space-y-4">
                  {userSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/20 border border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-white mb-1">{segment.name}</div>
                        <div className="text-sm text-gray-400">
                          {segment.users.toLocaleString()} users
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Revenue</div>
                          <div className="text-white font-medium">{segment.revenue}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Growth</div>
                          <div className="text-green-400 font-medium flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {segment.growth}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Response Times */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Average Response Times</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Newsletter Generation</span>
                    <span className="text-white">2.3s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">AI Analyst Query</span>
                    <span className="text-white">1.8s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Financial Analysis</span>
                    <span className="text-white">4.1s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Data Sync</span>
                    <span className="text-white">0.9s</span>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">API Uptime</span>
                    <Badge variant="default" className="bg-green-600">99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Data Sources</span>
                    <Badge variant="default" className="bg-green-600">4/4 Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Error Rate</span>
                    <span className="text-white">0.01%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cache Hit Rate</span>
                    <span className="text-white">94.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}