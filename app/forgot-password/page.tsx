"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))

    setSent(true)
    setIsLoading(false)

    // After a short delay, navigate back to login
    setTimeout(() => router.push("/login"), 2500)
  }

  return (
    <div className="min-h-screen bg-black text-white font-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back / logo */}
        <div className="text-center mb-8">
          <Link
            href="/login"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="font-extralight">Back to Sign in</span>
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-light tracking-tight">xyz.ai</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-light tracking-tight mb-2">Reset your password</h1>
            <p className="text-gray-400 font-extralight">
              Enter the email you use with xyz.ai and we’ll send a reset link
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <Mail className="h-10 w-10 text-green-400 mx-auto" />
              <p className="text-green-300 font-light">
                Check your inbox! We’ve sent a link to <span className="underline">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-extralight text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="founder@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500"
                />
              </div>

              <Button disabled={isLoading} className="w-full">
                {isLoading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
