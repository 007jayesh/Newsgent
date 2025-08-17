"use client"

import Sidebar from "./Sidebar"
import ConstructionBanner from "@/components/ui/construction-banner"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ConstructionBanner />
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}