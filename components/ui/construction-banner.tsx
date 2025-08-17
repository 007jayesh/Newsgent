"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Construction, X, Eye } from "lucide-react"

export default function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="border-0 rounded-none bg-gradient-to-r from-orange-900/80 via-yellow-900/80 to-orange-900/80 border-orange-700/50 text-white">
      <Construction className="h-4 w-4 text-orange-300" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <span className="font-medium">🚧 MVP Under Construction</span>
          <span className="text-orange-200">
            This is a demo version - you can explore all features while we build the full platform
          </span>
          <Eye className="h-4 w-4 text-orange-300 ml-2" />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsVisible(false)}
          className="text-orange-200 hover:text-white hover:bg-orange-800/50 ml-4"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}