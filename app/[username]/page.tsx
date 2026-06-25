"use client"
import ClaimUsernameButtons from "@/components/claim-username-buttons"
import {
  DEFAULT_PROFILE_CONFIG,
  DEFAULT_PROFILE_CONTENT,
  getProfileConfig,
  getProfileContent,
} from "@/lib/profile"
import { ProfileConfig, ProfileContent } from "@/types/profile"
import { useState } from "react"

type ProfileProps = {
  params: Promise<{ username: string }>
}

export default async function Profile({ params }: ProfileProps) {
  const { username } = await params
  const [content, setContent] = useState<ProfileContent>(DEFAULT_PROFILE_CONTENT)
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE_CONFIG)

  try {
    const config = await getProfileConfig(username)
    const content = await getProfileContent(username)
    await new Promise((resolve) => setTimeout(resolve, 5000))
  } catch (error) {
    console.warn("Error fetching profile data:", error)
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 text-xl">
        This Profile doesn't exist.
        <ClaimUsernameButtons username={username} />
      </div>
    )
  }

  return <div className="relative h-full w-full">{/* background */}</div>
}
