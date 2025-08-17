"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Brain, 
  Home, 
  MessageSquare, 
  Activity, 
  Settings, 
  FileText, 
  BarChart3,
  LogOut,
  User
} from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview & Analytics"
  },
  {
    name: "Newsletter Generator",
    href: "/dashboard/newsletter",
    icon: FileText,
    description: "AI-powered newsletters"
  },
  {
    name: "AI Analyst", 
    href: "/dashboard/ai-analyst",
    icon: MessageSquare,
    description: "Chat with financial AI"
  },
  {
    name: "Financial Agent",
    href: "/dashboard/financial-agent", 
    icon: Activity,
    description: "24/7 market monitoring"
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    description: "Performance insights"
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Account & preferences"
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center space-x-3 px-6 py-6 border-b border-gray-800">
        <Brain className="h-8 w-8 text-indigo-400" />
        <div>
          <div className="text-xl font-light tracking-tight">newsgent</div>
          <div className="text-xs text-gray-400">Financial Intelligence</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center space-x-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-gray-800 ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className={`text-xs ${isActive ? "text-indigo-100" : "text-gray-500 group-hover:text-gray-400"}`}>
                  {item.description}
                </div>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Demo User</div>
            <div className="text-xs text-gray-400">demo@newsgent</div>
          </div>
        </div>
        
        <Link href="/login" className="mt-2 flex items-center space-x-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition-all hover:bg-gray-800 hover:text-white">
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </Link>
      </div>
    </div>
  )
}