"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ArrowLeft, Database, CheckCircle, AlertCircle, Loader2, Play, Zap, FileText, Download } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ConstructionBanner from "@/components/ui/construction-banner";

interface LogMessage {
  role: string;
  content: string;
  timestamp: string;
  tool_name?: string;
}

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

export default function MCPSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mcpConnected, setMcpConnected] = useState(false);
  const [anthropicApiKey, setAnthropicApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<"anthropic" | "openai">("anthropic");
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet-20241022");
  const [mcpServerUrl, setMcpServerUrl] = useState("http://localhost:8001");
  const [userQuery, setUserQuery] = useState("Generate a comprehensive weekly business newsletter analyzing the most recent week of data. Include key metrics, trends, insights, and strategic recommendations based on actual database analysis.");
  const [conversationHistory, setConversationHistory] = useState<LogMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [generatedNewsletter, setGeneratedNewsletter] = useState<Newsletter | null>(null);
  const [activeTab, setActiveTab] = useState("setup");

  // Available models by provider
const modelOptions = {
  anthropic: [
    { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4 (Latest)", recommended: true },
    { value: "claude-3-7-sonnet-20250219", label: "Claude 3.7 Sonnet (claude-3-7-sonnet-latest)" },
    { value: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet (claude-3-5-sonnet-latest)" },
    { value: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku (Faster)" },
    { value: "claude-3-opus-20240229", label: "Claude 3 Opus (Most Capable)" },
  ],
  openai: [
    { value: "gpt-4o", label: "GPT-4o (Best for Tools)", recommended: true },
    { value: "gpt-4o-mini", label: "GPT-4o Mini (Fast & Tools)" },
    { value: "o1-mini", label: "o1-mini (Reasoning, No Tools)" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (Fastest)" },
  ]
};

// Update model when provider changes
useEffect(() => {
  const defaultModels = {
    anthropic: "claude-sonnet-4-20250514",
    openai: "gpt-4o"
  };
  setSelectedModel(defaultModels[selectedProvider]);
}, [selectedProvider]);

  // Test MCP connection (demo mode)
  const testMcpConnection = async () => {
    setIsLoading(true);
    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMcpConnected(true);
      alert("✅ Demo Mode: MCP server simulation connected successfully!\n\nIn production, this would connect to your actual ClickHouse database.");
    } catch (error) {
      setMcpConnected(false);
      alert("❌ Connection simulation failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate newsletter (demo mode)
  const generateNewsletter = async () => {
    if (!selectedProvider && !anthropicApiKey && !openaiApiKey) {
      alert(`Please provide an API key for ${selectedProvider === "anthropic" ? "Anthropic" : "OpenAI"} to generate newsletters in production. For this demo, we'll simulate the process.`);
    }

    setIsProcessing(true);
    setConversationHistory([]);
    setGeneratedNewsletter(null);

    try {
      // Add user message to conversation
      setConversationHistory([{
        role: "user",
        content: userQuery,
        timestamp: new Date().toISOString()
      }]);

      // Simulate realistic newsletter generation process
      await simulateNewsletterGeneration();

    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to process request: ${error}`);
      setIsProcessing(false);
    }
  };

  // Simulate newsletter generation with realistic steps
  const simulateNewsletterGeneration = async () => {
    const generationSteps = [
      { role: "system", content: "🚀 Initializing newsletter generation...", timestamp: new Date().toISOString() },
      { role: "system", content: "🔌 Connecting to database sources...", timestamp: new Date().toISOString() },
      { role: "system", content: "📊 Analyzing business metrics and trends...", timestamp: new Date().toISOString() },
      { role: "analysis", content: "💰 Revenue Analysis: Discovered 23% growth trend", timestamp: new Date().toISOString() },
      { role: "analysis", content: "👥 User Metrics: 8,934 active users (+12% WoW)", timestamp: new Date().toISOString() },
      { role: "analysis", content: "📈 Performance: Churn rate improved to 3.2%", timestamp: new Date().toISOString() },
      { role: "newsletter", content: "✍️ Generating executive summary...", timestamp: new Date().toISOString() },
      { role: "newsletter", content: "📝 Creating key insights section...", timestamp: new Date().toISOString() },
      { role: "newsletter", content: "💡 Formulating strategic recommendations...", timestamp: new Date().toISOString() },
      { role: "success", content: "✅ Newsletter generation completed successfully!", timestamp: new Date().toISOString() }
    ];

    for (const step of generationSteps) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setConversationHistory(prev => [...prev, step]);
    }

    // Generate sample newsletter
    const sampleNewsletter = {
      id: `demo-${Date.now()}`,
      title: "Strong Growth Momentum - Weekly Analysis",
      date: "January 17, 2025",
      summary: "Exceptional week with 23% revenue growth, improved user retention, and strong operational metrics across all business units.",
      status: "generated",
      trend: "up",
      chartData: [
        { day: "Mon", value: 45 },
        { day: "Tue", value: 52 },
        { day: "Wed", value: 48 },
        { day: "Thu", value: 61 },
        { day: "Fri", value: 64 },
      ],
      keyMetric: "$64K",
      metricLabel: "Weekly Revenue",
      change: "+23%",
      color: "#10b981",
      content: {
        full_analysis: `# Weekly Business Analysis - January 17, 2025

## Executive Summary
This week delivered exceptional results with 23% revenue growth reaching $64K. User retention hit 78%, and operational efficiency improved across all metrics.

## Key Performance Indicators
- **Revenue**: $64,000 (+23% WoW)
- **Active Users**: 8,934 (+12% WoW)  
- **Churn Rate**: 3.2% (-1.1 points)
- **Customer Acquisition Cost**: $89 (-15% improvement)

## Strategic Insights
1. **Revenue Acceleration**: Premium feature adoption driving growth
2. **User Engagement**: Session time increased 47% 
3. **Operational Excellence**: Process improvements reducing costs

## Recommended Actions
1. Scale marketing spend by 30% to capitalize on momentum
2. Expand premium tier features based on user feedback
3. Prepare infrastructure for projected 40% growth trajectory

## Market Context
Current performance outpacing industry benchmarks by 2.3x, positioning for strong Q1 results.`
      },
      generated_at: new Date().toISOString()
    };

    setGeneratedNewsletter(sampleNewsletter);
    setActiveTab("newsletter");
    setIsProcessing(false);
  };


  // Save newsletter to dashboard
  const saveNewsletter = async () => {
    if (!generatedNewsletter) return;
    
    try {
      // Here you would save to your backend/database
      // For now, we'll just show success
      alert("✅ Newsletter saved to dashboard!");
      
      // Optionally redirect to dashboard
      // window.location.href = "/dashboard";
    } catch (error) {
      alert("❌ Failed to save newsletter");
    }
  };

  // Get role-specific styling
  const getRoleStyle = (role: string) => {
    switch (role) {
      case "user": return "bg-blue-50 border-blue-200 text-blue-900";
      case "newsletter": return "bg-purple-50 border-purple-200 text-purple-900";
      case "analysis": return "bg-indigo-50 border-indigo-200 text-indigo-900";
      case "tool_call": return "bg-green-50 border-green-200 text-green-900";
      case "sql_query": return "bg-yellow-50 border-yellow-200 text-yellow-900";
      case "data": return "bg-cyan-50 border-cyan-200 text-cyan-900";
      case "insight": return "bg-orange-50 border-orange-200 text-orange-900";
      case "success": return "bg-emerald-50 border-emerald-200 text-emerald-900";
      case "system": return "bg-gray-50 border-gray-200 text-gray-900";
      case "error": return "bg-red-50 border-red-200 text-red-900";
      default: return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "newsletter": return <FileText className="h-4 w-4" />;
      case "analysis": return <Brain className="h-4 w-4" />;
      case "tool_call": return <Zap className="h-4 w-4" />;
      case "sql_query": return <Database className="h-4 w-4" />;
      case "success": return <CheckCircle className="h-4 w-4" />;
      case "error": return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "user": return "You";
      case "newsletter": return "Newsletter Generation";
      case "analysis": return "Analysis";
      case "tool_call": return "Tool Execution";
      case "sql_query": return "SQL Query";
      case "data": return "Data Collection";
      case "insight": return "AI Insight";
      case "success": return "Success";
      case "system": return "System";
      case "error": return "Error";
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConstructionBanner />
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">newsgent Newsletter Generator</span>
            </div>
          </div>
          {mcpConnected && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-2" />
              MCP Connected!
            </div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Newsletter Generator</h1>
          <p className="text-gray-600">Generate comprehensive business newsletters using MCP database analysis</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="generate" disabled={!mcpConnected}>Generate</TabsTrigger>
            <TabsTrigger value="newsletter" disabled={!generatedNewsletter}>Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="setup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  MCP Configuration
                </CardTitle>
                <CardDescription>
                  Configure your MCP ClickHouse server connection for newsletter generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mcpServerUrl">MCP Backend URL</Label>
                    <Input
                      id="mcpServerUrl"
                      value={mcpServerUrl}
                      onChange={(e) => setMcpServerUrl(e.target.value)}
                      placeholder="http://localhost:8001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="providerSelect">AI Provider</Label>
                    <select
                      id="providerSelect"
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value as "anthropic" | "openai")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="anthropic">Anthropic Claude</option>
                      <option value="openai">OpenAI GPT</option>
                    </select>
                  </div>

                  {selectedProvider === "anthropic" ? (
                    <div className="space-y-2">
                      <Label htmlFor="anthropicApiKey">Anthropic API Key</Label>
                      <Input
                        id="anthropicApiKey"
                        type="password"
                        value={anthropicApiKey}
                        onChange={(e) => setAnthropicApiKey(e.target.value)}
                        placeholder="sk-ant-..."
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                      <Input
                        id="openaiApiKey"
                        type="password"
                        value={openaiApiKey}
                        onChange={(e) => setOpenaiApiKey(e.target.value)}
                        placeholder="sk-..."
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="modelSelect">
                      {selectedProvider === "anthropic" ? "Claude" : "OpenAI"} Model
                    </Label>
                    <select
                      id="modelSelect"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {modelOptions[selectedProvider].map((model) => (
                        <option key={model.value} value={model.value}>
                          {model.label} {model.recommended ? "⭐" : ""}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500">
                      {selectedProvider === "anthropic" 
                        ? "Claude 3.5 Sonnet v3.7 offers the best balance of speed and capability"
                        : selectedModel.startsWith("o1")
                        ? "⚠️ o1 models provide advanced reasoning but don't support direct database tools"
                        : "GPT-4o provides excellent tool usage capabilities for database analysis"
                      }
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      onClick={testMcpConnection}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        "Test MCP Connection"
                      )}
                    </Button>
                  </div>

                  {mcpConnected && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-green-800 text-sm">✅ MCP server connected! Ready for newsletter generation.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Newsletter Generation
                </CardTitle>
                <CardDescription>
                  Generate AI-powered business newsletters using your database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userQuery">Newsletter Prompt</Label>
                  <Textarea
                    id="userQuery"
                    rows={4}
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Describe what kind of newsletter you want to generate..."
                  />
                </div>

                <Button 
                  onClick={generateNewsletter}
                  disabled={isProcessing || !mcpConnected || (!anthropicApiKey && !openaiApiKey)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating with {selectedProvider === "anthropic" ? "Claude" : "GPT"}...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate with {selectedProvider === "anthropic" ? "Claude" : "GPT"}
                    </>
                  )}
                </Button>

                {/* Generation Progress */}
                {conversationHistory.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium">Generation Progress</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {conversationHistory.map((message, index) => (
                        <div key={index} className={`p-3 rounded-md border ${getRoleStyle(message.role)}`}>
                          <div className="flex items-center space-x-2 mb-2">
                            {getRoleIcon(message.role)}
                            <span className="font-medium text-sm">
                              {getRoleDisplayName(message.role)}
                            </span>
                            <span className="text-xs opacity-60">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-sm whitespace-pre-wrap font-mono">
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="flex items-center justify-center p-4 bg-purple-50 border border-purple-200 rounded-md">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-purple-600" />
                    <span className="text-purple-800 text-sm">
                      {selectedProvider === "anthropic" ? "Claude" : "GPT"} is analyzing your database and generating newsletter...
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter">
            {generatedNewsletter && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          Generated Newsletter
                        </CardTitle>
                        <CardDescription>
                          Your AI-generated business newsletter is ready
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={saveNewsletter} className="bg-green-600 hover:bg-green-700">
                          <Download className="h-4 w-4 mr-2" />
                          Save to Dashboard
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Newsletter Preview */}
                    <div className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 border border-gray-800 rounded-3xl p-8 text-white">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h3 className="font-light text-xl tracking-tight mb-3">
                            {generatedNewsletter.title}
                          </h3>
                          <p className="text-sm text-gray-400 font-extralight leading-relaxed mb-4">
                            {generatedNewsletter.summary}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6">
                            <span>{generatedNewsletter.date}</span>
                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
                              {generatedNewsletter.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-3xl font-light tracking-tight text-white mb-1">
                            {generatedNewsletter.keyMetric}
                          </div>
                          <div className="text-sm text-gray-400 font-extralight mb-1">
                            {generatedNewsletter.metricLabel}
                          </div>
                          <div className="text-sm font-light text-green-400">
                            {generatedNewsletter.change} vs last week
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-indigo-400 font-extralight">
                        Click "Save to Dashboard" to add this newsletter to your feed
                      </div>
                    </div>

                    {/* Full Content Preview */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                      <h4 className="font-medium mb-2">Full Newsletter Content:</h4>
                      <div className="text-sm whitespace-pre-wrap text-gray-700">
                        {generatedNewsletter.content?.full_analysis || "Newsletter content generated successfully."}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}