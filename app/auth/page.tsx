"use client"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { redirect } from "next/navigation"

export default function AuthPage() {
  const login = async () => {
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    const supabase = await createClient()

    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    redirect("/dashboard")
  }

  const signUp = async () => {
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    const supabase = await createClient()

    await supabase.auth.signUp({
      email,
      password,
    })
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
          <Button onClick={login} className="">
            Log In
          </Button>
          <Button onClick={signUp} variant={"ghost"} className="">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
