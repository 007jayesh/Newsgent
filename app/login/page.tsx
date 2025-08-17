"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white font-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="font-extralight">Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-light tracking-tight">xyz.ai</span>
          </div>
        </div>

        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-light tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-400 font-extralight">Sign in to access your business insights</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-extralight text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="founder@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-extralight text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black border-gray-700 text-white focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 font-extralight">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-light rounded-md py-3 hover:bg-opacity-90 transition-all disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 font-extralight">
              Don't have an account?{" "}
              <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-light">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
