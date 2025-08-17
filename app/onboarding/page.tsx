"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Database, CheckCircle, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import ConstructionBanner from "@/components/ui/construction-banner"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [connectionTested, setConnectionTested] = useState(false)
  const router = useRouter()

  const [dbConfig, setDbConfig] = useState({
    host: "",
    port: "8123",
    username: "",
    password: "",
    database: "",
  })

  const [masterPrompt, setMasterPrompt] = useState(`Analyze our business performance this week and provide insights on:

1. Revenue trends and key drivers
2. User acquisition and retention metrics  
3. Product performance and usage patterns
4. Operational efficiency indicators
5. Notable anomalies or opportunities

Please structure your analysis as a narrative story, explaining what happened, why it happened, and what actions we should consider. Include relevant charts and data visualizations to support your insights.

Focus on actionable recommendations that a startup founder can implement immediately.`)

  const handleTestConnection = async () => {
    setIsLoading(true)
    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setConnectionTested(true)
    setIsLoading(false)
  }

  const handleComplete = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ConstructionBanner />
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">xyz.ai</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Get You Started</h1>
          <p className="text-gray-600">Set up your data connection and configure your AI analyst</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Connect Your Database
              </CardTitle>
              <CardDescription>
                Securely connect to your ClickHouse database to start analyzing your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">Host</Label>
                  <Input
                    id="host"
                    placeholder="your-clickhouse-host.com"
                    value={dbConfig.host}
                    onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    placeholder="8123"
                    value={dbConfig.port}
                    onChange={(e) => setDbConfig({ ...dbConfig, port: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={dbConfig.username}
                  onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={dbConfig.password}
                  onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="database">Database Name</Label>
                <Input
                  id="database"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleTestConnection} disabled={isLoading}>
                  {isLoading ? "Testing..." : "Test Connection"}
                </Button>
                {connectionTested && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Connection successful!
                  </div>
                )}
              </div>

              <Button className="w-full" onClick={() => setStep(2)} disabled={!connectionTested}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Configure Your AI Analyst</CardTitle>
              <CardDescription>Define what insights and metrics matter most to your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="masterPrompt">Master Prompt</Label>
                <Textarea
                  id="masterPrompt"
                  rows={12}
                  value={masterPrompt}
                  onChange={(e) => setMasterPrompt(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500">
                  This prompt defines how your AI analyst will analyze your data and structure your weekly newsletters.
                </p>
              </div>

              <Button className="w-full" onClick={handleComplete} disabled={isLoading}>
                {isLoading ? "Setting Up..." : "Complete Setup"}
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  )
}
