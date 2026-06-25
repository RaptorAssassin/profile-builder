import ClaimUsernameButtons from "@/components/claim-username-buttons"
import {
  DEFAULT_PROFILE_CONFIG,
  DEFAULT_PROFILE_CONTENT,
  getProfileConfig,
  getProfileContent,
} from "@/lib/profile"
import { ProfileConfig, ProfileContent } from "@/types/profile"
import ProfileBackground from "@/components/profile-background"
import ProfileCard from "@/components/profile-card"

type ProfileProps = {
  params: Promise<{ username: string }>
}

export default async function Profile({ params }: ProfileProps) {
  const { username } = await params

  try {
    const config = await getProfileConfig(username)
    const content = await getProfileContent(username)

    return (
      <div className="relative h-dvh w-full">
        <ProfileBackground config={config as ProfileConfig} />
        <ProfileCard config={config as ProfileConfig} content={content as ProfileContent} />
      </div>
    )
  } catch (error) {
    console.warn("Error fetching profile data:", error)
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 text-xl">
        This Profile doesn't exist.
        <ClaimUsernameButtons username={username} />
      </div>
    )
  }
}
