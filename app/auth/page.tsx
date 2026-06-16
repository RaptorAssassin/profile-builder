"use client"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { useState } from "react"
import { redirect } from "next/navigation"
import { login, signUp } from "@/lib/auth"

export default function AuthPage() {
  const callLogin = async () => {
    await login(email, password)
    redirect("/dashboard")
  }
  const callSignUp = async () => {
    await signUp(email, password)
    redirect("/dashboard")
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const inputClassName =
    "p-3 rounded-full bg-accent text-foreground mb-4 w-full"

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-background">
      <div className="mx-auto mt-20 w-full max-w-md rounded-xl bg-accent/20 p-8">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={callLogin} className="">
            Log In
          </Button>
          <Button onClick={callSignUp} variant={"ghost"} className="">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
