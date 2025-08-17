"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine,
  Brush,
  ComposedChart
} from "recharts"
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  LineChart as LineChartIcon,
  Activity
} from "lucide-react"

interface AdvancedChartProps {
  data: any[]
  title: string
  type?: "line" | "area" | "bar" | "composed"
  dataKeys?: string[]
  colors?: string[]
  showBrush?: boolean
  showReferenceLines?: boolean
  annotations?: any[]
  onDataPointClick?: (data: any) => void
}

export default function AdvancedChart({
  data,
  title,
  type = "line",
  dataKeys = ["value"],
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  showBrush = false,
  showReferenceLines = false,
  annotations = [],
  onDataPointClick
}: AdvancedChartProps) {
  const [chartType, setChartType] = useState(type)
  const [zoomDomain, setZoomDomain] = useState<any>(null)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(dataKeys)
  const [showVolume, setShowVolume] = useState(false)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${
                entry.dataKey.includes('price') || entry.dataKey.includes('$') 
                  ? `$${entry.value.toFixed(2)}` 
                  : entry.value.toLocaleString()
              }`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const handleDataPointClick = (data: any) => {
    if (onDataPointClick) {
      onDataPointClick(data)
    }
  }

  const exportChart = () => {
    // Chart export logic would go here
    const chartData = {
      title,
      data,
      type: chartType,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_')}_${Date.now()}.json`
    a.click()
  }

  const renderChart = () => {
    const commonProps = {
      data,
      onClick: handleDataPointClick,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedMetrics.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
              />
            ))}
            {showReferenceLines && (
              <>
                <ReferenceLine y={100} stroke="red" strokeDasharray="5 5" />
                <ReferenceLine y={200} stroke="green" strokeDasharray="5 5" />
              </>
            )}
            {showBrush && <Brush dataKey="date" height={30} stroke="#8884d8" />}
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedMetrics.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
              />
            ))}
            {showBrush && <Brush dataKey="date" height={30} stroke="#8884d8" />}
          </BarChart>
        )

      case "composed":
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedMetrics.slice(0, -1).map((key, index) => (
              <Line
                key={key}
                yAxisId="left"
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
              />
            ))}
            {showVolume && (
              <Bar
                yAxisId="right"
                dataKey="volume"
                fill="#8884d8"
                opacity={0.6}
              />
            )}
            {showBrush && <Brush dataKey="date" height={30} stroke="#8884d8" />}
          </ComposedChart>
        )

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedMetrics.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors[index % colors.length] }}
              />
            ))}
            {showReferenceLines && (
              <>
                <ReferenceLine y={100} stroke="red" strokeDasharray="5 5" label="Support" />
                <ReferenceLine y={200} stroke="green" strokeDasharray="5 5" label="Resistance" />
              </>
            )}
            {annotations.map((annotation, index) => (
              <ReferenceLine
                key={index}
                x={annotation.x}
                stroke={annotation.color || "orange"}
                strokeDasharray="3 3"
                label={annotation.label}
              />
            ))}
            {showBrush && <Brush dataKey="date" height={30} stroke="#8884d8" />}
          </LineChart>
        )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>{title}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {/* Chart Type Toggles */}
            <div className="flex items-center space-x-1 border rounded p-1">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("area")}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "composed" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("composed")}
              >
                <Activity className="h-4 w-4" />
              </Button>
            </div>

            {/* Chart Controls */}
            <Button variant="outline" size="sm" onClick={exportChart}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Metric Selection */}
        <div className="flex flex-wrap gap-2 mt-2">
          {dataKeys.map((key) => (
            <Badge
              key={key}
              variant={selectedMetrics.includes(key) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                if (selectedMetrics.includes(key)) {
                  setSelectedMetrics(selectedMetrics.filter(m => m !== key))
                } else {
                  setSelectedMetrics([...selectedMetrics, key])
                }
              }}
            >
              {key}
            </Badge>
          ))}
        </div>

        {/* Chart Options */}
        <div className="flex items-center space-x-4 text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showBrush}
              onChange={(e) => setShowBrush(e.target.checked)}
            />
            <span>Time Brush</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showReferenceLines}
              onChange={(e) => setShowReferenceLines(e.target.checked)}
            />
            <span>Reference Lines</span>
          </label>
          {chartType === "composed" && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showVolume}
                onChange={(e) => setShowVolume(e.target.checked)}
              />
              <span>Volume</span>
            </label>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
        
        {/* Chart Statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Data Points</div>
            <div className="font-semibold">{data.length}</div>
          </div>
          <div>
            <div className="text-gray-500">Time Range</div>
            <div className="font-semibold">
              {data.length > 0 && `${data[0].date} - ${data[data.length - 1].date}`}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Selected Metrics</div>
            <div className="font-semibold">{selectedMetrics.length}</div>
          </div>
          <div>
            <div className="text-gray-500">Chart Type</div>
            <div className="font-semibold capitalize">{chartType}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}