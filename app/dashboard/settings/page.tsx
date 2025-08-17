"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Settings, 
  Database,
  Mail,
  Bell,
  Shield,
  Key,
  User,
  Zap,
  CheckCircle,
  AlertTriangle,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

export default function SettingsDashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSavedMessage("Settings saved successfully!")
    setTimeout(() => setSavedMessage(""), 3000)
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
              <h1 className="text-4xl font-light tracking-tighter text-white mb-2">Settings</h1>
              <p className="text-gray-400 font-extralight">
                Configure your account, data sources, and system preferences
              </p>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Settings
            </Button>
          </div>

          {savedMessage && (
            <Alert className="mb-4 bg-green-900/20 border-green-700">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-300">
                {savedMessage}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/60 border border-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gray-800">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-gray-800">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-800">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-gray-800">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gray-800">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">First Name</Label>
                      <Input 
                        defaultValue="Demo"
                        className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Last Name</Label>
                      <Input 
                        defaultValue="User"
                        className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Email Address</Label>
                    <Input 
                      type="email"
                      defaultValue="demo@newsgent"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Company</Label>
                    <Input 
                      defaultValue="newsgent"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Role</Label>
                    <Input 
                      defaultValue="Financial Analyst"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Newsletter Frequency</Label>
                      <p className="text-sm text-gray-500">How often to generate newsletters</p>
                    </div>
                    <select className="bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option>Daily</option>
                      <option selected>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Default Time Zone</Label>
                      <p className="text-sm text-gray-500">Used for scheduling and reports</p>
                    </div>
                    <select className="bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option>UTC</option>
                      <option selected>EST (Eastern)</option>
                      <option>PST (Pacific)</option>
                      <option>GMT (London)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Currency Display</Label>
                      <p className="text-sm text-gray-500">Default currency for financial data</p>
                    </div>
                    <select className="bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option selected>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="database">
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Database Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Database Type</Label>
                    <select className="mt-1 w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option>PostgreSQL</option>
                      <option selected>MySQL</option>
                      <option>MongoDB</option>
                      <option>SQLite</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Host</Label>
                    <Input 
                      defaultValue="localhost"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Port</Label>
                      <Input 
                        defaultValue="3306"
                        className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Database Name</Label>
                      <Input 
                        defaultValue="financial_data"
                        className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Username</Label>
                      <Input 
                        defaultValue="xyz_user"
                        className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Password</Label>
                      <Input 
                        type="password"
                        defaultValue="••••••••"
                        className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Connection Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-white font-medium">Database Connected</div>
                        <div className="text-sm text-gray-400">Last tested: 2 minutes ago</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/5">
                      Test Connection
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">247ms</div>
                      <div className="text-sm text-gray-400">Latency</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-gray-400">Uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">1.2GB</div>
                      <div className="text-sm text-gray-400">Data Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">15,847</div>
                      <div className="text-sm text-gray-400">Records</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Newsletter Generation</Label>
                      <p className="text-sm text-gray-500">Get notified when newsletters are generated</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Analysis Alerts</Label>
                      <p className="text-sm text-gray-500">Receive alerts from AI financial analysis</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">System Updates</Label>
                      <p className="text-sm text-gray-500">Get notified about system maintenance</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Weekly Summary</Label>
                      <p className="text-sm text-gray-500">Receive weekly performance summary</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Alert Thresholds</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Price Change Alert (%)</Label>
                    <Input 
                      type="number"
                      defaultValue="5"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Trigger alert when price changes by"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Volume Spike Alert (%)</Label>
                    <Input 
                      type="number"
                      defaultValue="150"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Trigger alert when volume exceeds"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">RSI Overbought Level</Label>
                    <Input 
                      type="number"
                      defaultValue="70"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="RSI level for overbought alerts"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">RSI Oversold Level</Label>
                    <Input 
                      type="number"
                      defaultValue="30"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="RSI level for oversold alerts"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">API Keys</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">OpenAI API Key</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input 
                        type={showApiKey ? "text" : "password"}
                        defaultValue="sk-1234567890abcdef..."
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="border-gray-700 text-white hover:bg-white/5"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Financial Data API Key</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input 
                        type="password"
                        defaultValue="fd-api-9876543210..."
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                      <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/5">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">News API Key</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input 
                        type="password"
                        defaultValue="news-api-abcd1234..."
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                      <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/5">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">API Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-black/20 border border-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">1,247</div>
                    <div className="text-sm text-gray-400">Requests Today</div>
                    <div className="text-xs text-gray-500 mt-1">12% of limit</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 border border-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">89.3%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                    <div className="text-xs text-gray-500 mt-1">Last 24h</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 border border-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">234ms</div>
                    <div className="text-sm text-gray-400">Avg Response</div>
                    <div className="text-xs text-gray-500 mt-1">Last hour</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Password & Authentication</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Current Password</Label>
                    <Input 
                      type="password"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">New Password</Label>
                    <Input 
                      type="password"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Confirm New Password</Label>
                    <Input 
                      type="password"
                      className="mt-1 bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Security Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Login Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Session Timeout</Label>
                      <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                    </div>
                    <select className="bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option>30 minutes</option>
                      <option selected>1 hour</option>
                      <option>4 hours</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-light mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black/20 border border-gray-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Login from Chrome on Windows</div>
                      <div className="text-sm text-gray-400">IP: 192.168.1.100 • New York, NY</div>
                    </div>
                    <div className="text-sm text-gray-400">2 hours ago</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/20 border border-gray-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">API Key Generated</div>
                      <div className="text-sm text-gray-400">OpenAI API key created</div>
                    </div>
                    <div className="text-sm text-gray-400">1 day ago</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/20 border border-gray-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Password Changed</div>
                      <div className="text-sm text-gray-400">Account password updated</div>
                    </div>
                    <div className="text-sm text-gray-400">3 days ago</div>
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