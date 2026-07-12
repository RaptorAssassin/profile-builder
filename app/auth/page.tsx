"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { login, signUp } from "@/lib/auth"
import { OAuthDiscord, OAuthGithub } from "@/lib/oauth"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function AuthPage() {
  const callLogin = async () => {
    await login(email, password)
    router.push("/dashboard")
  }
  const callSignUp = async () => {
    await signUp(email, password)
    router.push("/dashboard")
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const inputClassName = "p-3 rounded-full bg-accent text-foreground mb-4 w-full"

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-background">
      <div className="mx-auto mt-20 flex w-full max-w-md flex-col items-start justify-center gap-4 rounded-(--radius) bg-accent/20 p-8">
        <h1 className="w-full text-2xl font-extrabold">Login To Profile Builder</h1>
        <h1 className="">OAuth (Recommended)</h1>
        <div className="flex flex-wrap gap-2">
          <OAuthButton provider="github" />
          <OAuthButton provider="discord" />
        </div>
        <h1 className="">Email</h1>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
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

const providers = {
  github: {
    name: "GitHub",
    iconSrc: "/icons/github.svg",
    iconClass: "text-white",
    function: OAuthGithub,
  },
  discord: {
    name: "Discord",
    iconSrc: "/icons/discord.svg",
    iconClass: "text-[#5865F2]",
    function: OAuthDiscord,
  },
}

function OAuthButton({ provider }: { provider: keyof typeof providers }) {
  const { name, iconSrc, function: oauthFunction } = providers[provider]
  return (
    <Button onClick={oauthFunction} variant="outline" className="flex h-15 w-15 items-center p-2">
      <Image src={iconSrc} alt={name} width={40} height={40} className={`select-none`} />
    </Button>
  )
}
